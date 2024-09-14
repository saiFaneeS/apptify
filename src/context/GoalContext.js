import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const fetchAllGoals = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "goals"));
      const goalsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGoals(goalsArray);
    } catch (err) {
      console.log(err);

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async (data) => {
    console.log(data);
    setLoading(true);
    console.log(data);
    try {
      await setDoc(doc(db, "goals", data?.id), data);

      setGoals((prevGoals) => [...prevGoals, data]);
      console.log(goals);
    } catch (err) {
      console.log(err);

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateGoal = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      await setDoc(doc(db, "goals", data?.id), data);
      setGoals((prevGoals) =>
        prevGoals?.map((goal) =>
          goal.id === data?.id
            ? {
                ...goal,
                ...data,
              }
            : goal
        )
      );
    } catch (err) {
      console.log(err);

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteGoal = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "goals", id));

      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    } catch (err) {
      console.log(err);

      const errCode = err.code;
      const errMessage = err.message;
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        fetchAllGoals,
        createGoal,
        updateGoal,
        deleteGoal,
        loading,
        error,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => useContext(GoalsContext);
