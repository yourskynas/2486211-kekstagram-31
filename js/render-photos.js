// import { renderComment } from './render-full-photo.js';

const renderPhotos = (photosData) => {

  const photosEl = document.querySelector('.pictures');
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photoFragment = document.createDocumentFragment();

  photosData.forEach(({url, description, likes, comments}) => {
    const photoEl = photoTemplate.cloneNode(true);
    const imageEl = photoEl.querySelector('img');
    imageEl.src = url;
    imageEl.alt = description;
    photoEl.querySelector('.picture__likes').textContent = likes;
    photoEl.querySelector('.picture__comments').textContent = comments.length;
    photoFragment.append(photoEl);
  });
  photosEl.append(photoFragment);
};

export {renderPhotos};
