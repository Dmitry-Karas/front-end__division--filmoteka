import Swal from 'sweetalert2';
import { Authentication } from './firebase';
import { authBtnRef } from './common/refs';
import { authModal } from './sweetAlert';

Authentication.getUser();

authBtnRef.addEventListener('click', onAuthBtnClick);

function onAuthBtnClick(e) {
  const signed = e.currentTarget.textContent === 'Sign out';

  if (signed) {
    return Authentication.signOut();
  }

  Swal.fire(authModal);

  const authModalRef = document.querySelector('.auth-modal');

  authModalRef.addEventListener('click', onAuthModalOpen);
}

function onAuthModalOpen(e) {
  const target = e.target;
  const modalTitleRef = document.querySelector('.auth-modal__title');
  const confirmBtnRef = document.querySelector('.auth-modal__button');
  const formTextRef = document.querySelector('.auth-form__text');
  const formBtnRef = document.querySelector('.auth-form__button');
  const emailInputRef = document.querySelector('#email');
  const passwordInputRef = document.querySelector('#password');

  if (target !== formBtnRef && target !== confirmBtnRef) {
    return;
  }

  switch (target) {
    case formBtnRef:
      modalTitleRef.textContent === 'Sign in'
        ? (modalTitleRef.textContent = 'Registration')
        : (modalTitleRef.textContent = 'Sign in');

      confirmBtnRef.textContent === 'Sign in'
        ? (confirmBtnRef.textContent = 'Sign up')
        : (confirmBtnRef.textContent = 'Sign in');

      formTextRef.textContent === 'Already registered?'
        ? (formTextRef.textContent = "Don't have account?")
        : (formTextRef.textContent = 'Already registered?');

      formBtnRef.textContent === 'Sign in!'
        ? (formBtnRef.textContent = 'Register!')
        : (formBtnRef.textContent = 'Sign in!');
      break;

    case confirmBtnRef:
      const email = emailInputRef.value;
      const password = passwordInputRef.value;

      if (!email || !password || password.length < 6) {
        return;
      }

      switch (target.textContent) {
        case 'Sign in':
          Authentication.signIn(email, password);
          break;

        case 'Sign up':
          Authentication.signUp(email, password);
          break;
      }
  }
}
