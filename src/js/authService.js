import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/app';
// import axios from 'axios';
// import Swal from 'sweetalert2';
import { authBtnRef } from './common/refs';
// import {
//   incorrectPasswordErrMsg,
//   invalidEmailErrMsg,
//   userNotFoundMsg,
//   signedInMsg,
//   signedOutMsg,
// } from './sweetAlert';
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

export const Auth = {
  async signUp(email, password) {
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
      }
    }
  },

  async signIn(email, password) {
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
  },

  signOut() {
    firebase.auth().signOut();

    AuthMessage.signedOut();
  },

  checkUser() {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const name = user.displayName;
        const email = user.email;
        const photoUrl = user.photoURL;
        const emailVerified = user.emailVerified;
        const uid = user.uid;

        authBtnRef.textContent = 'Sign out';

        console.log('~ name', name);
        console.log('~ email', email);
        console.log('~ photoUrl', photoUrl);
        console.log('~ emailVerified', emailVerified);
        console.log('~ uid', uid);
      } else {
        authBtnRef.textContent = 'Sign in';
      }
    });
  },
};
