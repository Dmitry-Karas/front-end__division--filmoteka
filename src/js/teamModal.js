import modalTeam from '../templates/modalTeam.hbs';
import teamList from './team.js';
import { clearMarkup, renderMarkup } from './common/functions';

const refs = {
  team: document.querySelector('.team'),
  modalFooterEl: document.querySelector('.js-team'),
  teamBtn: document.querySelector('.button-team'),
};




function renderModalTeam() {
  const markup = modalTeam(teamList);
  refs.modalFooterEl.insertAdjacentHTML('beforeend', markup);
}

refs.teamBtn.addEventListener('click', onOpenModal);
renderModalTeam();

const closeTeamBtn = document.querySelector('[data-action="close-btn-team"]');
const modalTeamOverlay = document.querySelector('.team__overlay');
closeTeamBtn.addEventListener('click', onCloseModal);
modalTeamOverlay.addEventListener('click', onOverlayClick);

function onOpenModal() {
  refs.modalFooterEl.classList.add('is-open');
  window.addEventListener('keydown', onKeyPress);
}

function onKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function onCloseModal() {
  refs.modalFooterEl.classList.remove('is-open');
  window.removeEventListener('keydown', onKeyPress);
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}