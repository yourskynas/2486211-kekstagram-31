const checkLength = (string, length) => {
  if (string.length <= length) {
    return true;
  }

  return false;

};

console.log('Проверка функции checkLength(), результат:', checkLength('проверяемая строка', 20));
console.log('Проверка функции checkLength(), результат:', checkLength('проверяемая строка', 18));
console.log('Проверка функции checkLength(), результат:', checkLength('проверяемая строка', 10));


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

console.log('Проверка функции checkPalindrome(), результат:', checkPalindrome('потоп'));
console.log('Проверка функции checkPalindrome(), результат:', checkPalindrome('Кекс'));


// Дополнительное задание.

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

console.log('Проверка функции findNumber(), результат:', findNumber('21 февраля 2024'));
console.log('Проверка функции findNumber(), результат:', findNumber(-2024));
console.log('Проверка функции findNumber(), результат:', findNumber('хороший год'));
