import { get } from 'lodash';
import { CochranResult } from '../types';
import { sampleStandardDeviation } from 'simple-statistics';
import cochranCriticalValues from './cochranCriticalValues';

export function Cochran(
  values: Array<number[]>,
  options: { alpha: number } = { alpha: 0.05 }
): CochranResult | null {
  /* p -> numune sayısı  */
  const pValue = values.length;

  /* n -> yapılan tekrar,test sayısı */
  const nValue = values[0].length;

  const criticalValueKey =
    options.alpha === 0.05
      ? `${nValue}.5%.${pValue}`
      : `${nValue}.1%.${pValue}`;

  const criticalValue = get(cochranCriticalValues, criticalValueKey);

  if (!criticalValue) {
    return null;
  }

  const squareDeviations = values
    .map((pair: number[]) => sampleStandardDeviation(pair))
    .map((sd: number) => sd * sd);

  const maxDeviation = Math.max.apply(null, squareDeviations);
  const sumOfSquareDeviations = squareDeviations.reduce((a, b) => a + b, 0);

  // These are the values used to calculate max deviation
  const cPairIndex = squareDeviations.indexOf(maxDeviation);
  const cPair = values[squareDeviations.indexOf(maxDeviation)];

  const cValue = maxDeviation / sumOfSquareDeviations;

  if (cValue < criticalValue) {
    return {
      outlier: false,
      cValue,
      cPair,
      cPairIndex: cPairIndex,
      maxDeviation,
    };
  }

  return {
    outlier: true,
    cValue,
    cPair,
    cPairIndex,
    maxDeviation,
  };
}
