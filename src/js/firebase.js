import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/app';
import { authBtnRef } from './common/refs';
import { Notify } from './sweetAlert';
import {
  saveCurrentUser,
  getCurrentUser,
  removeCurrentUser,
  // addUserLibraryToLocalStorage,
  // removeUserLibraryFromLocalStorage,
} from './authentication';

const firebaseConfig = {
  apiKey: 'AIzaSyBYSrEIV_a6q1SjawRWqEforeGVAaOm1g4',
  authDomain: 'filmoteka-app.firebaseapp.com',
  databaseURL: 'https://filmoteka-app-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-app',
  storageBucket: 'filmoteka-app.appspot.com',
  messagingSenderId: '247108449060',
  appId: '1:247108449060:web:d423bcdb60caa5ced7b9b1',
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const dbRef = database.ref();

export class Authentication {
  static async signUp(email, password) {
    if (password.length < 6) {
      return;
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Database.writeUserLibrary([], []);

      Notify.signedUp();
    } catch (error) {
      const errorCode = error.code;

      switch (errorCode) {
        case 'auth/email-already-in-use':
          Notify.emailAlreadyInUse();
          break;

        case 'auth/invalid-email':
          Notify.invalidEmail();
          break;
      }
    }
  }

  static async signIn(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      Notify.signedIn();
      Database.getUserLibrary();
    } catch (error) {
      const errorCode = error.code;

      switch (errorCode) {
        case 'auth/wrong-password':
          Notify.incorrectPassword();
          break;

        case 'auth/invalid-email':
          Notify.invalidEmail();
          break;

        case 'auth/user-not-found':
          Notify.notFound();
          break;
      }
    }
  }

  static async signOut() {
    await firebase.auth().signOut();

    // removeUserLibraryFromLocalStorage();
    Notify.signedOut();
  }

  static async checkUser() {
    return await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        saveCurrentUser(user);
        authBtnRef.textContent = 'Sign out';
      } else {
        removeCurrentUser();
        authBtnRef.textContent = 'Sign in';
      }
    });
  }
}

export class Database {
  static async writeUserLibrary(user, library) {
    await firebase.database().ref(`library/${user.uid}`).set(library);

    // addUserLibraryToLocalStorage(watched, queue);
  }

  static async getUserLibrary(user) {
    if (!user) {
      return;
    }

    const library = (await dbRef.child('library').child(user.uid).get()).val();
    const { watched, queue } = library || [];

    // addUserLibraryToLocalStorage(watched || [], queue || []);
  }
}
