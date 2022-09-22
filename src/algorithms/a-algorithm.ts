import { median, average, sampleStandardDeviation } from 'simple-statistics';
import { AResult } from '../types';

const MAX_ITERATIONS = 10;
const SIGNIFICANT_FIGURES = 5;

type IterationProps = {
  number: number; // Number of iteration
  values: number[];
  lastResult: AResult;
};

/**
 * @param {number[]} values - an array of numbers
 * @returns An object with the following properties:
 * - robust =  x*
 * - robustDeviation =  s*
 * - highLimit
 * - lowLimit
 */
export function A_Algorithm(values: number[]): AResult {
  const robust = median(values); // robust value = median of the values
  const xiValues = values.map((x) => Math.abs(x - robust)); // subtract the robust value from each value
  const robustDeviation = median(xiValues) * 1.483;
  const limit = robustDeviation * 1.5;
  const highLimit = robust + limit;
  const lowLimit = robust - limit;

  return iterate({
    values,
    number: 1,
    lastResult: {
      robust,
      robustDeviation,
      lowLimit,
      highLimit,
    },
  });
}

function iterate(props: IterationProps): AResult {
  if (props.number === MAX_ITERATIONS) {
    return props.lastResult;
  }

  console.log('new iteration: ' + props.number);

  // Replace values outside of low/high limits
  const values = props.values.map((value) => {
    if (value < props.lastResult.lowLimit) {
      return props.lastResult.lowLimit;
    } else if (value > props.lastResult.highLimit) {
      return props.lastResult.highLimit;
    }
    return value;
  });

  const robust = average(values); // robust value = median of the values
  const robustDeviation = sampleStandardDeviation(values) * 1.134;
  const limit = robustDeviation * 1.5;
  const highLimit = robust + limit;
  const lowLimit = robust - limit;

  const result = {
    robust,
    robustDeviation,
    highLimit,
    lowLimit,
  };

  // If the current and last results are not different up to the desired significant figure
  // Then return the result...
  if (
    robust.toPrecision(SIGNIFICANT_FIGURES) ===
      props.lastResult.robust.toPrecision(SIGNIFICANT_FIGURES) &&
    robustDeviation.toPrecision(SIGNIFICANT_FIGURES) ===
      props.lastResult.robustDeviation.toPrecision(SIGNIFICANT_FIGURES)
  ) {
    return result;
  }

  // Otherwise keep iterating...
  return iterate({
    // TODO: Decide whether to use values or props.values
    // Use the original values
    values: values,
    // Increment the number of iterations
    number: props.number + 1,
    lastResult: result,
  });
}
