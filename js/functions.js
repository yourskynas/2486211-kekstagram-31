/* eslint-disable no-unused-vars */

/**
 * Функция для проверки длины строки
 * @param {string} string - строка, которую нужно проверить
 * @param {number} length - максимальная длина
 * @returns {boolean} - true, если строка меньше или равна указанной длине, false, если строка длиннее
 */
function checkLength(string, length) {
  return string.length <= length;
}

const checkPalindrome = (string) => {
  const newString = string.replaceAll(' ', '').toUpperCase();
  let newString2 = '';

  for (let i = newString.length - 1; i >= 0; i--) {
    newString2 += newString[i];
  }

  if (newString === newString2) {
    return true;
  }

  return false;
};


const findNumber = (string) => {
  const typeString = string.toString();
  let newString = '';
  let numbers = '';

  for (let i = 0; i <= typeString.length; i++) {
    newString += parseInt(typeString[i], 10);
  }

  for (let j = 0; j <= newString.length; j++) {
    if (!isNaN(newString[j])) {
      numbers += newString[j];
    }
  }

  if (numbers === '') {
    return NaN;
  }

  return numbers;

};
