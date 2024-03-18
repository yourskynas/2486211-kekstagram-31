import { createPhotos, COUNT_OBJECTS } from './mocks/data.js';
import { renderPhotos } from './render-photos.js';
import { prewiewListeners } from './render-full-photo.js';

const createdPhotos = createPhotos(COUNT_OBJECTS);
renderPhotos(createdPhotos);
// prewiewListeners(createdPhotos);
prewiewListeners();
