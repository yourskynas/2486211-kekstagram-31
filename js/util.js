const RERENDER_DELAY = 500;

function debounce (callback, timeoutDelay = RERENDER_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export {debounce, isEscapeKey};
