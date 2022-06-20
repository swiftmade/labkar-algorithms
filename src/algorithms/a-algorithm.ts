import { median } from 'simple-statistics';
import { AResult } from '../types';

export function A_Algorithm(values: number[]): AResult {  

  const robust = median(values); // robust value = median of the values   

  return {
    robust,
    robustDeviation: 0,
    highLimit: 0,
    lowLimit: 0,
  };
}
