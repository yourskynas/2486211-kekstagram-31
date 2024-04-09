import { showComments, hideComments } from './open-comments.js';
import { isEscapeKey } from './util.js';

const bodyEl = document.querySelector('body');
const fullPhotoEl = document.querySelector('.big-picture');
const btnCloseEl = document.querySelector('.big-picture__cancel');

const openFullPhoto = ({url, description, likes, comments}) => {
  bodyEl.classList.add('modal-open');
  fullPhotoEl.classList.remove('hidden');
  fullPhotoEl.querySelector('img').src = url;
  fullPhotoEl.querySelector('.likes-count').textContent = likes;
  fullPhotoEl.querySelector('.social__caption').textContent = description;
  showComments(comments);
};

const onFullPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

function closeFullPhoto() {
  fullPhotoEl.classList.add('hidden');
  bodyEl.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
  hideComments();
}

btnCloseEl.addEventListener('click', () => {
  closeFullPhoto();
});

const addThumbnailClickHandler = (thumbnail, photo) => {
  thumbnail.addEventListener('click', () => {
    openFullPhoto(photo);
    document.addEventListener('keydown', onFullPhotoEscKeydown);
  });
};

const addListeners = (photosData) => {
  const thumbnailEls = document.querySelectorAll('.picture');

  for (let i = 0; i < thumbnailEls.length; i++) {
    addThumbnailClickHandler(thumbnailEls[i], photosData[i]);
  }
};

export {addListeners};
