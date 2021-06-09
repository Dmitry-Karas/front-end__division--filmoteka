import 'spin.js/spin.css';
import { Spinner } from 'spin.js';

const opts = {
    lines: 12, // The number of lines to draw
    length: 9, // The length of each line
    width: 33, // The line thickness
    radius: 65, // The radius of the inner circle
    scale: 0.85, // Scales overall size of the spinner
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

const spinnerForMovieList = document.querySelector('.movie__list');
console.log(spinnerForMovieList);
const spinner = new Spinner(opts).spin(spinnerForMovieList);

// const spinnerClass = document.querySelector('.spinner');

// document.addEventListener("DOMContentLoaded", stopSpinner);

// document.addEventListener("DOMContentLoaded", spinnersForMoviesPhotos);
// window.addEventListener("load", stopSpinner);

// window.onload = stopSpinner;

function spinnersForMoviesPhotos(){
    
    const spinnerForMovieItems = document.querySelector('.movie__photo');
    
    console.log(spinnerForMovieItems);
       if (!spinnerForMovieItems.onload){
        const spinnersPhotos = new Spinner(opts).spin(spinnerForMovieItems);
     }
    // spinnerForMovieItems.addEventListener("load", spinnersPhotos);
};

export default function stopSpinner(){
    // spinnerClass.classList.add('is-hidden');
    spinner.stop();
    spinnersForMoviesPhotos();
//     setTimeout(() => {
// //         // spinnerClass.setAttribute('hidden', true);
// //         spinnerClass.classList.add('is-hidden');
//         spinner.stop();
//     }, 1000); 
};