const formEl = document.querySelector('.img-upload__form');
const UploadFileEl = formEl.querySelector('.img-upload__input');
const inputHashtagsEl = formEl.querySelector('.text__hashtags');
const inputDescriptionEl = formEl.querySelector('.text__description');
const editingFormEl = formEl.querySelector('.img-upload__overlay');
const btnCloseEditingEl = formEl.querySelector('.img-upload__cancel');
const bodyEl = document.querySelector('body');

/**
 * Функция закрытия формы редактирования
 */
const onEditingFormBtnClick = () => {
  editingFormEl.classList.add('hidden');
  bodyEl.classList.remove('modal-open');
  document.removeEventListener('keydown', onInputEscKeydown);
};

const onInputEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onEditingFormBtnClick();
  }
};

/**
 * Функция с обработчиками, после загрузки фото открытие редактора фото,
 * добавление обработчика на закрытие редактора (так же с помощью esc)
 */

const initUploadModal = () => {
  UploadFileEl.addEventListener('change', () => {
    editingFormEl.classList.remove('hidden');
    bodyEl.classList.add('modal-open');
    btnCloseEditingEl.addEventListener('click', onEditingFormBtnClick);
    document.addEventListener('keydown', onInputEscKeydown);
  });
};

inputHashtagsEl.addEventListener('focus', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

inputDescriptionEl.addEventListener('focus', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

const pristine = new Pristine(formEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function validateDescrtiption (value) {
  return value.length <= 140;
}

pristine.addValidator(
  inputDescriptionEl,
  validateDescrtiption,
  'Длина комментария не более 140 символов'
);

formEl.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('форма валидна');
  } else {
    console.log('форма не валидна');
  }
});

const btnScaleValueEl = formEl.querySelector('.scale__control--value');
const btnScaleSmallerEl = formEl.querySelector('.scale__control--smaller');
const btnScaleBiggerEl = formEl.querySelector('.scale__control--bigger');
const imgUploadPreviewEl = formEl.querySelector('img');

let numberScaleValue = parseInt(btnScaleValueEl.value.replace('%'), 10);
const onbtnScaleSmaller = () => {
  if (numberScaleValue > 25) {
    numberScaleValue -= 25;
  }
  btnScaleValueEl.value = `${ numberScaleValue }%`;
  imgUploadPreviewEl.style.transform = `scale(${ numberScaleValue / 100 })`;
};

const onbtnScaleBigger = () => {
  if (numberScaleValue < 100) {
    numberScaleValue += 25;
  }
  btnScaleValueEl.value = `${ numberScaleValue }%`;
  imgUploadPreviewEl.style.transform = `scale(${ numberScaleValue / 100 })`;
};

btnScaleSmallerEl.addEventListener('click', onbtnScaleSmaller);
btnScaleBiggerEl.addEventListener('click', onbtnScaleBigger);

const effectSliderEl = document.querySelector('.effect-level__slider');
const effectValueEl = document.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const effectNone = document.querySelector('.img-upload__effect-level');
effectNone.classList.add('hidden');
const effectOptions = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'grayscale',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'sepia',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    filter: 'invert',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'blur',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'brightness',
  }
};

noUiSlider.create(effectSliderEl, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});


effectSliderEl.noUiSlider.on('update', () => {
  effectValueEl.value = effectSliderEl.noUiSlider.get();
});

const addFilter = (filter) => {
  if (filter === 'grayscale') {
    imgUploadPreview.style.filter = `${filter}(1)`;
  } else if (filter === 'sepia') {
    imgUploadPreview.style.filter = `${filter}(1)`;
  } else if (filter === 'invert') {
    imgUploadPreview.style.filter = `${filter}(100%)`;
  } else if (filter === 'blur') {
    imgUploadPreview.style.filter = `${filter}(3px)`;
  } else if (filter === 'brightness') {
    imgUploadPreview.style.filter = `${filter}(3)`;
  }
};

const onEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const effectOption = effectOptions[evt.target.value];
    const filter = effectOption.filter;
    addFilter(filter);
    effectNone.classList.remove('hidden');
    if (evt.target.value === 'none') {
      effectNone.classList.add('hidden');
    } else {
      effectSliderEl.noUiSlider.updateOptions(effectOptions[evt.target.value]);
    }
  }
};
formEl.addEventListener('change', onEffectChange);

export {initUploadModal};
