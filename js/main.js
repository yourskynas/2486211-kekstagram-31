import { initUploadPopap, setUserFormSubmit, closeEditing, showAlert } from './photo-upload.js';
import { getData } from './fetch.js';
import { filterPhoto } from './filter.js';

initUploadPopap();

getData()
  .then((photosData) => filterPhoto(photosData))
  .catch(() => showAlert());

setUserFormSubmit(closeEditing);
