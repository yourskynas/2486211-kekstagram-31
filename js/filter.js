import { debounce } from './util.js';
import { renderPhotos } from './render-photos.js';

const imgFiltersEl = document.querySelector('.img-filters');
const btnFilterDefaultEl = imgFiltersEl.querySelector('#filter-default');
const btnFilterRandomEl = imgFiltersEl.querySelector('#filter-random');
const btnFilterDiscussedEl = imgFiltersEl.querySelector('#filter-discussed');
const MAX_PHOTO_COUNT = 10;

let photos = [];
const debounceRender = debounce(renderPhotos);

const changeClass = (evt) => {
  const checkedBtn = document.querySelector('.img-filters__button--active');
  const targetBtn = evt.target;
  checkedBtn.classList.remove('img-filters__button--active');
  targetBtn.classList.add('img-filters__button--active');
};

const comparePhotos = (photoA, photoB) => {
  const commentsPhotoA = photoA.comments.length;
  const commentsPhotoB = photoB.comments.length;
  if (commentsPhotoA === commentsPhotoB) {
    return photoB.likes - photoA.likes;
  }
  return commentsPhotoB - commentsPhotoA;
};

const onbtnFilterDefault = (evt) => {
  changeClass(evt);
  debounceRender(photos);
};

const onBtnFilterRandom = (evt) => {
  changeClass(evt);
  const filteredPhotos = photos.toSorted(() => 0.5 - Math.random()).slice(0, MAX_PHOTO_COUNT);
  debounceRender(filteredPhotos);
};

const onbtnFilterDiscussed = (evt) => {
  changeClass(evt);
  const filteredPhotos = photos.toSorted(comparePhotos);
  debounceRender(filteredPhotos);
};

const filterPhoto = (photoData) => {
  photos = photoData;
  renderPhotos(photoData);
  imgFiltersEl.classList.remove('img-filters--inactive');
  btnFilterDefaultEl.addEventListener('click', onbtnFilterDefault);
  btnFilterRandomEl.addEventListener('click', onBtnFilterRandom);
  btnFilterDiscussedEl.addEventListener('click', onbtnFilterDiscussed);
};

export {filterPhoto};
