// src/hooks/useAuthListener.ts
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useAuthStore } from "../store/authStore";

export const useAuthListener = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid && user.email) {
        setUser({ uid: user.uid, email: user.email });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);
};
