import { round, sum } from 'lodash';
import { average, sampleStandardDeviation } from 'simple-statistics';
import fFactors from './fFactors';

export type HomogenityTestResult = {
  /**
   * Label of the sample used in the test
   */
  label: string;

  /**
   * The result(s) of the test
   */
  values: number[];
};

const R_DIVIDER = 2.8;

/**
 *
 * @param results An array of test results
 * @param R reproducibility constant
 */
export function homogenity(results: HomogenityTestResult[], r: number) {
  if (results.length < 1) {
    throw new Error('At least one test result is required');
  }

  if (results[0].values.length !== 2) {
    throw new Error(
      'We currently only support two values per test. You provided ' +
        results[0].values.length +
        ' values.'
    );
  }

  const numTests = results.length;
  const numRepetitions = results[0].values.length;

  const enrichedResults = results.map((result) => ({
    ...result,
    avg: average(result.values),
    deltaPow: Math.pow(Math.abs(result.values[0] - result.values[1]), 2),
  }));

  const xAvg = average(enrichedResults.map((r) => r.avg));

  const sd = round(
    sampleStandardDeviation(enrichedResults.map((r) => r.avg)),
    3
  );

  const sw = Math.sqrt(
    sum(enrichedResults.map((r) => r.deltaPow)) / (numTests * numRepetitions)
  );

  const ss2 = Math.pow(sd, 2) - Math.pow(sw, 2) / 2;

  const ss = ss2 < 0 ? 0 : Math.sqrt(ss2);

  const fValues = fFactors[numTests as keyof typeof fFactors];

  if (!fValues) {
    throw new Error(
      'No F values found for ' + numTests + ' tests. Supported range: 7 to 20.'
    );
  }

  const sigmaAllow2 = Math.pow((r / R_DIVIDER) * 0.3, 2);
  const c = fValues[0] * sigmaAllow2 + fValues[1] * Math.pow(sw, 2);

  const cSqrt = Math.sqrt(c);
  const homogenity = ss < cSqrt;

  return {
    xAvg,
    sd,
    sw,
    ss2,
    ss,
    fValues,
    sigmaAllow2,
    c,
    cSqrt,
    homogenity,
  };
}
