import Swal from 'sweetalert2';
import { Auth } from './authService';
import { authButtonRef } from './common/refs';
import { authModal } from './sweetAlert';

authButtonRef.addEventListener('click', onAuthButtonClick);

async function onAuthButtonClick(event) {
  if (event.currentTarget.textContent === 'Sign out') {
    return Auth.signOut();
  }

  const values = (await Swal.fire(authModal)).value;

  // create.addEventListener('click', () => {
  //   console.log(event);
  // });

  if (values) {
    const { email, password } = values;

    Auth.signIn(email, password);
  }
}

function windowHandler(e) {
  const signUpBtn = e.target.dataset.button === 'signUp';
  console.log(e.target.closest('H2'));
  if (!signUpBtn) {
    return;
  }

  // const title = document.querySelector('.auth-form__title');
  // console.log('~ title', title);
}

window.addEventListener('click', windowHandler);
Auth.checkUser();
