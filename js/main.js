import { createPhotos, COUNT_OBJECTS } from './mocks/data.js';
import { renderPhotos } from './render-photos.js';

renderPhotos(createPhotos(COUNT_OBJECTS));
