import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getVisitorId,
  shouldIncrementView,
  setLastViewTime,
} from "@/lib/viewCountUtils";
import { useRouter } from "next/router";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState(null);
  const [fetchingBooks, setFetchingBooks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllBooks = async () => {
    setFetchingBooks(true);
    try {
      const snapshot = query(collection(db, "library"));
      const docs = await getDocs(snapshot);
      const books = docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const fullBooksArray = await Promise.all(
        books?.map(async (book) => {
          const coverImageUrl = await getDownloadURL(
            ref(storage, `${book?.coverImage}`)
          );
          return {
            ...book,
            coverImage: coverImageUrl,
          };
        })
      );

      setBooks(fullBooksArray);
    } catch (error) {
      setError(error);
    } finally {
      setFetchingBooks(false);
    }
  };

  const addNewBook = async (data) => {
    setLoading(true);
    try {
      const coverRef = ref(
        storage,
        `bookCovers/${Date.now()}-${data?.coverImage?.name}`
      );

      const uploadResult = await uploadBytes(coverRef, data?.coverImage);

      await setDoc(doc(db, "library", data?.id), {
        ...data,
        coverImage: uploadResult.ref.fullPath,
      });

      setBooks((prevBooks) => [
        ...prevBooks,
        { ...data, coverImage: URL.createObjectURL(data.coverImage) },
      ]);
    } catch (error) {
      const errMessage = error.message;
      console.log(errMessage);
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (bookId, data) => {
    setLoading(true);
    try {
      let updatedData = { ...data };

      if (data?.coverImage && typeof data?.coverImage !== "string") {
        const coverRef = ref(
          storage,
          `bookCovers/${Date.now()}-${data?.coverImage?.name}`
        );

        const uploadResult = await uploadBytes(coverRef, data?.coverImage);

        updatedData.coverImage = uploadResult?.ref?.fullPath;
      }

      await updateDoc(doc(db, "library", bookId), updatedData);

      setBooks((prevBooks) =>
        prevBooks?.map((book) =>
          book.id === bookId
            ? {
                ...book,
                ...updatedData,
                coverImage:
                  typeof data?.coverImage !== "string"
                    ? URL.createObjectURL(data?.coverImage)
                    : data?.coverImage,
              }
            : book
        )
      );
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (bookId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "library", bookId));

      setBooks((prevBooks) => prevBooks?.filter((book) => book.id !== bookId));
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        setBooks,
        getAllBooks,
        addNewBook,
        updateBook,
        deleteBook,
        fetchingBooks,
        loading,
        error,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
