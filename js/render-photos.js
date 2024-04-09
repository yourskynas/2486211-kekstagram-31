import { addListeners } from './full-photo.js';

const renderPhotos = (photosData) => {

  const photosEl = document.querySelector('.pictures');
  const photoTemplateEl = document.querySelector('#picture').content.querySelector('.picture');
  const photoFragmentEl = document.createDocumentFragment();
  document.querySelectorAll('a.picture').forEach((photo) => photo.remove());

  photosData
    .forEach(({url, description, likes, comments}) => {
      const photoEl = photoTemplateEl.cloneNode(true);
      const imageEl = photoEl.querySelector('img');
      imageEl.src = url;
      imageEl.alt = description;
      photoEl.querySelector('.picture__likes').textContent = likes;
      photoEl.querySelector('.picture__comments').textContent = comments.length;
      photoFragmentEl.append(photoEl);
    });
  photosEl.append(photoFragmentEl);
  addListeners(photosData);
};

export {renderPhotos};
