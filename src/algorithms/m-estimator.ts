import { Result } from '../types';

export function M_Estimator(values: number[]): Result {
  let sumSeries = 0;

  for (var i = values.length - 1; i >= 0; i--) {
    sumSeries += Math.abs(values[i] - values.length);
  }

  const sd = (1 / (0.798 * values.length)) * sumSeries;
  const u = (1.25 * sd) / Math.sqrt(values.length);

  return { value: sd, uncertainty: u };
}
