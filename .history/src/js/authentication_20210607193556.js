import Swal from 'sweetalert2';
import { Auth } from './authService';
import { authBtnRef } from './common/refs';
import { authModal } from './sweetAlert';

authBtnRef.addEventListener('click', onAuthModalOpen);

function onAuthModalOpen(e) {
  const signed = e.currentTarget.textContent === 'Sign out';

  if (signed) {
    return Auth.signOut();
  }

  Swal.fire(authModal);

  window.addEventListener('click', windowHandler);
}

function windowHandler(e) {
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

  if (target === formBtnRef) {
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
  }

  if (target === confirmBtnRef) {
    const email = emailInputRef.value;
    const password = passwordInputRef.value;

    if (!email || !password) {
      return;
    }

    switch (target.textContent) {
      case 'Sign in':
        Auth.signIn(email, password);
        break;

      case 'Sign up':
        Auth.signUp(email, password);
        break;
    }
  }
}

Auth.checkUser();
