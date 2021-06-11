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
    top: '70%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 5 5px transparent', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    position: 'absolute', // Element positioning
  };

const spinnerForMovieListEl = document.querySelector('.movie__list');
const spinner = new Spinner(opts).spin(spinnerForMovieListEl);

window.addEventListener("load", stopSpinner);

// const spinnerClass = document.querySelector('.spinner');
// document.addEventListener("DOMContentLoaded", stopSpinner);

//вешаем слушателя на элемент списка и для каждого элемента создаем экземпляр спиннера
export default function addSpinners(){  
    addSpinnersForMoviesItems();
    // addSpinnerForModalWindow();
};

function addSpinnersForMoviesItems(){
    const spinnerForMoviesItemsEl = document.querySelectorAll('.movie__item');
    spinnerForMoviesItemsEl.forEach(addSpinnerForMovieItem);
};

//функция для добавления спиннера на каждый элемент
function addSpinnerForMovieItem(item) {    
    let spinnerForItem = new Spinner({...opts, scale: 0.3, top: '20%', position: 'relative'}).spin(item);
    
    setTimeout(() => {
        spinnerForItem.stop();
    }, 500); 
    
    // item.childNodes[2].onload = spinnerForItem.stop();

    // if(item.childNodes[2].src !== ''){
    //     console.log(item);
    //     // spinner1.stop();
    // }  
  };

function addSpinnerForModalWindow(){
    const spinnerForModalWindowEl = document.querySelectorAll('.modal-window');
    // console.log(spinnerForModalWindowEl);
    const spinnerForModalWindow = new Spinner(opts).spin(spinnerForModalWindowEl);
};

function stopSpinner(){
    spinner.stop();
};


// setTimeout(() => {
//     // spinnerClass1.classList.add('is-hidden');
//     spinner1.stop();
// }, 1000); 