import { onEffectChange } from './effects.js';

const formEl = document.querySelector('.img-upload__form');
const UploadFileEl = formEl.querySelector('.img-upload__input');
const inputHashtagsEl = formEl.querySelector('.text__hashtags');
const inputDescriptionEl = formEl.querySelector('.text__description');
const editingFormEl = formEl.querySelector('.img-upload__overlay');
const btnCloseEditingEl = formEl.querySelector('.img-upload__cancel');
const bodyEl = document.querySelector('body');
const MAX_HASHTAGS = 5;

const pristine = new Pristine(formEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);

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

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    formEl.submit();
  }
};

/**
 * Функция закрытия формы редактирования
 */
const closeEditing = () => {
  editingFormEl.classList.add('hidden');
  bodyEl.classList.remove('modal-open');
  btnCloseEditingEl.removeEventListener('click', onEditingCloseBtnClick);
  formEl.removeEventListener('change', onEffectChange);
  formEl.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('keydown', onInputEscKeydown);
  UploadFileEl.value = '';
  formEl.reset();
};

/**
 * Функция с обработчиками, после загрузки фото открытие редактора фото,
 * добавление обработчика на закрытие редактора (так же с помощью esc)
 */

const initUploadPopap = () => {
  UploadFileEl.addEventListener('change', () => {
    editingFormEl.classList.remove('hidden');
    bodyEl.classList.add('modal-open');
    btnCloseEditingEl.addEventListener('click', onEditingCloseBtnClick);
    formEl.addEventListener('change', onEffectChange);
    formEl.addEventListener('submit', onFormSubmit);
    document.addEventListener('keydown', onInputEscKeydown);
  });
  UploadFileEl.removeAttribute('required');
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

export {initUploadPopap};
