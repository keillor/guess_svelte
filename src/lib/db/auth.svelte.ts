import { app } from '$lib/db/firebaseInit';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, type User } from 'firebase/auth';

export const auth = getAuth(app);
export let user = $state<{ user: User | null }>({ user: auth.currentUser });

onAuthStateChanged(auth, (firebaseUser) => {
  user.user = firebaseUser;
});

export async function login() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

export async function logout() {
  await signOut(auth);
}