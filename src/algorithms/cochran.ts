import { get } from 'lodash';
import { CochranResult } from '../types';
import { standardDeviation } from 'simple-statistics';
import cochranCriticalValues from './cochranCriticalValues';

export function Cochran(values: Array<number[]>): CochranResult | null {
  /* p -> numune sayısı  */
  const pValue = values.length;

  /* n -> yapılan tekrar,test sayısı */
  const nValue = values[0].length;

  const onePercentCriticalValue = get(
    cochranCriticalValues,
    `${nValue}.1%.${pValue}`
  );

  const fivePercentCriticalValue = get(
    cochranCriticalValues,
    `${nValue}.5%.${pValue}`
  );

  if (!onePercentCriticalValue || !fivePercentCriticalValue) {
    return null;
  }

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

  if (cValue < fivePercentCriticalValue) {
    return CochranResult.NonOutlier;
  }

  if (cValue < onePercentCriticalValue && cValue > fivePercentCriticalValue) {
    return CochranResult.Straggler;
  }

  if (cValue > onePercentCriticalValue) {
    return CochranResult.Outlier;
  }

  return null;
}
