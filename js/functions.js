/* eslint-disable no-unused-vars */
const checkLength = (string, length) => {
  if (string.length <= length) {
    return true;
  }

  return false;

};

const checkPalindrome = (string) => {
  const stringReplace = string.replaceAll(' ', '');
  const newString = stringReplace.toUpperCase();
  let newString2 = '';

  for(let i = newString.length - 1; i >= 0; i--) {
    newString2 += newString[i];
  }

  if(newString === newString2) {
    return true;
  }

  return false;
};

const findNumber = (string) => {
  const typeString = string.toString();
  let newString = '';
  let numbers = '';

  for(let i = 0; i <= typeString.length; i++) {
    newString += parseInt(typeString[i], 10);
  }

  for(let j = 0; j <= newString.length; j++) {
    if (!isNaN(newString[j])) {
      numbers += newString[j];
    }
  }

  if(numbers === '') {
    return NaN;
  }

  return numbers;

};
