import { ReferenceResult } from '../types';

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
  const referenceArray = formulae.find((formula) => formula.is_reference); // find the reference value
  console.log(referenceArray);

  return {
    max: 0,
    formula: '',
  };
}
