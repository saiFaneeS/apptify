import { db, storage } from "@/lib/firebase";
import {
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
  const [loading, setLoading] = useState(false);
  const [updatingFeatured, setUpdatingFeatured] = useState(false);
  const [fetchingWorks, setFetchingWorks] = useState(false);
  const [error, setError] = useState(null);
  //   const [comments, setComments] = useState([]);
  //   const [commenting, setCommenting] = useState(false);
  //   const [deletingComment, setDeletingComment] = useState(false);
  
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

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
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
        coverImage: uploadResult.ref.fullPath,
      });

      setWorks((prevWorks) => [
        { ...data, coverImage: URL.createObjectURL(data.coverImage) },
        ...prevWorks,
      ]);
    } catch (err) {
      console.log(err);

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
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
        // console.log("Work data", { ...workData, coverImage: coverImageUrl });
      }

    //   setComments(docSnap.data().comments);
    } catch (err) {
      console.log(err);

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    }
  };

  const updateWork = async (workId, workData) => {
    setFetchingWorks(true);
    try {
      let updatedData = { ...workData };
      if (workData?.coverImage && typeof workData?.coverImage !== "string") {
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
      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
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

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    } finally {
      setUpdatingFeatured(false);
    }
  };

  const deleteWork = async (workId) => {
    try {
      await deleteDoc(doc(db, "works", workId));

      setWorks((prevWorks) => prevWorks.filter((work) => work.id !== workId));
    } catch (err) {
      console.log(err);

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    }
  };

  const incrementViewCount = async (workId) => {
    try {
      const visitorId = getVisitorId();
      if (shouldIncrementView(workId, visitorId)) {
        const workRef = doc(db, "works", workId);

        // Increment the view count in Firestore
        await updateDoc(workRef, {
          viewCount: increment(1),
        });

        // Update the last view time
        setLastViewTime(workId, visitorId, Date.now());

        // Optionally, update the local state if you're keeping view counts in your works state
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

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    }
  };

  // comments
//   const addComment = async (workId, comment) => {
//     setCommenting(true);

//     try {
//       const workRef = doc(db, "works", workId);
//       await updateDoc(workRef, {
//         comments: arrayUnion(comment),
//       });

//       setComments((prevComments) => {
//         if (!prevComments || prevComments.length === 0) {
//           return [comment];
//         }
//         return [comment, ...prevComments];
//       });
//     } catch (err) {
//       console.log(err);

//       const errCode = err.code;
//       const errMessage = err.message;
//       setError(errMessage);
//     } finally {
//       setCommenting(false);
//     }
//   };

//   const deleteComment = async (workId, commentToDelete) => {
//     console.log("deleting");
//     setDeletingComment(true);
//     try {
//       const workRef = doc(db, "works", workId);

//       // Get the current work data
//       const workDoc = await getDoc(workRef);
//       if (!workDoc.exists()) {
//         throw new Error("Work not found");
//       }

//       const workData = workDoc.data();
//       const updatedComments = workData.comments.filter(
//         (comment) => comment.commentId !== commentToDelete.commentId
//       );

//       // Update the work document with the new comments array
//       await updateDoc(workRef, {
//         comments: updatedComments,
//       });

//       setComments(updatedComments);
//       console.log("deleted");
//     } catch (err) {
//       console.error("Error deleting comment: ", err);
//       setError(err.message);
//     } finally {
//       setDeletingComment(false);
//     }
//   };

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
        // comments,
        // addComment,
        // commenting,
        // deleteComment,
        // deletingComment,
        loading,
        error,
      }}
    >
      {children}
    </WorksContext.Provider>
  );
};

export const useWorks = () => useContext(WorksContext);
