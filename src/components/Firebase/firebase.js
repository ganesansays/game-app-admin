import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDGNNokbwL86bVhyI6t4mhNkOiLoV-MLVk",
    authDomain: "game-app-2019.firebaseapp.com",
    databaseURL: "https://game-app-2019.firebaseio.com",
    projectId: "game-app-2019",
    storageBucket: "",
    messagingSenderId: "105991395573"
};

class Firebase {
  constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;