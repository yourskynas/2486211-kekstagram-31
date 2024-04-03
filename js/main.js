import { createPhotos, COUNT_OBJECTS } from './mocks/data.js';
import { renderPhotos } from './render-photos.js';
import { addListeners } from './full-photo.js';
import { initUploadPopap } from './photo-upload.js';

const createdPhotos = createPhotos(COUNT_OBJECTS);
renderPhotos(createdPhotos);
addListeners(createdPhotos);
initUploadPopap();
