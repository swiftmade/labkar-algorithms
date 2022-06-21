import { CochranResult } from '../types';
import { standardDeviation } from 'simple-statistics';

export function Cochran(values: Array<number[]>): CochranResult {
  values = [
    [91, 89.6],
    [89.7, 89.8],
    [88, 87.5],
    [89.2, 88.5],
    [89, 90],
    [88.5, 90.5],
    [88.9, 88.2],
    [90.1, 88.4],
    [86, 85.8],
    [87.6, 84.4],
    [88.2, 87.4],
    [91, 83.1],
    [87.5, 87.8],
    [87.5, 87.6],
    [88.8, 85],
  ];
  const squareDeviations = values
    .map((value) => {
      return standardDeviation(value);
    })
    .map((value) => {
      return value * value;
    });

  const maxDeviation = Math.max.apply(null, squareDeviations);
  const sumOfSquareDeviations = squareDeviations.reduce((a, b) => a + b, 0);

  const cValue = maxDeviation / sumOfSquareDeviations;

  return true;
}
