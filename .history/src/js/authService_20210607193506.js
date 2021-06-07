import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/app';
// import axios from 'axios';
// import Swal from 'sweetalert2';
import { authBtnRef } from './common/refs';
import {
  incorrectPasswordErrMsg,
  invalidEmailErrMsg,
  userNotFoundMsg,
  signedInMsg,
  signedOutMsg,
} from './sweetAlert';

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
      await firebase.auth().createUserWithEmailAndPassword(email, password).user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  },

  async signIn(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      signedInMsg();
    } catch (error) {
      const errorCode = error.code;

      switch (errorCode) {
        case 'auth/wrong-password':
          incorrectPasswordErrMsg();
          break;

        case 'auth/invalid-email':
          invalidEmailErrMsg();
          break;

        case 'auth/user-not-found':
          userNotFoundMsg();
          break;
      }
    }
  },

  signOut() {
    firebase.auth().signOut();

    signedOutMsg();
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
