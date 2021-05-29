import { themeSwitcherRef } from './common/refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

// Самовызывающаяся функция на проверку сохраненной темы
(function checkSavedTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === Theme.LIGHT) {
    switchTheme(Theme.LIGHT);
  }

  if (savedTheme === Theme.DARK) {
    themeSwitcherRef.checked = true;

    switchTheme(Theme.DARK);
  }
})();

// Функция смены темы
function switchTheme(theme) {
  if (theme) {
    document.body.classList.add(theme); // Если тема явно указана, меняет на нее
  } else {
    document.body.classList.toggle(Theme.LIGHT);
    document.body.classList.toggle(Theme.DARK);
  }
}

// Функция сохранения темы
function saveTheme() {
  if (themeSwitcherRef.checked) {
    localStorage.setItem('theme', Theme.DARK);
  } else {
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

function onThemeSwitch() {
  switchTheme();
  saveTheme();
}

themeSwitcherRef.addEventListener('click', onThemeSwitch);
