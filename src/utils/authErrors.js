export function formatAuthError(error) {
  if (!error) return '';
  
  const code = error.code || '';
  
  switch (code) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in cancelled. The Google popup was closed before completing.';
    case 'auth/popup-blocked':
      return 'The Google sign-in popup was blocked by your browser. Please allow popups for this site and try again.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in request cancelled due to another popup being opened.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email using a different sign-in method. Please sign in using your existing method.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for OAuth in your Firebase project. Please add your current domain/localhost to Authorized Domains in Firebase Console > Authentication > Settings.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please log in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'This sign-in provider is not enabled in your Firebase Console. Please enable Email/Password or Google under Authentication > Sign-in method.';
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a password with at least 6 characters.';
    case 'auth/user-disabled':
      return 'This user account has been disabled. Please contact an administrator.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please verify your email or sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please verify your password and try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials and try again.';
    case 'auth/too-many-requests':
      return 'Access temporarily blocked due to many failed attempts. Please try again shortly or reset your password.';
    case 'auth/network-request-failed':
      return 'Network communication failed. Please check your internet connection.';
    case 'auth/api-key-not-valid.':
    case 'auth/invalid-api-key':
      return 'Invalid Firebase API Key. Please ensure your VITE_FIREBASE_API_KEY in .env is correct.';
    default:
      return error.message || 'An unexpected authentication error occurred. Please try again.';
  }
}
