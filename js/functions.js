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

/**
 * Функция, принимающая время начала и конца рабочего дня,
 * время старта и продолжительность встречи в минутах
 * и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит
 *
 * @param {string} startWork время начала рабочего дня
 * @param {string} endWork время конца рабочего дня
 * @param {string} startMeeting время начала встречи
 * @param {number} lengthMeeting продолжительность встречи в минутах
 * @return {boolean} возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит
 */

const isMeetingToday = (startWork, endWork, startMeeting, lengthMeeting) => {
  const startWorktime = startWork.split(':');
  const endWorktime = endWork.split(':');
  const startMeetingTime = startMeeting.split(':');

  /**
   * Функция, которая конвертирует часы в минуты
   * @param { Array<string> } time массив строк
   * @return {number} время в минутах
   */
  const getInMinutes = (time) => {
    const result = +time[0] * 60 + +time[1];
    return result;
  };

  const startWorkInMinutes = getInMinutes(startWorktime);
  const endWorkInMinutes = getInMinutes(endWorktime);
  const endMeetingInMinutes = getInMinutes(startMeetingTime) + lengthMeeting;

  return startWorkInMinutes <= endMeetingInMinutes && endMeetingInMinutes <= endWorkInMinutes;
}

isMeetingToday('08:00', '17:30', '14:00', 90); // true
isMeetingToday('8:0', '10:0', '8:0', 120);     // true
isMeetingToday('08:00', '14:30', '14:00', 90); // false
isMeetingToday('14:00', '17:30', '08:0', 90);  // false
isMeetingToday('8:00', '17:30', '08:00', 900); // false
