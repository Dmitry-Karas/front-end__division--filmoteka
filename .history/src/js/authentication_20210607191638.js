import Swal from 'sweetalert2';
import { Auth } from './authService';
import { authButtonRef } from './common/refs';
import { authModal } from './sweetAlert';

authButtonRef.addEventListener('click', onAuthModalOpen);

async function onAuthModalOpen(e) {
  const signed = e.currentTarget.textContent === 'Sign out';

  if (signed) {
    return Auth.signOut();
  }

  // const values = (await Swal.fire(authModal)).value;
  Swal.fire(authModal);

  const modal = document.querySelector('.auth-modal');
  const authModalTitle = document.querySelector('.auth-modal__title');
  const authModalConfirmBtn = document.querySelector('.auth-modal__button');
  const authFormText = document.querySelector('.auth-form__text');
  const authFormBtn = document.querySelector('.auth-form__button');
  const authFormEmailInput = document.querySelector('#email');
  const authFormPasswordInput = document.querySelector('#password');

  window.addEventListener('click', windowHandler);
  // const { email, password } = (await Swal.fire(authModal)).value;

  // if (!values) {
  //   return;
  // }

  // const { email, password } = values;

  // Auth.signIn(email, password);
}

function name(params) {}

async function windowHandler(e) {
  const target = e.target;
  const authModalTitle = document.querySelector('.auth-modal__title');
  const authModalConfirmBtn = document.querySelector('.auth-modal__button');
  const authFormText = document.querySelector('.auth-form__text');
  const authFormBtn = document.querySelector('.auth-form__button');
  const authFormEmailInput = document.querySelector('#email');
  const authFormPasswordInput = document.querySelector('#password');

  if (target !== authFormBtn && target !== authModalConfirmBtn) {
    return;
  }

  if (target === authModalConfirmBtn) {
    const email = authFormEmailInput.value;
    const password = authFormPasswordInput.value;
    switch (target.textContent) {
      case 'Sign in':
        if (!email || password) {
          return;
        }

        Auth.signIn(email, password);
        break;

      case 'Sign up':
        if (!email || password) {
          return;
        }

        Auth.signUp(email, password);
        break;
    }
    // target.textContent.toLowerCase() === 'sign in'?
  }

  if (target === authFormBtn) {
    authModalTitle.textContent === 'Sign in'
      ? (authModalTitle.textContent = 'Registration')
      : (authModalTitle.textContent = 'Sign in');

    authModalConfirmBtn.textContent === 'Sign in'
      ? (authModalConfirmBtn.textContent = 'Sign up')
      : (authModalConfirmBtn.textContent = 'Sign in');

    authFormText.textContent === 'Already registered?'
      ? (authFormText.textContent = "Don't have account?")
      : (authFormText.textContent = 'Already registered?');

    authFormBtn.textContent === 'Sign in!'
      ? (authFormBtn.textContent = 'Register!')
      : (authFormBtn.textContent = 'Sign in!');
  }
}

// window.addEventListener('click', windowHandler);
Auth.checkUser();
