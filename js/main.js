let idObject = 1;
let numPhoto = 1;
let idComment = 1;

const description = [
  'Доброе утро начинается в обед',
  'Наконец-то в отпуск',
  'Насыщенный день',
  'А где-то без меня волнуется море'
];

const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const name = ['Никита', 'Настя', 'Елена', 'Гарик', 'Елизавета', 'Владимир'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Функция по созданию объекта
* @return { {id: number, url: string, description: string, likes: number, comments: {id: number, avatar: string, message: string, name: string}}} - объект
 */

const creatObject = () => ({

  const randomDescription = getRandomInteger(0, description.length - 1);
  const likes = getRandomInteger(15, 200);
  const getRandomAvatar = getRandomInteger(1, 6);
  const randomMessage = getRandomInteger(0, message.length - 1);
  const randomName = getRandomInteger(0, name.length - 1);

  return {
    id: idObject++,
    url: `photos/${ numPhoto++ }.jpg`,
    description: description[randomDescription],
    likes: likes,
    comments:
      {
        idComment: idComment++,
        avatar: `img/avatar-${ getRandomAvatar }.svg`,
        message: message[randomMessage],
        name: name[randomName]
      }
  }
});

const listOfObject = Array.from({length: 25}, creatObject);
console.log(creatObject());

