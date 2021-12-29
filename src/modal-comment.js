import {
  DataAPI,
} from './Involvement_API';

const modalContainer = document.getElementById('modal-popup-container');
const headerContainer = document.getElementById('navContainer');
const mainContainer = document.getElementById('mainContainer');
const footeContainer = document.getElementById('footerContainer');
const countComments = (pokeId) => DataAPI.microverseInvolvement.getComments(pokeId).then(
  (response) => response.length || 0,
);

const displayCountComments = () => {
  const commentCount = document.querySelectorAll('.commentsRow');
  return commentCount.length;
};

const populateComments = (invComment) => {
  const commentsRow = document.createElement('div');
  const cmntDisplayTime = document.createElement('div');
  const cmntDisplayName = document.createElement('div');
  const cmntDisplayComment = document.createElement('div');
  commentsRow.classList.add('row', 'mt-2', 'justify-content-center', 'align-items-center', 'commentsRow');
  commentsRow.id = `commentRow_${invComment.id}`;
  cmntDisplayTime.classList.add('col-12', 'd-flex', 'justify-content-start', 'align-items-center', 'col-md-2', 'justify-content-md-end', 'text-white');
  cmntDisplayName.classList.add('col-4', 'd-flex', 'justify-content-center', 'align-items-center', 'col-md-2', 'justify-content-md-start', 'text-white', 'fw-bold');
  cmntDisplayComment.classList.add('col-8', 'd-flex', 'justify-content-center', 'align-items-center', 'col-md-8', 'justify-content-md-center', 'text-white');
  cmntDisplayTime.innerText = invComment.creation_date;
  cmntDisplayName.innerText = `${invComment.username}:`;
  cmntDisplayComment.innerText = invComment.comment;
  commentsRow.appendChild(cmntDisplayTime);
  commentsRow.appendChild(cmntDisplayName);
  commentsRow.appendChild(cmntDisplayComment);
  return commentsRow;
};

const renderComments = (pokeId, commentsCol, commentsCounter) => {
  commentsCol.innerHTML = '';
  DataAPI.microverseInvolvement.getComments(pokeId).then((response) => {
    // eslint-disable-next-line no-prototype-builtins
    if (typeof response === 'object' && !response.hasOwnProperty('error')) {
      response.forEach((comment) => {
        commentsCol.classList.remove('d-md-flex', 'justify-content-md-center', 'align-items-md-center');
        commentsCol.style.overflowY = 'scroll';
        /* commentsCol.style.overflowX = 'auto'; */
        const mixObj = { ...comment, id: pokeId };
        const elementComment = populateComments(mixObj);
        commentsCol.appendChild(elementComment);
      });
    } else if (typeof response === 'object' && response.error.status === 400) {
      commentsCol.classList.add('d-flex', 'justify-content-center', 'align-items-center');
      commentsCol.innerText = 'No comments yet';
      commentsCounter.innerText = ' [0]';
    }
  }).then(() => {
    commentsCounter.innerText = ` [${displayCountComments()}]` || ' [0]';
  });
};

