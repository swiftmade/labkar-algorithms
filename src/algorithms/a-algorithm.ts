import { median } from 'simple-statistics';
import { AResult } from '../types';

/**
 * @param {number[]} values - an array of numbers
 * @returns An object with the following properties:
 * - robust =  x*
 * - robustDeviation =  s*
 * - highLimit
 * - lowLimit
 */
export function A_Algorithm(values: number[]): AResult {
  const robust = median(values); // robust value = median of the values
  const xiValues = values.map((x) => Math.abs(x - robust)); // subtract the robust value from each value
  const robustDeviation = median(xiValues) * 1.483;
  const limit = robustDeviation * 1.5;
  const highLimit = robust + limit;
  const lowLimit = robust - limit;

  return {
    robust,
    robustDeviation,
    highLimit,
    lowLimit,
  };
}
