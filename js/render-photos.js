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
};

export {renderPhotos};
