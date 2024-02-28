const DESCRIPTION = [
  'Доброе утро начинается в обед',
  'Наконец-то в отпуск',
  'Насыщенный день',
  'А где-то без меня волнуется море'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAME = ['Никита', 'Настя', 'Елена', 'Гарик', 'Елизавета', 'Владимир'];

const ALLPHOTOS = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * @type {number} idComment переменная, которая будет увеличиваться в функции creatComment()
 */
let idComment = 0;

/**
 * Функция по созданию комментария(объекта)
* @return { {idComment: number, avatar: string, message: string, name: string} } созданный объект
 */
const createComment = () => ({
  idComment: idComment++,
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: MESSAGE[getRandomInteger(0, DESCRIPTION.length - 1)],
  name: NAME[getRandomInteger(0, NAME.length - 1)]
});

/**
 * @type {number} generatePhotoId переменная, которая будет увеличиваться
 * в функции с замыканием creatObject() и присваиваться двум ключам id, url
 */
let generatePhotoId = 0;

/**
 * Функция по созданию фотокарточки(объекта)
* @return { {id: number, url: string, description: string, likes: number} } созданный объект
 */
const createPhoto = () => {
  generatePhotoId++;
  return {
    id: generatePhotoId,
    url: `photos/${ generatePhotoId }.jpg`,
    description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
  };
};

/**
 * Функция по созданию массива объектов
 * @param {number} lengthArray требуемое количество объектов в массиве
 * @return { Array<object> } созданный массив объектов
 */
const createPhotos = (count) => Array.from({length: count}, createPhoto);
createPhotos(ALLPHOTOS, createPhoto);

