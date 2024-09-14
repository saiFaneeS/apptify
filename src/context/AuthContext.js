import { app } from "@/lib/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signInLoading, setSignInLoading] = useState(null);
  const [signInError, setSignInError] = useState(null);
  const [auth, setAuth] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const authInstance = getAuth(app);
    setAuth(authInstance);

    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setUser(user);
      if (!user && router.pathname.includes("dashboard")) {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [app, router]);

  const verifyUser = (email, password) => {
    if (!auth) return;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const signedInUser = userCredential.user;
        setUser(signedInUser);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        setSignInError(errorMessage);
      });
  };

  return (
    <AuthContext.Provider
      value={{ auth, user, verifyUser, signInLoading, signInError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