const createModalPopUp = (pokemonObject) => {
  const modal = document.createElement('div');
  const closeCol = document.createElement('div');
  const closeIcon = document.createElement('i');
  const bodyModal = document.createElement('div');
  const imageContainer = document.createElement('img');
  const titleContainer = document.createElement('h5');
  const textContainer = document.createElement('p');
  const divHpLabel = document.createElement('div');
  const divHpValue = document.createElement('div');
  const divRarityLabel = document.createElement('div');
  const divRarityValue = document.createElement('div');
  const commentsContainer = document.createElement('div');
  const formContainer = document.createElement('div');
  const firstdivContainer = document.createElement('div');
  const seconddivContainer = document.createElement('div');
  const thirddivContainer = document.createElement('div');
  const labelName = document.createElement('label');
  const labelComment = document.createElement('label');
  const firstInputContainer = document.createElement('div');
  const secondInputContainer = document.createElement('div');
  const inputName = document.createElement('input');
  const inputComment = document.createElement('input');
  const commentBtn = document.createElement('button');
  const spanRow = document.createElement('div');
  const spanMessage = document.createElement('span');
  const commentsColContainer = document.createElement('div');
  const commentsCounter = document.createElement('span');
  const commentTittle = document.createElement('h5');
  commentsColContainer.id = 'fatherCommentsContainer';
  commentsColContainer.style.overflowY = 'hidden';
  commentsColContainer.classList.add('col-12', 'col-md-12', 'd-md-flex', 'justify-content-md-center', 'align-items-md-center', 'text-white');
  formContainer.classList.add('col-12', 'col-md-6');
  commentsContainer.classList.add('row', 'justify-content-center', 'align-items-center', 'mt-3');
  labelName.classList.add('col-form-label');
  labelComment.classList.add('col-form-label');
  firstdivContainer.classList.add('form-group', 'row', 'mt-2', 'align-items-center');
  seconddivContainer.classList.add('form-group', 'row', 'mt-2', 'align-items-center');
  thirddivContainer.classList.add('row', 'pt-2', 'mb-3', 'align-items-center');
  firstInputContainer.classList.add('col-12', 'd-flex', 'justify-content-center', 'align-items-center', 'text-white');
  secondInputContainer.classList.add('col-12', 'd-flex', 'justify-content-center', 'align-items-center', 'text-white');
  inputName.classList.add('form-name-plaintext');
  inputComment.classList.add('form-comment-control');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('placeholder', 'Name');
  inputName.setAttribute('min', '0');
  inputName.setAttribute('oninput', 'validity.valid || (value="")');
  inputComment.setAttribute('type', 'text');
  inputComment.setAttribute('placeholder', 'Comment');
  inputName.setAttribute('min', '0');
  inputName.setAttribute('oninput', 'validity.valid || (value="")');
  commentBtn.classList.add('col-6', 'offset-3', 'col-md-4', 'offset-md-4', 'btn', 'btn-primary', 'commentBtn');
  modal.classList.add('row', 'square-container', 'border', 'border-white', 'rounded', 'm-4');
  closeCol.classList.add('col-12', 'pt-2', 'pb-2', 'd-flex', 'justify-content-end', 'align-items-center', 'close-popup');
  closeIcon.classList.add('far', 'fa-times-circle', 'fa-2x');
  closeIcon.id = 'closeIcon';
  bodyModal.classList.add('row', 'pl-2', 'pr-2', 'justify-content-center', 'align-items-center');
  bodyModal.id = 'bodyModal';
  spanRow.classList.add('row', 'justify-content-center', 'align-items-center');
  spanMessage.classList.add('text-warning', 'fw-bold');
  spanMessage.id = 'spanMessage';
  spanMessage.innerText = '';
  imageContainer.classList.add('col-12');
  titleContainer.classList.add('col-12', 'pt-2', 'd-flex', 'justify-content-evenly', 'align-items-center', 'justify-content-md-center', 'text-white', 'text-uppercase', 'fw-bolder');
  textContainer.classList.add('col-12', 'pt-2', 'd-flex', 'justify-content-center', 'align-items-center', 'text-white', 'text-uppercase');
  divHpLabel.classList.add('col-3', 'pt-2', 'd-flex', 'justify-content-end', 'align-items-center', 'text-white', 'text-uppercase', 'fw-bold');
  divHpValue.classList.add('col-3', 'pt-2', 'd-flex', 'justify-content-start', 'align-items-center', 'text-white', 'text-uppercase');
  divRarityLabel.classList.add('col-3', 'pt-2', 'd-flex', 'justify-content-end', 'align-items-center', 'text-white', 'text-uppercase', 'fw-bold');
  divRarityValue.classList.add('col-3', 'pt-2', 'd-flex', 'justify-content-start', 'align-items-center', 'text-white', 'text-uppercase');
  imageContainer.classList.add('card-img-popup');
  imageContainer.src = pokemonObject.images.small;
  titleContainer.innerText = pokemonObject.name;
  textContainer.innerText = pokemonObject.flavorText || 'No Description';
  divHpLabel.innerText = 'HP:';
  divHpValue.innerText = pokemonObject.hp;
  divRarityLabel.innerText = 'Rarity:';
  divRarityValue.innerText = pokemonObject.rarity;
  labelName.innerText = 'Your Name:';
  labelComment.innerText = 'Comment:';
  inputName.setAttribute('placeholder', 'Your Name');
  inputName.id = 'YourName';
  inputComment.setAttribute('placeholder', 'Comment');
  inputComment.id = 'YourComment';
  commentBtn.innerText = 'Add Comment';
  commentBtn.setAttribute('type', 'submit');
  commentBtn.id = `commentBtn_${pokemonObject.id}`;
  commentsCounter.innerText = ' [0]';
  commentsColContainer.innerText = 'No comments yet';

  commentTittle.classList.add('text-white', 'd-flex', 'justify-content-start', 'justify-content-md-center', 'align-items-center', 'text-uppercase');
  commentsCounter.classList.add('text-white');
  commentTittle.innerText = 'Comments ';
  countComments(pokemonObject.id).then((data) => {
    commentsCounter.innerText = ` [${data}]`;
  });

  firstInputContainer.appendChild(inputName);
  firstdivContainer.appendChild(firstInputContainer);
  secondInputContainer.appendChild(inputComment);
  spanRow.appendChild(spanMessage);
  seconddivContainer.appendChild(secondInputContainer);
  thirddivContainer.appendChild(commentBtn);
  formContainer.appendChild(firstdivContainer);
  formContainer.appendChild(seconddivContainer);
  formContainer.appendChild(spanRow);
  formContainer.appendChild(thirddivContainer);
  commentTittle.appendChild(commentsCounter);
  closeCol.appendChild(closeIcon);
  bodyModal.appendChild(imageContainer);
  bodyModal.appendChild(titleContainer);
  bodyModal.appendChild(divHpLabel);
  bodyModal.appendChild(divHpValue);
  bodyModal.appendChild(divRarityLabel);
  bodyModal.appendChild(divRarityValue);
  bodyModal.appendChild(textContainer);

  bodyModal.appendChild(commentTittle);
  bodyModal.appendChild(commentsColContainer);
  bodyModal.appendChild(formContainer);
  modal.appendChild(closeCol);
  modal.appendChild(bodyModal);
  modalContainer.appendChild(modal);

  const closeModal = document.querySelector('.close-popup');
  closeModal.addEventListener('click', () => {
    modalContainer.classList.add('hidden');
    document.querySelector('.modal-popup').removeChild(document.querySelector('.square-container'));
    /* Effect of modal transparent background
    headerContainer.classList.remove('hidden');
    mainContainer.classList.remove('hidden');
    footeContainer.classList.remove('hidden'); */
    headerContainer.style.filter = 'none';
    mainContainer.style.filter = 'none';
    footeContainer.style.filter = 'none';
  });

  const btnpostComment = document.querySelector(`#commentBtn_${pokemonObject.id}`);
  btnpostComment.addEventListener('click', () => {
    const inputNamevalue = inputName.value;
    const inputCommentvalue = inputComment.value;
    if (inputNamevalue === '' || inputCommentvalue === '') {
      spanMessage.innerText = 'Please fill in all fields';
    } else {
      spanMessage.innerText = '';
      const bodyObj = {
        item_id: pokemonObject.id,
        username: inputNamevalue,
        comment: inputCommentvalue,
      };
      DataAPI.microverseInvolvement.postComment(bodyObj).then(() => {
        // eslint-disable-next-line import/prefer-default-export
        renderComments(pokemonObject.id, commentsColContainer, commentsCounter);
      });
    }
  });
  // eslint-disable-next-line import/prefer-default-export
  renderComments(pokemonObject.id, commentsColContainer, commentsCounter);
};

const defyJSLinter = () => {
};
export {
  createModalPopUp,
  defyJSLinter,
  displayCountComments,
};