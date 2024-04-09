import { onEffectChange } from './effects.js';
import { sendData } from './fetch.js';

const formEl = document.querySelector('.img-upload__form');
const UploadFileEl = formEl.querySelector('.img-upload__input');
const previewEl = formEl.querySelector('.img-upload__preview img');
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

const ALERT_SHOW_TIME = 5000;
const MAX_HASHTAGS = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

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
  if (evt.key === 'Escape') {
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
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopap();
  }
};

const onOutsideTarget = (evt) => {
  if (evt.target === successPopapEl || evt.target === errorPopapEl) {
    closePopap();
  }
};

function closePopap () {
  successPopapEl.remove();
  errorPopapEl.remove();
  document.removeEventListener('keydown', onPopapEscKeydown);
  document.removeEventListener('click', onOutsideTarget);
}

const showMessage = (btn, message) => {
  btn.addEventListener('click', onMessageCloseBtn);
  document.addEventListener('keydown', onPopapEscKeydown);
  document.addEventListener('click', onOutsideTarget);
  bodyEl.append(message);
};

const showAlert = () => {
  bodyEl.append(dataErrorEl);

  setTimeout(() => {
    dataErrorEl.remove();
  }, ALERT_SHOW_TIME);
};

const setUserFormSubmit = (onSuccess) => {
  formEl.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target), onSuccess)
        .then(() => showMessage(btnSuccessEl, successPopapEl))
        .catch(() => {
          showMessage(btnErrorEl, errorPopapEl);
          unblockSubmitButton();
        })
        .finally(unblockSubmitButton);
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
    addPhoto(UploadFileEl, previewEl);
    editingFormEl.classList.remove('hidden');
    bodyEl.classList.add('modal-open');
    btnCloseEditingEl.addEventListener('click', onEditingCloseBtnClick);
    formEl.addEventListener('change', onEffectChange);
    document.addEventListener('keydown', onInputEscKeydown);
  });
};

let errorMessage = '';

const error = () => errorMessage;

const isHashtagValidate = (value) => {
  errorMessage = '';

  const hashtagsText = value.toLowerCase().trim();

  if (hashtagsText.length === 0) {
    return true;
  }

  const hashtagsList = hashtagsText.split(' ');

  const validators = [
    {
      check: hashtagsList.some((el) => !/^#[a-zа-яё0-9]{1,19}$/i.test(el)),
      error: 'Хэштег должен начинаться с "#" и не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т. д',
    },
    {
      check: hashtagsList.some((el, i) => hashtagsList.includes(el, i + 1)),
      error: 'Хэштеги не должны повторяться',
    },
    {
      check: hashtagsList.length > MAX_HASHTAGS,
      error: `Максимальное количество хэштегов ${MAX_HASHTAGS}`,
    }
  ];

  return validators.forEach((validator) => {
    const isInvalid = validator.check;
    if (isInvalid) {
      errorMessage = validator.error;
    }
    return !isInvalid;
  });
};

const isDescrtiptionValidate = (value) => value.length <= 140;

pristine.addValidator(
  inputHashtagsEl,
  isHashtagValidate,
  error
);

pristine.addValidator(
  inputDescriptionEl,
  isDescrtiptionValidate,
  'Длина комментария не более 140 символов'
);

export {initUploadPopap, setUserFormSubmit, closeEditing, showAlert};
