const STEP = 5;
let count = 0;
let allComments = [];
const fullPhotoEl = document.querySelector('.big-picture');
const socialCommentsEls = fullPhotoEl.querySelector('.social__comments');
const socialCommentEl = fullPhotoEl.querySelector('.social__comment');
const commentShownCountEl = fullPhotoEl.querySelector('.social__comment-shown-count');
const commentTotalCountEl = fullPhotoEl.querySelector('.social__comment-total-count');
const btnCommentsLoaderEl = fullPhotoEl.querySelector('.comments-loader');
socialCommentsEls.innerHTML = '';

const showNextComments = () => {
  const openedComments = allComments.slice(count, count + STEP);
  const openedCommentsLength = openedComments.length + count;

  openedComments.forEach((comment) => {
    const socialCommentCloneItem = socialCommentEl.cloneNode(true);
    const socialPicture = socialCommentCloneItem.querySelector('.social__picture');
    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    socialCommentCloneItem.querySelector('.social__text').textContent = comment.message;
    socialCommentsEls.append(socialCommentCloneItem);
  });

  commentShownCountEl.textContent = openedCommentsLength;
  commentTotalCountEl.textContent = allComments.length;

  if(openedCommentsLength >= allComments.length) {
    btnCommentsLoaderEl.classList.add('hidden');
  }

  count += STEP;
};

const showComments = (comments) => {
  allComments = comments;
  showNextComments();
};

btnCommentsLoaderEl.addEventListener('click', (evt) => {
  evt.preventDefault();
  showNextComments();
});

const hideComments = () => {
  btnCommentsLoaderEl.classList.remove('hidden');
  count = 0;
  socialCommentsEls.innerHTML = '';
};

export {showComments, hideComments};
