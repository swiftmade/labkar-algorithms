import { CochranResult } from '../types';
import { standardDeviation } from 'simple-statistics';
import criticalValueTable from './../grubbs/criticalValueTable';

export function Cochran(values: Array<number[]>): CochranResult {
  /* p -> numune sayısı  */
  const pValue = values.length;

  /* n -> yapılan tekrar,test sayısı */
  const nValue = values[0].length;

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

  // Look critical value table
  const onePercentCriticalValue = criticalValueTable[0.01][pValue];
  const fivePercentCriticalValue = criticalValueTable[0.05][pValue];

  let result: 'outlier' | 'straggler' | 'not-outlier' | null = null;

  if (cValue < fivePercentCriticalValue) {
    result = 'not-outlier';
  } else if (
    cValue < onePercentCriticalValue &&
    cValue > fivePercentCriticalValue
  ) {
    result = 'straggler';
  } else if (cValue > onePercentCriticalValue) {
    result = 'outlier';
  }

  return result;
}
