import { createPhotos, COUNT_OBJECTS } from './mocks/data.js';
import { renderPhotos } from './render-photos.js';
import { addListeners } from './full-photo.js';

const createdPhotos = createPhotos(COUNT_OBJECTS);
renderPhotos(createdPhotos);
addListeners(createdPhotos);
