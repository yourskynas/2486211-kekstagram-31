import { createPhotos } from "./data.js";

const photos = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;
const randomPhotos = createPhotos(25);

const randomPhotoSection = document.createDocumentFragment();

randomPhotos.forEach(({url, description, likes, comments}) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = url;
  photoElement.querySelector('img').alt = description;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  randomPhotoSection.append(photoElement);
});

photos.append(randomPhotoSection);
