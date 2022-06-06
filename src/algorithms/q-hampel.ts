const { jStat } = require('jstat');
import { median } from 'simple-statistics';
import { get, sortBy, sumBy, round, sortedUniq, findIndex } from 'lodash';

import { Result } from '../types';

interface Q_Options {
  precision: number;
}

interface Q_Calculation {
  h1: number;
  value: number;
  frequency: number;
  cumFrequency: number;
  g: number;
}

export function QHampel(
  results: number[],
  options: Q_Options = { precision: 8 }
): Result {
  const { precision } = options;

  const values: number[] = ([] as number[]).concat(results).sort();

  let deltas = [];

  for (let i = 0; i < values.length; i++) {
    for (let k = i + 1; k < values.length; k++) {
      deltas.push(Math.abs(round(values[i] - values[k], precision)));
    }
  }

  const sortedDeltas = sortBy(deltas);
  const sortedUniqueDeltas = sortedUniq(sortedDeltas);
  const hMultiplier = 2 / (results.length * (results.length - 1));

  const calculations: Q_Calculation[] = [];

  for (let i = 0; i < sortedUniqueDeltas.length; i++) {
    const value = sortedUniqueDeltas[i];
    const frequency = sortedDeltas.filter((v: number) => v === value).length;
    const cumFrequency = sumBy(calculations, 'frequency') + frequency;
    const h1 = cumFrequency * hMultiplier;

    calculations.push({
      h1,
      value,
      frequency,
      cumFrequency,
      g: calculateG(i, h1, get(calculations, i - 1 + '.h1')),
    });
  }

  // START OF Q Calc.
  const firstParameter = calculations[0].h1 * 0.75 + 0.25;
  const secondParameter = calculations[0].h1 * 0.375 + 0.625;

  const indexHigh = findIndex(calculations, (c: Q_Calculation) => {
    return firstParameter < c.g;
  });

  const indexLow = indexHigh - 1;

  const cHigh = calculations[indexHigh];
  const cLow = calculations[indexLow];

  const slope = (cHigh.value - cLow.value) / (cHigh.g - cLow.g);
  const gInverse = cLow.value + (firstParameter - cLow.g) * slope;

  const inverseF = jStat.normal.inv(secondParameter, 0, 1);
  let q = gInverse / (Math.sqrt(2) * inverseF);

  const value = parseFloat(q.toFixed(4));

  return {
    value,
    hampel: hampel(results, value),
  };
}

function calculateG(i: number, h: number, hPrevious: number) {
  if (i == 0) {
    return 0;
  } else if (i == 1) {
    return h * 0.5;
  } else {
    return (h + hPrevious) * 0.5;
  }
}

function hampel(results: number[], q: number) {
  if (q === 0) {
    return { value: 0 };
  }

  const values: number[] = ([] as number[]).concat(results).sort();

  const findWi = (qi: number) => {
    qi = Math.abs(qi);
    if (qi > 4.5) {
      return 0;
    } else if (qi > 3) {
      return (4.5 - qi) / qi;
    } else if (qi > 1.5) {
      return 1.5 / qi;
    }
    return 1;
  };

  const calculateRecursive = (values: number[], x: number): any => {
    const iteration = values.map((value) => {
      const qi = Math.abs((value - x) / q);

      const wi = findWi(qi);
      const wiValue = wi * value;

      return {
        value,
        qi,
        wi,
        wiValue,
      };
    });

    let wiValueWi = sumBy(iteration, 'wiValue') / sumBy(iteration, 'wi');
    let error = (0.01 * q) / Math.sqrt(values.length);

    if (Math.abs(wiValueWi - x) >= error) {
      return calculateRecursive(values, wiValueWi);
    }
    return wiValueWi;
  };

  let x = median(values);

  return calculateRecursive(values, x);
}
