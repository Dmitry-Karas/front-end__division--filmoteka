import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/app';
import { authBtnRef } from './common/refs';
import { AuthMessage } from './sweetAlert';

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

// const database = firebase.database();

export class Authentication {
  static async signUp(email, password) {
    try {
      if (password.length < 6) {
        console.log('menshe');
        return;
      }
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

  static signOut() {
    firebase.auth().signOut();

    AuthMessage.signedOut();
  }

  static getUser() {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('~ user', user.uid);
        // const name = user.displayName;
        // const email = user.email;
        // const photoUrl = user.photoURL;
        // const emailVerified = user.emailVerified;

        authBtnRef.textContent = 'Sign out';
      } else {
        authBtnRef.textContent = 'Sign in';
      }
    });
  }
}

// Authentication.getUser()

// function writeUserData(userId, name, email, imageUrl) {
//   firebase
//     .database()
//     .ref('users/' + userId)
//     .set({
//       username: name,
//       email: email,
//       profile_picture: imageUrl,
//     });
// }

// console.log(Authentication.getUser());
