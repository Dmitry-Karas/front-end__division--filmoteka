import pageHeaderHomeTpl from '../templates/pageHeaderHomeTpl.hbs';
import pageHeaderLibraryTpl from '../templates/pageHeaderLibraryTpl.hbs';
import { renderMarkup, clearMarkup } from './common/functions';
import listenInput from './provideFilms';
import { getCurrentUser } from './localStorage';
import {
  headerRef,
  logoRef,
  navListRef,
  homeButtonRef,
  libraryButtonRef,
  headerDynamicContainerRef,
  listFilmsRef,
} from './common/refs';
import { Notify } from './sweetAlert';

renderMarkup(headerDynamicContainerRef, pageHeaderHomeTpl()); // Рендер разметки домашней страницы по-умолчанию
listenInput();

// Меняет интерфейс хэдэра при выборе страницы
function onPageChange(e) {
  const target = e.target; // Кликнутый элемент
  const currentButtonRef = navListRef.querySelector('.site-nav__button--current'); // Кнопка текущей страницы
  const currentButtonTarget = target === currentButtonRef;
  const logoTarget = target.closest('a') === logoRef;
  const navButtonTarget = target.className === 'site-nav__button';
  const signOutBtnTarget = target.textContent === 'Sign out';
  // Выход из функции, если...
  if (
    // Клик по текущей кнопке
    currentButtonTarget ||
    // Клик не по кнопкам навигации и ЛК
    (!logoTarget && !navButtonTarget && !signOutBtnTarget) ||
    // Клик по лого на домашней странице
    (logoTarget && homeButtonRef === currentButtonRef) ||
    // Выход из ЛК на домашней странице
    (signOutBtnTarget && homeButtonRef === currentButtonRef)
  ) {
    return;
  }

  // Рендер разметки домашней страницы при клике на кнопку home или логотип
  if (target === homeButtonRef || logoTarget || signOutBtnTarget) {
    const home = pageHeaderHomeTpl();

    changePage(home);
    clearMarkup(listFilmsRef);
    listenInput();
  }

  // Рендер разметки библиотеки при клике на кнопку my library
  if (target === libraryButtonRef) {
    const user = getCurrentUser();

    if (!user) {
      Notify.needToSignIn();
      return;
    }

    const library = pageHeaderLibraryTpl();

    changePage(library);
    clearMarkup(listFilmsRef);
  }

  // Смена класса активной кнопки
  changeCurrentButtonClass();
}

function changePage(markup) {
  clearMarkup(headerDynamicContainerRef);
  renderMarkup(headerDynamicContainerRef, markup);

  changePageHeaderClass();
}

function changeCurrentButtonClass() {
  homeButtonRef.classList.toggle('site-nav__button--current');
  libraryButtonRef.classList.toggle('site-nav__button--current');
}

function changePageHeaderClass() {
  headerRef.classList.toggle('page-header--home');
  headerRef.classList.toggle('page-header--library');
}

headerRef.addEventListener('click', onPageChange);
