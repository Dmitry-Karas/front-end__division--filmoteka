// регистрация обзервера
const back2topObserver = new intersectionObserver(onEntryBack2top);

function onEntryBack2top(entries) {
  back2TopBtnRef.classList.add('show');

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      back2TopBtnRef.classList.remove('show');
    }
  });
}
// элемент за котрый надо следить
back2topObserver.observe('#container');

// ссылка на кнопку Вверх
const back2TopBtnRef = document.querySelector('.back2top');

function onClick() {
  window.scrollTo({ top, behavior: 'smooth' });
}

back2TopBtnRef.addEventListener('click', onClick);
