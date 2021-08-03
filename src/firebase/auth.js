import { auth, googleProvider, facebookProvider } from './firebase';

// sign up with
export const doGooleSignIn = () => auth.signInWithPopup(googleProvider);

export const doFacebookSignIn = () => auth.signInWithPopup(facebookProvider);

// sign out
export const doSignOut = () => auth.signOut();
