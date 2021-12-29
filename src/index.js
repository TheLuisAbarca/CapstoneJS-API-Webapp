import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './css/bootstrap.min.css';
import './js/bootstrap.min.js';// eslint-disable-line import/extensions
import './css/style.css';

import { renderAllPokeCards, displayNumberOfCards } from './homepage';
import { PokemonAPI } from './PokeTCG_API';

const personalizedMessage = (mixobject) => {
  const messageParentContainer = document.createElement('div');
  const messageContainer = document.createElement('div');
  const message = document.createElement('h3');
  const messageIcon = document.createElement('i');
  const messageSpan = document.createElement('span');
  const mainContainer = document.getElementById('mainContainer');
  mainContainer.style.overflowY = 'hidden';
  messageParentContainer.classList.add('row', 'justify-content-center', 'align-items-center');
  messageParentContainer.id = 'msgParentContainer';
  messageContainer.classList.add('col-12', 'd-flex', 'justify-content-center', 'align-items-center', 'text-white');
  message.classList.add('col-10', 'd-flex', 'justify-content-end', 'align-items-center', 'text-white');
  messageIcon.classList.add(`${mixobject.prefixIcon}`, `${mixobject.specificIcon}`, 'fa-2x', 'text-white');
  messageSpan.classList.add('col-2', 'd-flex', 'justify-content-start', 'align-items-center', 'text-white');
  messageParentContainer.style.height = '80vh';
  message.innerText = mixobject.message;
  messageSpan.appendChild(messageIcon);
  messageContainer.appendChild(message);
  messageContainer.appendChild(messageSpan);
  messageParentContainer.appendChild(messageContainer);
  return messageParentContainer;
};

const populateSelectSets = () => {
  const selectSets = document.getElementById('parentSetCards');
  const PokeCards = document.getElementById('pokeCards');
  const optionElement = document.createElement('option');
  optionElement.classList.add('text-white');
  optionElement.innerText = 'Sets';
  optionElement.value = 'Sets';
  optionElement.selected = true;
  selectSets.appendChild(optionElement);
  PokemonAPI.TCGpokemon.getAllSets().then((data) => {
    data.data.forEach((set) => {
      const optionElement = document.createElement('option');
      optionElement.innerText = `${set.name} [${set.printedTotal}]`;
      optionElement.value = set.id;
      selectSets.appendChild(optionElement);
    });
  }).then(() => {
    renderAllPokeCards('base1');
  });

  // renderAllPokeCards('base1');

  selectSets.addEventListener('change', () => {
    const btnToggler = document.getElementById('nav-toggler');
    const navbar = document.getElementById('navbarCollapse');
    btnToggler.classList.add('collapsed');
    btnToggler.setAttribute('aria-expanded', 'false');
    navbar.classList.remove('show');
    displayNumberOfCards(0);
    PokeCards.innerHTML = '';
    const selectedSet = selectSets.options[selectSets.selectedIndex].value;
    if (selectedSet && selectedSet !== 'Sets') {
      renderAllPokeCards(selectedSet);
    } else if (selectedSet && selectedSet === 'Sets') {
      const messageSet = personalizedMessage({ message: 'Select a Set of cards', prefixIcon: 'fas', specificIcon: 'fa-exclamation-triangle' });
      PokeCards.appendChild(messageSet);
    }
    // renderAllPokeCards(selectedSet);
  });
  return new Promise((resolve) => {
    resolve('QUE BACAN REGRESA');
  });
};

const main = () => {
  populateSelectSets().then(() => {});
  displayNumberOfCards(0);
};

window.onload = () => {
  main();
};