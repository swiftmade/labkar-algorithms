import { Result } from '../types';
import { median } from 'simple-statistics';

export function M_Estimator(values: number[]): Result {
  let sumSeries = 0;  
  
  for (var i = values.length - 1; i >= 0; i--) {      
    sumSeries += Math.abs(values[i] - median(values));
  }  

  const mestimatorValue = (1 / ( 0.798 * values.length ) ) * sumSeries;   
  const u = (1.25 * mestimatorValue) / Math.sqrt(values.length);

  return { value: mestimatorValue, uncertainty: u };
}
