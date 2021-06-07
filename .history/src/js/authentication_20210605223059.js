import Swal from 'sweetalert2';
import { Auth } from './authService';
import { authButtonRef } from './common/refs';
import { authModal } from './sweetAlert';

window.addEventListener('click', onAuthButtonClick);

async function onAuthButtonClick(event) {
  if (event.currentTarget.textContent === 'Sign out') {
    return Auth.signOut();
  }

  const values = (await Swal.fire(authModal)).value;
  const create = document.querySelector('.auth-form__button');

  if (values) {
    const { email, password } = values;

    Auth.signIn(email, password);
  }
}

Auth.checkUser();
