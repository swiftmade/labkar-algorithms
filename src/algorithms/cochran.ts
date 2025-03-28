import { get } from 'lodash';
import { CochranResult } from '../types';
import { sampleStandardDeviation } from 'simple-statistics';
import cochranCriticalValues from './cochranCriticalValues';

type CochranOptions = {
  alpha: number;
  originalIndexes?: number[];
  outlierIndexes?: number[];
};

export function Cochran(
  values: Array<number[]>,
  options: CochranOptions = { alpha: 0.05 }
): CochranResult | null {
  // Early return if all values are identical
  const allIdentical = values.every(
    (sample) =>
      sample.every((value) => value === sample[0]) && sample[0] === values[0][0]
  );

  if (allIdentical) {
    return {
      outlierIndexes: [],
      hasOutliers: false,
    };
  }

  // Keep track of original indexes of values at the beginning
  // When we return indexes of outliers, this will be useful.
  const originalIndexes = options.originalIndexes
    ? options.originalIndexes
    : values.map((_, i) => i);

  // This is where we store outlier indexes across all iterations.
  // The indexes are relative to the original array.
  const outlierIndexes = options.outlierIndexes ? options.outlierIndexes : [];

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
  const cValue = maxDeviation / sumOfSquareDeviations;

  if (cValue < criticalValue) {
    return {
      outlierIndexes,
      hasOutliers: outlierIndexes.length > 0,
    };
  }

  outlierIndexes.push(originalIndexes[cPairIndex]);
  originalIndexes.splice(cPairIndex, 1);

  return Cochran(
    values.filter((_, i) => i !== cPairIndex),
    {
      alpha: options.alpha,
      originalIndexes,
      outlierIndexes,
    }
  );
}
