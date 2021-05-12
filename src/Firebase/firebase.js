import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  authDomain: "a-or-b.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.db = firebase.firestore();
    this.functions = firebase.functions();
    this.auth = firebase.auth();
    this.fbAuthProvider = new firebase.auth.FacebookAuthProvider();
  }

  async signInWithFacebook() {
    const res = await this.auth.signInWithPopup(this.fbAuthProvider).then(
      (res) => {
        console.log("logged in successfully");
        return res;
      },
      (error) => {
        console.log(`log in error: ${error}`);
        return null;
      }
    );
    return res;
  }

  async signOut() {
    const logout = await this.auth.signOut().then(
      (res) => {
        console.log("logged out successfully");
        return res;
      },
      (error) => {
        console.log(`log out error: ${error}`);
        return error;
      }
    );
    return logout;
  }
}

export default Firebase;
