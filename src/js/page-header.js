import pageHeaderHomeTpl from '../templates/pageHeaderHomeTpl.hbs';
import pageHeaderLibraryTpl from '../templates/pageHeaderLibraryTpl.hbs';
import { renderMarkup, clearMarkup } from './common/functions';
import movieCatalogLibraryTpl from '../templates/movieCatalogLibrary.hbs'; //!!!! Настя
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
  paginationRef,
} from './common/refs';
import { Notify } from './sweetAlert';
import { getUserLibraryFromLocalStorage } from './localStorage'; //!!!! Добавила для получения масива из лс - Настя
import { pagination } from './pagination';
import paginationTmp from '../templates/pagination.hbs';
import nothingHereImg from '../images/nothing-here.jpg';

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

    document.body.style.cssText = 'animation-duration: 350ms; animation-name: fadeOut;';

    setTimeout(() => {
      document.body.style.cssText = 'animation-duration: 350ms; animation-name: fadeIn;';
      paginationRef.classList.remove('visually-hidden');

      changePage(home);
      clearMarkup(listFilmsRef);
      listenInput();
      changeCurrentButtonClass();
    }, 350);

    normalizePaginationPage();
  }

  // Рендер разметки библиотеки при клике на кнопку my library
  if (target === libraryButtonRef) {
    const user = getCurrentUser();

    if (!user) {
      Notify.needToSignIn();
      return;
    }

    document.body.style.cssText = 'animation-duration: 350ms; animation-name: fadeOut;';

    const library = pageHeaderLibraryTpl();
    setTimeout(() => {
      const { queue } = getUserLibraryFromLocalStorage(); // !!!! Настя

      document.body.style.cssText = 'animation-duration: 350ms; animation-name: fadeIn;';
      paginationRef.classList.add('visually-hidden');

      changePage(library);
      clearMarkup(listFilmsRef);
      changeCurrentButtonClass();

      if (!queue.length) {
        renderMarkup(
          listFilmsRef,
          `<img class="nothing-here-img" src="${nothingHereImg}" alt="nothing-here-yet">`,
        );
      }
      // Разметка очереди - Настя
      renderMarkup(listFilmsRef, movieCatalogLibraryTpl(queue)); // !!!! Настя
      // Активная кнопка Queue - Настя
      const queueLibBtn = document.querySelector('.library__button--Queue'); // !!!! Настя
      queueLibBtn.classList.add('button--active'); // !!!! Настя
    }, 350);
  }
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

function normalizePaginationPage() {
  const paginationRef = document.querySelector('.pagination');

  clearMarkup(paginationRef);
  renderMarkup(paginationRef, paginationTmp());
  pagination();
}
