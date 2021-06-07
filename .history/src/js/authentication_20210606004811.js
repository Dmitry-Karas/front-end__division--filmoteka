import Swal from 'sweetalert2';
import { Auth } from './authService';
import { authButtonRef } from './common/refs';
import { authModal } from './sweetAlert';

authButtonRef.addEventListener('click', onAuthModalOpen);

async function onAuthModalOpen(event) {
  window.addEventListener('click', windowHandler);

  const signed = event.currentTarget.textContent === 'Sign out';

  if (signed) {
    return Auth.signOut();
  }

  const values = (await Swal.fire(authModal)).value;

  if (values) {
    const { email, password } = values;

    if (condition) {
      Auth.signIn(email, password);
    }
  }
}

function windowHandler(e) {
  // console.log(e.target.dataset.button);
  // const signUpBtn = e.target.dataset.button === 'signUp';
  // console.log('~ signUpBtn', signUpBtn);
  const authModalTitle = document.querySelector('.auth-modal__title');
  const authModalConfirmBtn = document.querySelector('.auth-modal__button');
  const authFormText = document.querySelector('.auth-form__text');
  const authFormBtn = document.querySelector('.auth-form__button');

  if (!authFormBtn || !authModalConfirmBtn) {
    return;
  }

  authModalTitle.textContent === 'Sign in'
    ? (authModalTitle.textContent = 'Registration')
    : (authModalTitle.textContent = 'Sign in');

  authModalConfirmBtn.textContent === 'Sign in'
    ? (authModalConfirmBtn.textContent = 'Sign up')
    : (authModalConfirmBtn.textContent = 'Sign in');

  authFormText.textContent === 'Already have account?'
    ? (authFormText.textContent = "Don't have account?")
    : (authFormText.textContent = 'Already have account?');

  signUpBtn.textContent === 'Sign in!'
    ? (signUpBtn.textContent = 'Register!')
    : (signUpBtn.textContent = 'Sign in!');
}

// window.addEventListener('click', windowHandler);
Auth.checkUser();
