// src/hooks/useAuthListener.ts
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export const useAuthListener = () => {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    (async () => {
      // 필요할 때만 Firebase 로딩
      const { initializeApp, getApps, getApp } = await import("firebase/app");
      const { getAuth, onAuthStateChanged } = await import("firebase/auth");

      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FB_API_KEY!,
        authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN!,
        projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID!,
        appId: process.env.NEXT_PUBLIC_FB_APP_ID!
      };

      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      const auth = getAuth(app);

      unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          // 만료시간 1시간(데모)
          const expiresAt = Date.now() + 60 * 60 * 1000;
          setUser({ uid: user.uid, email: user.email ?? "" }, expiresAt);
        } else {
          setUser(null, null);
        }
      });
    })();

    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, [setUser]);
};
