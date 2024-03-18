const prewiewListeners = () => {

  const fullPhotoEl = document.querySelector('.big-picture');
  const fullPhotoCancelEl = document.querySelector('.big-picture__cancel');
  const commentTotalShownFullEl = fullPhotoEl.querySelector('.social__comment-shown-count');
  const commentTotalCountFullEl = fullPhotoEl.querySelector('.social__comment-total-count');
  const commentCountFullEl = fullPhotoEl.querySelector('.social__comment-count');
  const commentsLoaderFullEl = fullPhotoEl.querySelector('.comments-loader');
  const previewsEl = document.querySelectorAll('.picture');
  const bodyEl = document.querySelector('body');
  /**
   * Обработчик, переданный по ссылке (для своевременного добавления и удаления со страницы)
   * @param {*} evt
   */
  const onFullPhotoEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      // eslint-disable-next-line no-use-before-define
      closeFullPhoto();
    }
  };

  for (const preview of previewsEl) {
    /**
     * Функция, отрисовывающая окно с полноразмерным изображением
     */
    const openFullPhoto = () => {
      const previewImgEl = preview.querySelector('img');
      const previewLikesEl = preview.querySelector('.picture__likes');
      const previewCommentsEl = preview.querySelector('.picture__comments');

      fullPhotoEl.classList.remove('hidden');
      bodyEl.classList.add('modal-open');
      // временно прячем блоки счётчика комментариев и загрузки новых комментариев
      commentCountFullEl.classList.add('hidden');
      commentsLoaderFullEl.classList.add('hidden');

      fullPhotoEl.querySelector('img').src = previewImgEl.src;
      fullPhotoEl.querySelector('.likes-count').textContent = previewLikesEl.textContent;
      fullPhotoEl.querySelector('.social__caption').textContent = previewImgEl.alt;
      commentTotalCountFullEl.textContent = previewCommentsEl.textContent;

      const numberComment = parseInt(previewCommentsEl.textContent, 10);
      if (numberComment > 5) {
        commentTotalShownFullEl.textContent = 5;
      } else {
        commentTotalShownFullEl.textContent = numberComment;
      }
    };

    preview.addEventListener('click', () => {
      openFullPhoto();

      document.addEventListener('keydown', onFullPhotoEscKeydown);
    });

  }
  /**
   * Функция, закрывающая окно с полноэкранным изображением
   */
  const closeFullPhoto = () => {
    fullPhotoEl.classList.add('hidden');
    bodyEl.classList.remove('modal-open');
    document.removeEventListener('keydown', onFullPhotoEscKeydown);
  };

  fullPhotoCancelEl.addEventListener('click', () => {
    closeFullPhoto();
  });

};

/**
 * Блок отрисовки комментариев
 */
const renderComments = (avatar, message, name) => {
  const socialComments = document.querySelector('.social__comments');
  const socialCommentEl = socialComments.querySelector('.social__comment');
  const socialCommentFragment = document.createDocumentFragment();
  socialComments.innerHTML = '';
  const socialCommentCloneItem = socialCommentEl.cloneNode(true);
  const socialPicture = socialCommentCloneItem.querySelector('.social__picture');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialCommentCloneItem.querySelector('.social__text').textContent = message;
  socialCommentFragment.append(socialCommentCloneItem);
  socialComments.append(socialCommentFragment);
};

export {prewiewListeners, renderComments};
