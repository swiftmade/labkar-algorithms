import { ReferenceResult, FormulaType } from '../types';
const _ = require('lodash');

export function ReferenceValue(
  x: number,
  formulae: FormulaType[]
): ReferenceResult | null {
  /* First, try to calculate using reference Formula */
  const referenceArray = formulae.filter((formula) => formula.is_reference);
  let formulaInRange = referenceArray.filter((r) => {
    return r.min <= x && r.max >= x;
  });

  /* Second, if reference value is not found, try to calculate using non-reference Formula */
  if (formulaInRange.length === 0) {
    const notReferenceArray = formulae.filter(
      (formula) => !formula.is_reference
    );

    formulaInRange = notReferenceArray.filter((r) => {
      return r.min <= x && r.max >= x;
    });
  }

  // if there is no range value both reference and not reference value are in the range of x then return null
  if (formulaInRange.length === 0) {
    return null;
  }

  // Lastly, calculate the value using the formula
  const chainArray = formulaInRange.map((r) => {
    const formulaResult = eval(r.formula.replace(/X/g, x.toString()));
    return {
      method: r.method,
      value: formulaResult,
    };
  });

  return _.maxBy(chainArray, 'value');
}
