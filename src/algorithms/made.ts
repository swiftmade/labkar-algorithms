import { Result } from '../types';
import { median } from 'simple-statistics';

export function MADe(values: number[]): Result {
  const medianValue = median(values);
  const medianArr: number[] = [];
  values.forEach((value) => {
    value = Math.abs(value - medianValue);
    medianArr.push(value);
  });
  var result = 1.483 * median(medianArr);
  return { value: result };
}
