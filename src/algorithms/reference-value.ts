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
  formulae = [
    {
      formula: '0.075*X+4.6',
      method: 'TS EN 13132',
      min: 60.1,
      max: 500.0,
      is_reference: true,
    },
    {
      formula: '0.016*X+3.70 ',
      method: 'TS EN ISO 13032',
      min: 8.0,
      max: 50.0,
      is_reference: true,
    },
    {
      formula: '0.6*X',
      method: 'ASTM D381',
      min: 1.0,
      max: 30.0,
      is_reference: false,
    },
  ];

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

  

  return {
    max: 0,
    formula: '',
  };
}
