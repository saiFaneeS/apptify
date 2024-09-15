import React, { createContext, useState, useContext, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { user: authUser, auth } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatingAvatar, setUpdatingAvatar] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserProfile("o2hkhkZainSjiv1JKdBo");
  }, []);

  const getUserProfile = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
        // console.log(userDoc.data());
      } else {
        setUserProfile(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (name, email) => {
    setLoading(true);
    setError(null);
    try {
      await updateDoc(doc(db, "users", "o2hkhkZainSjiv1JKdBo"), {
        name,
      });
      setUserProfile({ ...userProfile, name });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAvatar = async (file) => {
    setUpdatingAvatar(true);
    setError(null);
    try {
      const storageRef = ref(storage, `avatars/${"o2hkhkZainSjiv1JKdBo"}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "users", "o2hkhkZainSjiv1JKdBo"), {
        avatarUrl: downloadURL,
      });
      setUserProfile({ ...userProfile, avatarUrl: downloadURL });
      localStorage.setItem("userAvatar", JSON.stringify(downloadURL));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingAvatar(false);
    }
  };

  const value = {
    userProfile,
    updateProfile,
    updateAvatar,
    updatingAvatar,
    loading,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
