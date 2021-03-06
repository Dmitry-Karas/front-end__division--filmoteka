import 'spin.js/spin.css';
import { Spinner } from 'spin.js';

const opts = {
  lines: 12, // The number of lines to draw
  length: 9, // The length of each line
  width: 33, // The line thickness
  radius: 65, // The radius of the inner circle
  scale: 0.8, // Scales overall size of the spinner
  corners: 0.2, // Corner roundness (0..1)
  speed: 0.8, // Rounds per second
  rotate: 61, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ff6b01', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '80%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 5 5px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

const spinnerForMovieListEl = document.querySelector('.movie__list');
const spinner = new Spinner(opts).spin(spinnerForMovieListEl);

export function stopSpinner() {
  spinner.stop();
}

export function addSpinnersForMoviesItems() {
  const spinnerForMoviesItemsEl = document.querySelectorAll('.movie__item');
  spinnerForMoviesItemsEl.forEach(addSpinnerForMovieItem);
}

//функция для добавления экземляра спиннера на каждый элемент, остановка спиннера после загрузки картинки
function addSpinnerForMovieItem(item) {
  const spinnerForItem = new Spinner({
    ...opts,
    scale: 0.3,
    top: '43%',
    position: 'relative',
  }).spin(item);

  item.childNodes[2].addEventListener('load', stopSpinner);

  function stopSpinner() {
    spinnerForItem.stop();
  }
}

//функция для добавления спиннера на модальное окно
export function addSpinnerForModalWindow() {
  //спиннер для класса modal-window
  const spinnerForModalWindowEl = document.querySelector('.modal-window');
  const spinnerForModalWindow = new Spinner({ ...opts, scale: 0.5, top: '50%' }).spin(
    spinnerForModalWindowEl,
  );

  spinnerForModalWindowEl.childNodes[4].addEventListener('load', stopSpinner);

  function stopSpinner() {
    spinnerForModalWindow.stop();
  }
}
