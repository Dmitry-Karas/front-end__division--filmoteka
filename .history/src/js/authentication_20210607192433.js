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

  Swal.fire(authModal);

  const modal = document.querySelector('.auth-modal');
  const modalTitle = document.querySelector('.auth-modal__title');
  const confirmBtn = document.querySelector('.auth-modal__button');
  const formText = document.querySelector('.auth-form__text');
  const formBtn = document.querySelector('.auth-form__button');
  const authFormEmailInput = document.querySelector('#email');
  const authFormPasswordInput = document.querySelector('#password');

  window.addEventListener('click', windowHandler);
}

function windowHandler(e) {
  const target = e.target;
  const modalTitle = document.querySelector('.auth-modal__title');
  const confirmBtn = document.querySelector('.auth-modal__button');
  const formText = document.querySelector('.auth-form__text');
  const formBtn = document.querySelector('.auth-form__button');
  const authFormEmailInput = document.querySelector('#email');
  const authFormPasswordInput = document.querySelector('#password');

  if (target !== formBtn && target !== confirmBtn) {
    return;
  }

  if (target === formBtn) {
    modalTitle.textContent === 'Sign in'
      ? (modalTitle.textContent = 'Registration')
      : (modalTitle.textContent = 'Sign in');

    confirmBtn.textContent === 'Sign in'
      ? (confirmBtn.textContent = 'Sign up')
      : (confirmBtn.textContent = 'Sign in');

    formText.textContent === 'Already registered?'
      ? (formText.textContent = "Don't have account?")
      : (formText.textContent = 'Already registered?');

    formBtn.textContent === 'Sign in!'
      ? (formBtn.textContent = 'Register!')
      : (formBtn.textContent = 'Sign in!');
  }

  if (target === confirmBtn) {
    const email = authFormEmailInput.value;
    const password = authFormPasswordInput.value;

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

// window.addEventListener('click', windowHandler);
Auth.checkUser();
