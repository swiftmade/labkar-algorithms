import { ReferenceResult } from '../types';
const _ = require('lodash');

export function referenceValue(
  x: number,
  formulae: Array<{
    is_reference: boolean; // true if this is a reference value
    method: string; // the method used to calculate the reference value
    formula: string; // the formula used to calculate the reference value
    min: number; // the minimum value of the reference value
    max: number; // the maximum value of the reference value
  }>
): ReferenceResult {
  // find is_reference = true array element
  const referenceArray = formulae.filter((formula) => formula.is_reference); // find the reference value
  const notReferenceArray = formulae.filter(
    (formula) => formula.is_reference === false
  ); // find the not reference value

  let rangeValue = referenceArray.filter((r) => {
    return r.min <= x && r.max >= x;
  });

  if (rangeValue.length === 0) {
    rangeValue = notReferenceArray.filter((r) => {
      return r.min <= x && r.max >= x;
    });
  }

  const chainArray = rangeValue.map((r) => {
    const formulaResult = eval(r.formula.replace(/X/g, x.toString()));
    return {
      method: r.method,
      value: formulaResult,
    };
  });

  const result = _.maxBy(chainArray, 'value');

  if (result === undefined) {
    return {
      max: 0,
      formula: '',
    };
  }

  return {
    max: result.value,
    formula: result.method,
  };
}
