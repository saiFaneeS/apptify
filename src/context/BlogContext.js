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
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  getVisitorId,
  shouldIncrementView,
  setLastViewTime,
} from "@/lib/viewCountUtils";

const BlogsContext = createContext();

export const BlogsProvider = ({ children }) => {
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [featuredBlog, setFeaturedBlog] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingFeatured, setUpdatingFeatured] = useState(false);
  const [fetchingBlogs, setFetchingBlogs] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [error, setError] = useState(null);

  const getAllBlogs = async () => {
    setFetchingBlogs(true);
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsArray = querySnapshot?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const fullBlogsArray = await Promise.all(
        blogsArray?.map(async (blog) => {
          const coverImageUrl = await getDownloadURL(
            ref(storage, `${blog?.coverImage}`)
          );
          return {
            ...blog,
            coverImage: coverImageUrl,
          };
        })
      );
      setBlogs(fullBlogsArray);

      const filteredFeaturedBlog = fullBlogsArray.find(
        (blog) => blog.featured === true
      );

      setFeaturedBlog(filteredFeaturedBlog);
    } catch (err) {
      console.log(err);

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    } finally {
      setFetchingBlogs(false);
    }
  };

  const createBlog = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const coverRef = ref(
        storage,
        `blogCovers/${Date.now()}-${data?.coverImage?.name}`
      );

      const uploadResult = await uploadBytes(coverRef, data?.coverImage);

      await setDoc(doc(db, "blogs", data?.id), {
        ...data,
        coverImage: uploadResult.ref.fullPath,
      });

      setBlogs((prevBlogs) => [
        { ...data, coverImage: URL.createObjectURL(data.coverImage) },
        ...prevBlogs,
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

  const getBlogById = async (blogId) => {
    try {
      const docRef = doc(db, "blogs", blogId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const blogData = docSnap.data();
        const coverImageUrl = await getDownloadURL(
          ref(storage, blogData.coverImage)
        );
        setBlog({ ...blogData, coverImage: coverImageUrl });
        // console.log("Blog data", { ...blogData, coverImage: coverImageUrl });
      }

      setComments(docSnap.data().comments);
    } catch (err) {
      console.log(err);

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    }
  };

  const updateBlog = async (blogId, blogData) => {
    setFetchingBlogs(true);
    try {
      let updatedData = { ...blogData };
      if (blogData?.coverImage && typeof blogData?.coverImage !== "string") {
        const newCoverRef = ref(
          storage,
          `blogCovers/${Date.now()}-${blogData.coverImage.name}`
        );

        const uploadResult = await uploadBytes(
          newCoverRef,
          blogData?.coverImage
        );

        updatedData.coverImage = uploadResult?.ref?.fullPath;
      }

      await updateDoc(doc(db, "blogs", blogId), updatedData);

      setBlogs((prevBlogs) =>
        prevBlogs?.map((blog) =>
          blog.id === blogId
            ? {
                ...blog,
                ...updatedData,
                coverImage:
                  typeof blogData?.coverImage !== "string"
                    ? URL.createObjectURL(blogData.coverImage)
                    : blogData?.coverImage,
              }
            : blog
        )
      );
    } catch (err) {
      console.log(err);
      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    } finally {
      setFetchingBlogs(false);
    }
  };

  const updateFeaturedBlog = async (currentFeatured, newFeatured) => {
    setUpdatingFeatured(true);
    try {
      if (currentFeatured) {
        await updateDoc(doc(db, "blogs", currentFeatured?.id), {
          featured: false,
        });
      }
      await updateDoc(doc(db, "blogs", newFeatured.id), { featured: true });
      setFeaturedBlog(newFeatured);
    } catch (err) {
      console.log(err);

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    } finally {
      setUpdatingFeatured(false);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await deleteDoc(doc(db, "blogs", blogId));

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    } catch (err) {
      console.log(err);

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    }
  };

  const incrementViewCount = async (blogId) => {
    try {
      const visitorId = getVisitorId();
      if (shouldIncrementView(blogId, visitorId)) {
        const blogRef = doc(db, "blogs", blogId);

        // Increment the view count in Firestore
        await updateDoc(blogRef, {
          viewCount: increment(1),
        });

        // Update the last view time
        setLastViewTime(blogId, visitorId, Date.now());

        // Optionally, update the local state if you're keeping view counts in your blogs state
        setBlogs((prevBlogs) =>
          prevBlogs?.map((blog) =>
            blog.id === blogId
              ? { ...blog, viewCount: (blog.viewCount || 0) + 1 }
              : blog
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
  const addComment = async (blogId, comment) => {
    setCommenting(true);

    try {
      const blogRef = doc(db, "blogs", blogId);
      await updateDoc(blogRef, {
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

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    } finally {
      setCommenting(false);
    }
  };

  const deleteComment = async (blogId, commentId) => {
    try {
      const blogRef = doc(db, "blogs", blogId);

      await updateDoc(blogRef, {
        comments: arrayRemove({ id: commentId }),
      });

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (err) {
      console.error("Error deleting comment: ", err);
      setError(err.message);
    }
  };

  return (
    <BlogsContext.Provider
      value={{
        blog,
        blogs,
        getBlogById,
        getAllBlogs,
        fetchingBlogs,
        featuredBlog,
        updateFeaturedBlog,
        updatingFeatured,
        createBlog,
        updateBlog,
        deleteBlog,
        incrementViewCount,
        comments,
        addComment,
        deleteComment,
        commenting,
        loading,
        error,
      }}
    >
      {children}
    </BlogsContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogsContext);
