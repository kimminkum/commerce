// src/auth/authService.ts
import { getAuthClient } from "./firebase";

export type AuthUser = { uid: string; email: string | null };

// 로그인
export async function signIn(
  email: string,
  password: string
): Promise<AuthUser> {
  const { signInWithEmailAndPassword } = await import("firebase/auth");
  const auth = await getAuthClient();
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return { uid: cred.user.uid, email: cred.user.email };
}

// 회원가입
export async function signUp(
  email: string,
  password: string
): Promise<AuthUser> {
  const { createUserWithEmailAndPassword } = await import("firebase/auth");
  const auth = await getAuthClient();
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return { uid: cred.user.uid, email: cred.user.email };
}

// 로그아웃
export async function logout(): Promise<void> {
  const { signOut } = await import("firebase/auth");
  const auth = await getAuthClient();
  await signOut(auth);
}
