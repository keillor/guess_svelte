import { app } from '$lib/db/firebaseInit';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(app);
let user = $state(auth.currentUser);

onAuthStateChanged(auth, (firebaseUser) => {
  user = firebaseUser;
});

async function login() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

async function logout() {
  await signOut(auth);
}

export { user, login, logout };