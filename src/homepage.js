import { DataAPI } from './Involvement_API';
import { PokemonAPI } from './PokeTCG_API';

const PokeCards = document.getElementById('pokeCards');

const updateLikeCount = (likeCount, pokemonId) => {
  const likeCountElement = document.getElementById(`likeCount${pokemonId}`);
  likeCountElement.innerHTML = likeCount;
};

const getOnelikeCount = (pokemonId) => DataAPI.microverseInvolvement.getLikes().then((data) => {
  const UpdateLikeCount = data.filter((like) => like.item_id === pokemonId);
  return UpdateLikeCount[0].likes;
});

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
  commentButton.classList.add('btn', 'btn-primary', 'col-6');
  commentButton.innerText = 'Comments';

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
  /* cardContainer.addEventListener('click', () => {
          const modal = document.getElementById('modal');
          const modalImg = document.getElementById('modal-img');
          const modalTitle = document.getElementById('modal-title');
          const modalText = document.getElementById('modal-text');
          const modalClose = document.getElementById('modal-close');
          modal.style.display = 'block';
          modalImg.src = pokemon.images.large;
          modalTitle.innerText = pokemon.name;
          modalText.innerText = pokemon.text;
          modalClose.addEventListener('click', () => {
              modal.style.display = 'none';
          })
      } */

  likeIconContainer.addEventListener('click', () => {
    DataAPI.microverseInvolvement.postLike(pokemon.id).then(() => {
      getOnelikeCount(pokemon.id).then((data) => {
        updateLikeCount(data, pokemon.id);
      });
    });
  });
};

const renderAllPokeCards = () => {
  PokemonAPI.TCGpokemon.getTwelveCardsSwSh().then((data) => {
    data.data.forEach((pokemon) => {
      createPokeCard(pokemon);
    });
    return data.data;
  }).then((arrayPokemonInfo) => {
    arrayPokemonInfo.forEach((pokemon) => {
      getOnelikeCount(pokemon.id).then((data) => {
        updateLikeCount(data, pokemon.id);
      });
    });
  });
};
// eslint-disable-next-line import/prefer-default-export
export {
// eslint-disable-next-line import/prefer-default-export
  createPokeCard,
  renderAllPokeCards,
};