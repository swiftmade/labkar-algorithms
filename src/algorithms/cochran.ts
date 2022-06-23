import { CochranResult, CochranResultType } from '../types';
import { standardDeviation } from 'simple-statistics';
import cochranCriticalValues  from './cochranCriticalValues';

export function Cochran(values: Array<number[]>): CochranResult | null {
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
  const onePercentCriticalValue = cochranCriticalValues[nValue][0.01][pValue];
  const fivePercentCriticalValue = cochranCriticalValues[nValue][0.05][pValue];

  if (cValue < fivePercentCriticalValue) {
    return CochranResultType.NonOutlier;
  } else if (
    cValue < onePercentCriticalValue &&
    cValue > fivePercentCriticalValue
  ) {
    return CochranResultType.Straggler;
  } else if (cValue > onePercentCriticalValue) {
    return CochranResultType.Outlier;
  }else {
    return null;
  }
}
