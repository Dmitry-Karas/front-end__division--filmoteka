import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/app';
import { authBtnRef } from './common/refs';
import { AuthMessage } from './sweetAlert';
import { saveCurrentUser, getCurrentUser, removeCurrentUser } from './authentication';

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

      AuthMessage.signedUp();
    } catch (error) {
      const errorCode = error.code;

      switch (errorCode) {
        case 'auth/email-already-in-use':
          AuthMessage.alreadyExists();
          break;

        case 'auth/invalid-email':
          AuthMessage.invalidEmail();
          break;
      }
    }
  }

  static async signIn(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      AuthMessage.signedIn();
      Database.getUserLibrary();
    } catch (error) {
      const errorCode = error.code;

      switch (errorCode) {
        case 'auth/wrong-password':
          AuthMessage.incorrectPassword();
          break;

        case 'auth/invalid-email':
          AuthMessage.invalidEmail();
          break;

        case 'auth/user-not-found':
          AuthMessage.notFound();
          break;
      }
    }
  }

  static async signOut() {
    await firebase.auth().signOut();

    removeUserLibraryFromLocalStorage();
    AuthMessage.signedOut();
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
  static writeUserData(userId, email) {
    firebase
      .database()
      .ref('users/' + userId)
      .set({
        email: email,
      });
  }

  static async writeUserLibrary(watched) {
    await firebase
      .database()
      .ref(`library/${userId}`)
      .set({
        watched: watched,
        queue: ['movie', 'movie', 'movie'],
      });
  }

  static async getUserLibrary() {
    const user = getCurrentUser();

    if (!user) {
      return;
    }

    const movies = await dbRef.child('movies').child(user.uid).get().val();

    if (!movies) {
      return;
    }

    const { watched, queue } = movies;

    addUserLibraryToLocalStorage(watched, queue);
  }
}

Database.getUserLibrary();
