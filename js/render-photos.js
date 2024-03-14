const renderPhotos = (photosData) => {

  const photosElement = document.querySelector('.pictures');
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const randomPhotoSection = document.createDocumentFragment();

  photosData.forEach(({url, description, likes, comments}) => {
    const photoElement = photoTemplate.cloneNode(true);
    const imageElement = photoElement.querySelector('img');
    imageElement.src = url;
    imageElement.alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    randomPhotoSection.append(photoElement);
  });

  photosElement.append(randomPhotoSection);

  //перенести в другой модуль
  const fullPhotoElement = document.querySelector('.big-picture');
  const minipictures = photosElement.querySelectorAll('.picture');
  const fullImgEl = fullPhotoElement.querySelector('img');
  const likesFull = fullPhotoElement.querySelector('.likes-count');
  const numCommentsFull = fullPhotoElement.querySelector('.social__comment-total-count');

  for (const minipicture of minipictures) {
    const minipictureSrc = minipicture.querySelector('img');
    const minipictureLikes = minipicture.querySelector('.picture__likes');
    const minipictureNumComments = minipicture.querySelector('.picture__comments');

    minipicture.addEventListener('click', () => {
      fullPhotoElement.classList.remove('hidden');
      fullImgEl.src = minipictureSrc.src;
      likesFull.textContent = minipictureLikes.textContent;
      numCommentsFull.textContent = minipictureNumComments.textContent;
    });
  }

};

export {renderPhotos};
