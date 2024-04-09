const formEl = document.querySelector('.img-upload__form');
const btnScaleValueEl = formEl.querySelector('.scale__control--value');
const btnScaleSmallerEl = formEl.querySelector('.scale__control--smaller');
const btnScaleBiggerEl = formEl.querySelector('.scale__control--bigger');
const effectSliderEl = formEl.querySelector('.effect-level__slider');
const effectValueEl = formEl.querySelector('.effect-level__value');
const imgUploadPreviewEl = formEl.querySelector('.img-upload__preview');
const imageEl = formEl.querySelector('img');
const effectLevelEl = formEl.querySelector('.img-upload__effect-level');
const effectsList = formEl.querySelectorAll('.effects__radio');

const Scale = {
  MIN: 25,
  MAX: 100
};

effectLevelEl.classList.add('hidden');

let numberScaleValue = parseInt(btnScaleValueEl.value.replace('%'), 10);
const onbtnScaleSmaller = () => {
  if (numberScaleValue > Scale.MIN) {
    numberScaleValue -= Scale.MIN;
  }
  btnScaleValueEl.value = `${ numberScaleValue }%`;
  imageEl.style.transform = `scale(${ numberScaleValue / 100 })`;
};

const onbtnScaleBigger = () => {
  if (numberScaleValue < Scale.MAX) {
    numberScaleValue += Scale.MIN;
  }
  btnScaleValueEl.value = `${ numberScaleValue }%`;
  imageEl.style.transform = `scale(${ numberScaleValue / 100 })`;
};

btnScaleSmallerEl.addEventListener('click', onbtnScaleSmaller);
btnScaleBiggerEl.addEventListener('click', onbtnScaleBigger);

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
  },
  none: {
    filter: 'none',
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
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const addFilter = (filter, value) => {
  if (filter === 'grayscale') {
    imgUploadPreviewEl.style.filter = `${filter}(${value})`;
  } else if (filter === 'sepia') {
    imgUploadPreviewEl.style.filter = `${filter}(${value})`;
  } else if (filter === 'invert') {
    imgUploadPreviewEl.style.filter = `${filter}(${value}%)`;
  } else if (filter === 'blur') {
    imgUploadPreviewEl.style.filter = `${filter}(${value}px)`;
  } else if (filter === 'brightness') {
    imgUploadPreviewEl.style.filter = `${filter}(${value})`;
  }
};

effectSliderEl.noUiSlider.on('update', () => {
  effectValueEl.value = effectSliderEl.noUiSlider.get();
  const effectValue = effectValueEl.value;
  effectsList.forEach((item) => {
    if (item.checked) {
      const effectOption = effectOptions[item.value];
      const filter = effectOption.filter;
      if (item.value === 'none') {
        effectLevelEl.classList.add('hidden');
        imgUploadPreviewEl.removeAttribute('style');
      } else {
        effectLevelEl.classList.remove('hidden');
        addFilter(filter, effectValue);
      }
    }
  });
});

const onEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    effectSliderEl.noUiSlider.updateOptions(effectOptions[evt.target.value]);
  }
};

export {onEffectChange, effectsList};
