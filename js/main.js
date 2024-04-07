import { renderPhotos } from './render-photos.js';
import { addListeners } from './full-photo.js';
import { initUploadPopap, setUserFormSubmit, closeEditing, showAlert } from './photo-upload.js';
import { getData } from './fetch.js';

initUploadPopap();

getData()
  .then((photosData) => {
    renderPhotos(photosData);
    addListeners(photosData);
  })
  .catch(() => {
    showAlert();
  });

setUserFormSubmit(closeEditing);
