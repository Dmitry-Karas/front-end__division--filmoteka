import modalTeam from '../templates/modalTeam.hbs';
import teamList from './team.js';
import { backdrop, teamBtn } from './common/refs';
import { renderMarkup, clearMarkup } from './common/functions';

teamBtn.addEventListener('click', onOpenModal);
backdrop.addEventListener('click', onOverlayClick);

function onOpenModal() {
  renderModalTeam();

  const closeTeamBtn = document.querySelector('[data-action="close-btn-team"]');

  backdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');

  window.addEventListener('keydown', onKeyPress);
  closeTeamBtn.addEventListener('click', onCloseModal);
}

function onKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function onCloseModal() {
  backdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-open');

  clearMarkup(backdrop);

  window.removeEventListener('keydown', onKeyPress);
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function renderModalTeam() {
  const markup = modalTeam(teamList);

  renderMarkup(backdrop, markup);
}
