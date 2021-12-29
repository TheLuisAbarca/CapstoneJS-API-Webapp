import { DataAPI } from './Involvement_API';
import { PokemonAPI } from './PokeTCG_API';
import { createModalPopUp } from './modal-comment';

const PokeCards = document.getElementById('pokeCards');
const modalContainer = document.getElementById('modal-popup-container');
const headerContainer = document.getElementById('navContainer');
const mainContainer = document.getElementById('mainContainer');
const footeContainer = document.getElementById('footerContainer');

const updateLikeCount = (likeCount, pokemonId) => {
  const likeCountElement = document.getElementById(`likeCount${pokemonId}`);
  likeCountElement.innerHTML = likeCount;
};

const getOnelikeCount = (pokemonId) => DataAPI.microverseInvolvement.getLikes().then((data) => {
  const UpdateLikeCount = data.filter((like) => like.item_id === pokemonId);
  if (typeof UpdateLikeCount === 'object' && UpdateLikeCount.length === 0) {
    return 0;
  }
  return UpdateLikeCount[0].likes;
});

const countNumberOfCards = () => {
  const numberOfCards = document.querySelectorAll('.card');
  return numberOfCards.length;
};

const displayNumberOfCards = (howmany) => {
  const numberOfCards = document.getElementById('numberOfCards');
  numberOfCards.innerHTML = ` [${howmany}]`;
};

const loader = (pokefields) => {
  const loader = document.createElement('div');
  const iconSpinner = document.createElement('i');
  const message = document.createElement('h3');
  const span = document.createElement('span');
  loader.classList.add('loader', 'fa-2x', 'row', 'justify-content-center', 'align-items-center');
  iconSpinner.classList.add('fas', 'fa-spinner', 'fa-spin', 'text-white');
  message.classList.add('col-6', 'd-flex', 'justify-content-end', 'align-items-center', 'text-white');
  span.classList.add('col-6', 'd-flex', 'justify-content-start', 'align-items-center', 'text-white');
  loader.style.height = '80vh';
  message.innerText = 'Loading';
  span.appendChild(iconSpinner);
  loader.appendChild(message);
  loader.appendChild(span);
  pokefields.appendChild(loader);
  return loader;
};

const createPokeCard = (pokemon) => {
  const cardContainer = document.createElement('div');
  const card = document.createElement('div');
  const imgContainer = document.createElement('img');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h5');
  const likeIconContainer = document.createElement('a');
  const likeIcon = document.createElement('i');
  const likeCount = document.createElement('span');
  const cardText = document.createElement('p');
  const commentButton = document.createElement('a');
  cardContainer.classList.add('col-12', 'col-sm-6', 'col-md-3', 'pt-4');
  card.classList.add('card', 'border', 'border-2', 'border-black', 'card-style');
  imgContainer.classList.add('card-img-top');
  imgContainer.alt = `Pokemon Card image of ${pokemon.name}`;
  imgContainer.src = pokemon.images.small;
  cardBody.classList.add('card-body', 'row', 'justify-content-center', 'align-items-center');
  cardTitle.classList.add('card-title', 'pb-2', 'col-6', 'd-flex', 'justify-content-center', 'align-items-center');
  cardTitle.innerText = pokemon.name;
  likeIconContainer.classList.add('col-4', 'pb-2', 'd-flex', 'justify-content-center', 'align-items-center', 'iconLike');
  likeIcon.classList.add('fas', 'fa-heart', 'fa-2x', 'col-4', 'd-flex', 'justify-content-center', 'align-items-center');
  likeCount.classList.add('col-2', 'd-flex', 'justify-content-center', 'align-items-center');
  likeCount.id = `likeCount${pokemon.id}`;
  likeCount.innerText = 0;
  cardText.classList.add('card-text', 'd-flex', 'justify-content-evenly', 'align-items-center');
  cardText.innerText = pokemon.flavorText || 'No Description';
  commentButton.classList.add('btn', 'btn-primary', 'col-6', 'col-sm-8', 'col-md-10');
  commentButton.id = `commentButton_${pokemon.id}`;
  commentButton.innerText = 'Comments';
  card.style.boxShadow = '4px 4px 10px black';

  likeIconContainer.appendChild(likeIcon);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(likeIconContainer);
  cardBody.appendChild(likeCount);
  cardBody.appendChild(cardText);
  cardBody.appendChild(commentButton);
  card.appendChild(imgContainer);
  card.appendChild(cardBody);
  cardContainer.appendChild(card);
  PokeCards.appendChild(cardContainer);

  likeIconContainer.addEventListener('click', () => {
    DataAPI.microverseInvolvement.postLike(pokemon.id).then(() => {
      getOnelikeCount(pokemon.id).then((data) => {
        updateLikeCount(data, pokemon.id);
      });
    });
  });

  commentButton.addEventListener('click', () => {
    modalContainer.classList.remove('hidden');
    /* Effect of modal transparent background
    headerContainer.classList.add('hidden');
    mainContainer.classList.add('hidden');
    footeContainer.classList.add('hidden'); */
    headerContainer.style.filter = 'blur(8px)';
    mainContainer.style.filter = 'blur(8px)';
    footeContainer.style.filter = 'blur(8px)';
    createModalPopUp(pokemon);
  });
};

const renderAllPokeCards = (setId) => {
  const pokeCards = document.getElementById('pokeCards');
  const mainContainer = document.getElementById('mainContainer');
  mainContainer.style.overflowY = 'hidden';
  const element2dissapear = loader(pokeCards);
  PokemonAPI.TCGpokemon.getAllCardsFromSet(setId).then((data) => {
    data.data.forEach((pokemon) => {
      createPokeCard(pokemon);
    });
    return data.data;
  }).then((arrayPokemonInfo) => {
    mainContainer.style.overflowY = 'scroll';
    pokeCards.removeChild(element2dissapear);
    arrayPokemonInfo.forEach((pokemon) => {
      getOnelikeCount(pokemon.id).then((data) => {
        updateLikeCount(data, pokemon.id);
      });
    });
    const numberCards = countNumberOfCards();
    displayNumberOfCards(numberCards);
  });
};

export {
  createPokeCard,
  renderAllPokeCards,
  countNumberOfCards,
  displayNumberOfCards,
};