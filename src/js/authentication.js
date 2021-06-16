import Swal from 'sweetalert2';
import { Authentication } from './firebase';
import { authBtnRef } from './common/refs';
import { authModal, Notify } from './sweetAlert';
import { getCurrentUser } from './localStorage';

Authentication.checkUser();

authBtnRef.addEventListener('click', onAuthBtnClick);

function onAuthBtnClick(e) {
  const user = getCurrentUser();

  if (user) {
    return Authentication.signOut();
  }

  Swal.fire(authModal);

  const authModalRef = document.querySelector('.auth-modal');

  authModalRef.addEventListener('click', onAuthModalOpen);
}

function onAuthModalOpen(e) {
  const target = e.target;
  const modalTitleRef = document.querySelector('.auth-modal__title');
  const confirmBtnRef = document.querySelector('.auth-modal__confirm-btn');
  const formTextRef = document.querySelector('.auth-form__text');
  const formTextPwdRef = document.querySelector('.auth-form__text-password');
  const regBtnRef = document.querySelector('.auth-form__reg-button');
  const resetPwdBtnRef = document.querySelector('.auth-form__reset-button');
  const closeBtnRef = document.querySelector('.cl-btn');
  const emailInputRef = document.querySelector('#email');
  const passwordInputRef = document.querySelector('#password');
  const email = emailInputRef.value;
  const password = passwordInputRef.value;
  const closeBtnChildren = target.parentElement === closeBtnRef;

  if (
    target !== regBtnRef &&
    target !== confirmBtnRef &&
    target !== resetPwdBtnRef &&
    target !== closeBtnRef &&
    !closeBtnChildren
  ) {
    return;
  }

  if (target === closeBtnRef || closeBtnChildren) {
    Swal.close();
  }

  switch (target) {
    case regBtnRef:
      modalTitleRef.textContent === 'Sign in'
        ? ((modalTitleRef.textContent = 'Registration'),
          (resetPwdBtnRef.classList.add('visually-hidden'),
          formTextPwdRef.classList.add('visually-hidden')))
        : ((modalTitleRef.textContent = 'Sign in'),
          (resetPwdBtnRef.classList.remove('visually-hidden'),
          formTextPwdRef.classList.remove('visually-hidden')));

      confirmBtnRef.textContent === 'Sign in'
        ? (confirmBtnRef.textContent = 'Sign up')
        : (confirmBtnRef.textContent = 'Sign in');

      formTextRef.textContent === 'Already registered?'
        ? (formTextRef.textContent = "Don't have account?")
        : (formTextRef.textContent = 'Already registered?');

      regBtnRef.textContent === 'Sign in!'
        ? (regBtnRef.textContent = 'Registration')
        : (regBtnRef.textContent = 'Sign in!');

      Swal.resetValidationMessage();
      break;

    case resetPwdBtnRef:
      passwordInputRef.style.display = 'none';
      resetPwdBtnRef.style.display = 'none';
      formTextPwdRef.style.display = 'none';
      regBtnRef.style.display = 'none';
      formTextRef.textContent = 'Enter your email address to reset password';
      modalTitleRef.textContent = 'Reset password';
      confirmBtnRef.textContent = 'Reset';

      Swal.resetValidationMessage();
      break;

    case confirmBtnRef:
      switch (confirmBtnRef.textContent) {
        case 'Sign in':
          if (!email || !password || password.length < 6) {
            return;
          }

          Authentication.signIn(email, password);

          break;

        case 'Sign up':
          if (!email || !password || password.length < 6) {
            return;
          }

          Authentication.signUp(email, password);

          break;

        case 'Reset':
          if (!email) {
            return;
          }

          Authentication.resetPassword(email);

          break;
      }
  }
}

// export function saveCurrentUser({ uid, email }) {
//   return localStorage.setItem('user', JSON.stringify({ uid, email }));
// }

// export function getCurrentUser() {
//   return JSON.parse(localStorage.getItem('user'));
// }

// export function removeCurrentUser() {
//   return localStorage.removeItem('user');
// }

// export function addUserLibraryToLocalStorage(watched, queue) {
//   localStorage.setItem('watched', JSON.stringify(watched));
//   localStorage.setItem('queue', JSON.stringify(queue));
// }

// export function getUserLibraryFromLocalStorage() {
//   const watched = JSON.parse(localStorage.getItem('watched'));
//   const queue = JSON.parse(localStorage.getItem('queue'));

//   return { watched, queue };
// }

// export function removeUserLibraryFromLocalStorage() {
//   localStorage.removeItem('watched');
//   localStorage.removeItem('queue');
// }
