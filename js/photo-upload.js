import { onEffectChange } from './effects.js';
import { sendData } from './fetch.js';
import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;
const MAX_HASHTAGS = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const formEl = document.querySelector('.img-upload__form');
const UploadFileEl = formEl.querySelector('.img-upload__input');
const imgEl = formEl.querySelector('.img-upload__preview img');
const inputHashtagsEl = formEl.querySelector('.text__hashtags');
const inputDescriptionEl = formEl.querySelector('.text__description');
const editingFormEl = formEl.querySelector('.img-upload__overlay');
const btnCloseEditingEl = formEl.querySelector('.img-upload__cancel');
const btnSubmitEl = formEl.querySelector('.img-upload__submit');
const bodyEl = document.querySelector('body');
const successPopapEl = document.querySelector('#success').content.querySelector('.success');
const btnSuccessEl = successPopapEl.querySelector('.success__button');
const errorPopapEl = document.querySelector('#error').content.querySelector('.error');
const dataErrorEl = document.querySelector('#data-error').content.querySelector('.data-error');
const btnErrorEl = errorPopapEl.querySelector('.error__button');

const pristine = new Pristine(formEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);

const blockSubmitButton = () => {
  btnSubmitEl.disabled = true;
  btnSubmitEl.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  btnSubmitEl.disabled = false;
  btnSubmitEl.textContent = SubmitButtonText.IDLE;
};

const onEditingCloseBtnClick = () => {
  closeEditing();
};

const onInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === inputHashtagsEl || document.activeElement === inputDescriptionEl) {
      evt.stopPropagation();
    } else {
      closeEditing();
    }
  }
};

const onMessageCloseBtn = (evt) => {
  if (evt.target === btnSuccessEl) {
    successPopapEl.remove();
  }
  errorPopapEl.remove();
};

const onPopapEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopap();
  }
};

// const onOutsideTarget = (evt) => {
//   if (evt.target === successPopapEl || evt.target === errorPopapEl) {
//     closePopap();
//   }
// };

function closePopap () {
  successPopapEl.remove();
  errorPopapEl.remove();
  document.removeEventListener('keydown', onPopapEscKeydown);
  // document.removeEventListener('click', onOutsideTarget);
}

const showMessage = (btn, message) => {
  btn.addEventListener('click', onMessageCloseBtn);
  document.addEventListener('keydown', onPopapEscKeydown);
  // document.addEventListener('click', onOutsideTarget);
  bodyEl.append(message);
};

const showAlert = () => {
  bodyEl.append(dataErrorEl);

  setTimeout(() => {
    dataErrorEl.remove();
  }, ALERT_SHOW_TIME);
};

const showMessageError = () => {
  showMessage(btnErrorEl, errorPopapEl);
};
const showMessageSucces = () => {
  showMessage(btnSuccessEl, successPopapEl);
};

const setUserFormSubmit = (onSuccess) => {
  formEl.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target), onSuccess);
    }
  });
};

/**
 * Функция закрытия формы редактирования
 */
function closeEditing() {
  editingFormEl.classList.add('hidden');
  bodyEl.classList.remove('modal-open');
  formEl.removeEventListener('change', onEffectChange);
  document.removeEventListener('keydown', onInputEscKeydown);
  UploadFileEl.value = '';
  formEl.reset();
}

const addPhoto = (uploader, preview) => {
  const file = uploader.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

/**
 * Функция с обработчиками, после загрузки фото открытие редактора фото,
 * добавление обработчика на закрытие редактора (так же с помощью esc)
 */

const initUploadPopap = () => {
  UploadFileEl.addEventListener('change', () => {
    addPhoto(UploadFileEl, imgEl);
    editingFormEl.classList.remove('hidden');
    bodyEl.classList.add('modal-open');
    btnCloseEditingEl.addEventListener('click', onEditingCloseBtnClick);
    formEl.addEventListener('change', onEffectChange);
    document.addEventListener('keydown', onInputEscKeydown);
  });
};

let clearedHashtagsToValidate = [];

const validateHashtagsRegexp = (value) => {
  const hashtagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtagsToValidate = value.trim().toLowerCase().split(' ');
  clearedHashtagsToValidate = hashtagsToValidate.filter(Boolean);
  return clearedHashtagsToValidate.every((hashtag) => hashtagRegexp.test(hashtag));
};

const validateHashtagsDuplicates = () => {
  if (clearedHashtagsToValidate) {
    const duplicates = clearedHashtagsToValidate.filter((element, index, elements) => elements.indexOf(element) !== index);
    return !duplicates.length;
  }
};

const validateHashtagsCount = () => clearedHashtagsToValidate.length <= MAX_HASHTAGS;

pristine.addValidator(
  inputHashtagsEl,
  validateHashtagsRegexp,
  'Хештеги должны начинаться с #, содержать 1-19 букв без спецсимволов, символов пунктуации, эмодзи и т. д'
);

pristine.addValidator(
  inputHashtagsEl,
  validateHashtagsDuplicates,
  'Хештеги не должны повторяться'
);

pristine.addValidator(
  inputHashtagsEl,
  validateHashtagsCount,
  'Не более 5 хештегов'
);

const isDescrtiptionValidate = (value) => value.length <= 140;

pristine.addValidator(
  inputDescriptionEl,
  isDescrtiptionValidate,
  'Длина комментария не более 140 символов'
);

export {initUploadPopap, setUserFormSubmit, closeEditing, showAlert, showMessageError, unblockSubmitButton, showMessageSucces};
