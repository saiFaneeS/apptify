import { db, storage } from "@/lib/firebase";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import {
  getVisitorId,
  shouldIncrementView,
  setLastViewTime,
} from "@/lib/viewCountUtils";

const WorksContext = createContext();

export const WorksProvider = ({ children }) => {
  const [work, setWork] = useState(null);
  const [works, setWorks] = useState(null);
  const [featuredWork, setFeaturedWork] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingFeatured, setUpdatingFeatured] = useState(false);
  const [fetchingWorks, setFetchingWorks] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [deletingComment, setDeletingComment] = useState(false);
  const [error, setError] = useState(null);

  const getAllWorks = async () => {
    setFetchingWorks(true);
    try {
      const querySnapshot = await getDocs(collection(db, "works"));
      const worksArray = querySnapshot?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const fullWorksArray = await Promise.all(
        worksArray?.map(async (work) => {
          const coverImageUrl = await getDownloadURL(
            ref(storage, `${work?.coverImage}`)
          );
          return {
            ...work,
            coverImage: coverImageUrl,
          };
        })
      );
      setWorks(fullWorksArray);

      const filteredFeaturedWork = fullWorksArray.find(
        (work) => work.featured === true
      );

      setFeaturedWork(filteredFeaturedWork);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setFetchingWorks(false);
    }
  };

  const createWork = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const coverRef = ref(
        storage,
        `workCovers/${Date.now()}-${data?.coverImage?.name}`
      );

      const uploadResult = await uploadBytes(coverRef, data?.coverImage);

      await setDoc(doc(db, "works", data?.id), {
        ...data,
        coverImage: uploadResult?.ref?.fullPath,
      });

      setWorks((prevWorks) => [
        { ...data, coverImage: URL?.createObjectURL(data.coverImage) },
        ...prevWorks,
      ]);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWorkById = async (workId) => {
    try {
      const docRef = doc(db, "works", workId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const workData = docSnap.data();
        const coverImageUrl = await getDownloadURL(
          ref(storage, workData.coverImage)
        );
        setWork({ ...workData, coverImage: coverImageUrl });
      }

      setComments(docSnap.data().comments || []);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const updateWork = async (workId, workData) => {
    setFetchingWorks(true);
    try {
      let updatedData = { ...workData };
      if (workData?.coverImage && typeof workData?.coverImage !== "string") {
        // Delete old cover image if it exists
        const oldWork = works.find((w) => w.id === workId);
        if (oldWork && oldWork.coverImage) {
          const oldCoverRef = ref(storage, oldWork.coverImage);
          await deleteObject(oldCoverRef).catch((error) => {
            console.log("Error deleting old cover image:", error);
          });
        }

        // Upload new cover image
        const newCoverRef = ref(
          storage,
          `workCovers/${Date.now()}-${workData.coverImage.name}`
        );

        const uploadResult = await uploadBytes(
          newCoverRef,
          workData?.coverImage
        );

        updatedData.coverImage = uploadResult?.ref?.fullPath;
      }

      await updateDoc(doc(db, "works", workId), updatedData);

      setWorks((prevWorks) =>
        prevWorks?.map((work) =>
          work.id === workId
            ? {
                ...work,
                ...updatedData,
                coverImage:
                  typeof workData?.coverImage !== "string"
                    ? URL.createObjectURL(workData.coverImage)
                    : workData?.coverImage,
              }
            : work
        )
      );
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setFetchingWorks(false);
    }
  };

  const updateFeaturedWork = async (currentFeatured, newFeatured) => {
    setUpdatingFeatured(true);
    try {
      if (currentFeatured) {
        await updateDoc(doc(db, "works", currentFeatured?.id), {
          featured: false,
        });
      }
      await updateDoc(doc(db, "works", newFeatured.id), { featured: true });
      setFeaturedWork(newFeatured);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setUpdatingFeatured(false);
    }
  };

  const deleteWork = async (workId) => {
    setLoading(true);
    try {
      // Get the work data
      const workToDelete = works.find((work) => work.id === workId);

      if (workToDelete && workToDelete.coverImage) {
        // Delete the cover image from storage
        const coverImageRef = ref(storage, workToDelete.coverImage);
        await deleteObject(coverImageRef).catch((error) => {
          console.log("Error deleting cover image:", error);
        });
      }

      // Delete the work document from Firestore
      await deleteDoc(doc(db, "works", workId));

      // Update local state
      setWorks((prevWorks) => prevWorks.filter((work) => work.id !== workId));
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = async (workId) => {
    try {
      const visitorId = getVisitorId();
      if (shouldIncrementView(workId, visitorId)) {
        const workRef = doc(db, "works", workId);

        await updateDoc(workRef, {
          viewCount: increment(1),
        });

        setLastViewTime(workId, visitorId, Date.now());

        setWorks((prevWorks) =>
          prevWorks?.map((work) =>
            work.id === workId
              ? { ...work, viewCount: (work.viewCount || 0) + 1 }
              : work
          )
        );
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  // Comments functionality
  const addComment = async (workId, comment) => {
    setCommenting(true);

    try {
      const workRef = doc(db, "works", workId);
      await updateDoc(workRef, {
        comments: arrayUnion(comment),
      });

      setComments((prevComments) => {
        if (!prevComments || prevComments.length === 0) {
          return [comment];
        }
        return [comment, ...prevComments];
      });
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setCommenting(false);
    }
  };

  const deleteComment = async (workId, commentToDelete) => {
    console.log("deleting");
    setDeletingComment(true);
    try {
      const workRef = doc(db, "works", workId);

      const workDoc = await getDoc(workRef);
      if (!workDoc.exists()) {
        throw new Error("Work not found");
      }

      const workData = workDoc.data();
      const updatedComments = workData.comments.filter(
        (comment) => comment.commentId !== commentToDelete.commentId
      );

      await updateDoc(workRef, {
        comments: updatedComments,
      });

      setComments(updatedComments);
      console.log("deleted");
    } catch (err) {
      console.error("Error deleting comment: ", err);
      setError(err.message);
    } finally {
      setDeletingComment(false);
    }
  };

  return (
    <WorksContext.Provider
      value={{
        work,
        works,
        getWorkById,
        getAllWorks,
        fetchingWorks,
        featuredWork,
        updateFeaturedWork,
        updatingFeatured,
        createWork,
        updateWork,
        deleteWork,
        incrementViewCount,
        comments,
        addComment,
        commenting,
        deleteComment,
        deletingComment,
        loading,
        error,
      }}
    >
      {children}
    </WorksContext.Provider>
  );
};

export const useWorks = () => useContext(WorksContext);
