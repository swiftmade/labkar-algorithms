import { median } from 'simple-statistics';
import { AResult } from '../types';

export function A_Algorithm(values: number[]): AResult {  

  const robust = median(values); // robust value = median of the values  
  const xiValues = values.map(x => x - robust); // subtract the robust value from each value   
  const robustDeviation =  median(xiValues);


  return {
    robust,
    robustDeviation,
    highLimit: 0,
    lowLimit: 0,
  };
}
