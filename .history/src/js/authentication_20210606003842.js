import Swal from 'sweetalert2';
import { Auth } from './authService';
import { authButtonRef } from './common/refs';
import { authModal } from './sweetAlert';

authButtonRef.addEventListener('click', onAuthButtonClick);

async function onAuthButtonClick(event) {
  const signed = event.currentTarget.textContent === 'Sign out';

  if (signed) {
    return Auth.signOut();
  }

  const values = (await Swal.fire(authModal)).value;
  const authModalTitle = document.querySelector('.auth-modal__title');
  console.log('~ authModalTitle', authModalTitle);

  if (values) {
    const { email, password } = values;

    if (condition) {
      Auth.signIn(email, password);
    }
  }
}

function windowHandler(e) {
  const signUpBtn = e.target.dataset.button === 'signUp';
  const authModalTitle = document.querySelector('.auth-modal__title');
  const authModalConfirmBtn = document.querySelector('.auth-modal__button');
  const authFormText = document.querySelector('.auth-form__text');
  const authFormBtn = document.querySelector('.auth-form__button');

  if (!signUpBtn) {
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

  authFormBtn.textContent === 'Sign in!'
    ? (authFormBtn.textContent = 'Register!')
    : (authFormBtn.textContent = 'Sign in!');
}

window.addEventListener('click', windowHandler);
Auth.checkUser();
