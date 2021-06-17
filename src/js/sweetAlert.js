import Swal from 'sweetalert2';
import authForm from '../templates/authForm.hbs';

export const authModal = {
  title: 'Sign in',
  html: authForm(),
  customClass: {
    container: '...',
    popup: 'auth-modal',
    // header: '...',
    title: 'auth-modal__title',
    // icon: '...',
    // image: '...',
    // content: '...',
    // htmlContainer: 'auth-modal__form',
    // input: '...',
    // inputLabel: '...',
    // validationMessage: '...',
    // actions: '...',
    confirmButton: 'auth-modal__confirm-btn',
    // denyButton: '...',
    // cancelButton: '...',
    // loader: '...',
    // footer: '....',
  },
  confirmButtonText: 'Sign in',
  buttonsStyling: false,
  allowEnterKey: true,

  preConfirm: () => {
    const email = Swal.getPopup().querySelector('#email').value;
    const password = Swal.getPopup().querySelector('#password').value;
    const confirmBtn = Swal.getPopup().querySelector('.auth-modal__confirm-btn');
    const resetBtn = confirmBtn.textContent === 'Reset';

    if (resetBtn && !email) {
      return Swal.showValidationMessage(`Please enter email`);
    }

    if (resetBtn && !password) {
      return;
    }

    if (!email || !password) {
      return Swal.showValidationMessage(`Please enter email and password`);
    }

    if (password.length < 6) {
      return Swal.showValidationMessage(`Password must be at least 6 characters long`);
    }
  },
};

export class Notify {
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

  static async emailAlreadyInUse() {
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

  static async resetPassword() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: 'info',
      title: 'Email sent!',
      text: 'Check your inbox for a password reset link',
    });
  }

  static async needToSignIn() {
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
      title: 'Hold on!',
      text: 'You need to sign in before use the library',
    });
  }

  static async toManyRequests() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: 'warning',
      title: 'Too many requests!',
      text:
        'We have blocked all requests from this device due to unusual activity. Try again later.',
    });
  }

  // static async thereIsNothingHere() {
  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: 'top-right',
  //     iconColor: 'white',
  //     customClass: {
  //       popup: 'colored-toast',
  //     },
  //     showConfirmButton: false,
  //     timer: 3000,
  //     timerProgressBar: true,
  //   });
  //   await Toast.fire({
  //     icon: 'info',
  //     title: 'Oops.',
  //     text: 'There is nothing here yet',
  //   });
  // }
}
