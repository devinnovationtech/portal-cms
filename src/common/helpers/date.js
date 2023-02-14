import {
  addDays, getMinutes, differenceInDays, differenceInMinutes, format, isToday as isTheGivenDateToday, isValid, getHours,
} from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Date format according to the given pattern
 *
 * @param {string, date} date - raw date to format
 * @param {string} pattern - pattern use to format the date
 * Check out {@link https://date-fns.org/v2.28.0/docs/format | date-fns official docs}
 * for more information
 * @returns {string}
 */
export const formatDate = (date, pattern = 'dd/MM/yyyy') => {
  const rawDate = new Date(date);

  if (isValid(rawDate)) {
    return format(rawDate, pattern, { locale: id });
  }

  return date;
};

/**
 * Is the given date today
 *
 * @param {Date} date - date to check
 * Check out {@link https://date-fns.org/v2.28.0/docs/isToday | date-fns official docs}
 * for more information
 * @returns {boolean}
 */
export const isToday = (date) => isTheGivenDateToday(new Date(date));

/**
 * Get the number of full day periods between two dates.
 *
 * @param {Date} laterDate - the later date
 * @param {Date} earlierDate - the earlier date
 * @returns {Number}
 */
export function daysDifference(laterDate, earlierDate) {
  return differenceInDays(new Date(laterDate), new Date(earlierDate));
}

/**
 * Get the signed number of full (rounded towards 0) minutes between the given dates.
 *
 * @param {Date} laterDate - the later date
 * @param {Date} earlierDate - the earlier date
 * @returns {Number}
 */
export function minutesDifference(laterDate, earlierDate) {
  return differenceInMinutes(new Date(laterDate), new Date(earlierDate));
}

/**
 * Add the specified number of days to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added.
 * @returns {Date} - the new date with the days added
 */
export const addDay = (date, amount) => addDays(new Date(date), amount);

/**
 * Get the hours of the given date.
 *
 * @param {Date} date - the given date
 * @returns {Number} - the hours
 */
export const getHour = (date) => getHours(new Date(date));

/**
 * Get the minutes of the given date.
 *
 * @param {Date} date - the given date
 * @returns {Number} - the minutes
 */
export const getMinute = (date) => getMinutes(new Date(date));
