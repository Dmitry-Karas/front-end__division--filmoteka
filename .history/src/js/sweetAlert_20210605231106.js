import Swal from 'sweetalert2';
import authForm from '../templates/authForm.hbs';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import 'sweetalert2/src/sweetalert2.scss';

export const authModal = {
  title: 'Sign in',
  html: authForm(),
  customClass: {
    container: '...',
    popup: 'auth-modal',
    // header: '...',
    title: 'auth-modal__title',
    // closeButton: '...',
    // icon: '...',
    // image: '...',
    // content: '...',
    // htmlContainer: 'auth-modal__form',
    // input: '...',
    // inputLabel: '...',
    // validationMessage: '...',
    // actions: '...',
    confirmButton: 'auth-modal__button',
    // denyButton: '...',
    // cancelButton: '...',
    // loader: '...',
    // footer: '....',
  },
  confirmButtonText: 'Sign in',
  confirmButtonColor: 'lightgreen',
  // buttonsStyling: false,
  // showCloseButton: true,
  focusConfirm: true,

  preConfirm: () => {
    const email = Swal.getPopup().querySelector('#email').value;
    const password = Swal.getPopup().querySelector('#password').value;
    if (!email || !password) {
      Swal.showValidationMessage(`Please enter email and password`);
    }
    return { email, password };
  },
};

export async function incorrectPasswordErrMsg() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  await Toast.fire({
    icon: 'error',
    // title: 'Error',
    title: 'Incorrect password!',
  });
}

export async function invalidEmailErrMsg() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  await Toast.fire({
    icon: 'error',
    title: 'Invalid email!',
    text: 'Make sure the email address you entered is correct',
  });
}

export async function userNotFoundMsg() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  await Toast.fire({
    icon: 'warning',
    title: 'User not found :(',
  });
}

export async function signedInMsg() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  await Toast.fire({
    icon: 'success',
    title: 'Welcome!',
    text: 'You are successfully signed in',
  });
}

export async function signedOutMsg() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  await Toast.fire({
    icon: 'info',
    title: 'See you!',
    text: 'You are signed out. Come back soon ;)',
  });
}

//   await Toast.fire({
//     icon: 'success',
//     title: 'Success',
//   });
//   await Toast.fire({
//     icon: 'warning',
//     title: 'Warning',
//   });
//   await Toast.fire({
//     icon: 'info',
//     title: 'Info',
//   });
//   await Toast.fire({
//     icon: 'question',
//     title: 'Question',
//   });
// passwordErr();
