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
    // closeButton: '',
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
  buttonsStyling: false,
  showCloseButton: true,
  // focusConfirm: true,
  allowEnterKey: true,

  preConfirm: () => {
    const email = Swal.getPopup().querySelector('#email').value;
    const password = Swal.getPopup().querySelector('#password').value;
    if (!email || !password) {
      return Swal.showValidationMessage(`Please enter email and password`);
    }

    if (password.length < 6) {
      return Swal.showValidationMessage(`Password must be at least 6 characters long`);
    }

    return false;
  },
};

export class AuthMessage {
  static async incorrectPassword() {
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

  static async invalidEmail() {
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

  static async notFound() {
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
      title: 'User not found :(',
    });
  }

  static async alreadyExists() {
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
      title: 'Email is already registered!',
      // text: 'Sign in or try another email',
    });
  }

  static async signedIn() {
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

  static async signedUp() {
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
      title: 'Registration successful!',
      text: 'Now you can use the library ;)',
    });
  }

  static async signedOut() {
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
}
