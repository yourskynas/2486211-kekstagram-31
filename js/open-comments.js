const STEP = 5;
// eslint-disable-next-line prefer-const
let count = 0;
let arrayComments = [];
const fullPhotoEl = document.querySelector('.big-picture');
const socialComments = fullPhotoEl.querySelector('.social__comments');
const socialCommentEl = fullPhotoEl.querySelector('.social__comment');
const commentShownCount = fullPhotoEl.querySelector('.social__comment-shown-count');
const commentTotalCount = fullPhotoEl.querySelector('.social__comment-total-count');
const btnCommentsLoaderEl = fullPhotoEl.querySelector('.comments-loader');
socialComments.innerHTML = '';

const openNextComments = () => {
  const openedComments = arrayComments.slice(count, count + STEP);
  const openedCommentsLength = openedComments.length + count;

  openedComments.forEach((comment) => {
    const socialCommentCloneItem = socialCommentEl.cloneNode(true);
    const socialPicture = socialCommentCloneItem.querySelector('.social__picture');
    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    socialCommentCloneItem.querySelector('.social__text').textContent = comment.message;
    socialComments.append(socialCommentCloneItem);
  });

  commentShownCount.textContent = openedCommentsLength;
  commentTotalCount.textContent = arrayComments.length;

  if(openedCommentsLength >= arrayComments.length) {
    btnCommentsLoaderEl.classList.add('hidden');
  }

  count += STEP;
};

const openComments = (comments) => {
  arrayComments = comments;
  openNextComments();
  btnCommentsLoaderEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    openNextComments();
  });
};

const closeComments = () => {
  btnCommentsLoaderEl.classList.remove('hidden');
  count = 0;
  socialComments.innerHTML = '';
  btnCommentsLoaderEl.removeEventListener('click', () => {
    openNextComments();
  });
};

export {openComments, closeComments};
