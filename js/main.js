import { initUploadPopap, setUserFormSubmit, closeEditing, showAlert } from './photo-upload.js';
import { getData } from './fetch.js';
import { filterPhotos } from './filter.js';

initUploadPopap();

getData()
  .then((photosData) => filterPhotos(photosData))
  .catch(() => showAlert());

setUserFormSubmit(closeEditing);
