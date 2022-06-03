const _ = require('lodash');
const grubbs = require('./../grubbs');
const jStat = require('jStat').jStat;
const ss = require('simple-statistics');

const fFactors = {
  20: [1.59, 0.57],
  19: [1.6, 0.59],
  18: [1.62, 0.62],
  17: [1.64, 0.64],
  16: [1.67, 0.68],
  15: [1.69, 0.71],
  14: [1.72, 0.75],
  13: [1.75, 0.8],
  12: [1.79, 0.86],
  11: [1.83, 0.93],
  10: [1.88, 1.01],
  9: [1.94, 1.11],
  8: [2.01, 1.25],
  7: [2.1, 1.43],
};

function G(i, h, hPrevious) {
  if (i == 0) {
    return 0;
  } else if (i == 1) {
    return h * 0.5;
  } else {
    return (h + hPrevious) * 0.5;
  }
}

module.exports = {
  outliers: function (results, alpha = 0.01) {
    const options = {
      alpha,
    };

    if (results.length < 7) {
      return _.map(results, (result) => {
        result.outlier = false;
        return result;
      });
    }

    let t = grubbs.test(_.map(results, 'result'), options);
    const outliers = _.reduce(
      t,
      (all, iteration) => {
        return all.concat(iteration.outlierIndexes);
      },
      []
    );

    return _.map(results, (result, index) => {
      result.outlier = outliers.indexOf(index) >= 0;
      return result;
    });
  },

  q: function (results, precision = 8) {
    const sortedResults = _.sortBy(results, 'result');
    const values = _.map(sortedResults, 'result');

    let deltas = [];

    for (let i = 0; i < values.length; i++) {
      for (let k = i + 1; k < values.length; k++) {
        deltas.push(
          Math.abs(_.round(parseFloat(values[i] - values[k]), precision))
        );
      }
    }

    const sortedDeltas = _.sortBy(deltas);
    const sortedUniqueDeltas = _.sortedUniq(sortedDeltas);
    const hMultiplier = 2 / (results.length * (results.length - 1));

    const calculations = [];

    for (let i = 0; i < sortedUniqueDeltas.length; i++) {
      const value = sortedUniqueDeltas[i];
      const frequency = _.filter(sortedDeltas, (v) => v === value).length;
      const cumFrequency = _.sumBy(calculations, 'frequency') + frequency;
      const h1 = cumFrequency * hMultiplier;

      calculations.push({
        h1,
        value,
        frequency,
        cumFrequency,
        g: G(i, h1, _.get(calculations, i - 1 + '.h1')),
      });
    }

    // START OF Q Calc.
    const firstParameter = calculations[0].h1 * 0.75 + 0.25;
    const secondParameter = calculations[0].h1 * 0.375 + 0.625;

    const indexHigh = _.findIndex(calculations, (c, i) => {
      return firstParameter < c.g;
    });

    const indexLow = indexHigh - 1;

    const cHigh = calculations[indexHigh];
    const cLow = calculations[indexLow];

    const slope = (cHigh.value - cLow.value) / (cHigh.g - cLow.g);
    const gInverse = cLow.value + (firstParameter - cLow.g) * slope;

    const inverseF = jStat.normal.inv(secondParameter, 0, 1);
    let q = gInverse / (Math.sqrt(2) * inverseF);
    return parseFloat(q.toFixed(4));
  },
  hampel: function (results, q) {
    if (q === 0) {
      return 0;
    }
    const sortedResults = _.sortBy(results, 'result');
    const values = _.map(sortedResults, 'result');

    const findWi = (qi) => {
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

    const calculateRecursive = (values, x) => {
      const iteration = _.map(values, (value) => {
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

      let wiValueWi = _.sumBy(iteration, 'wiValue') / _.sumBy(iteration, 'wi');
      let error = (0.01 * q) / Math.sqrt(values.length);

      if (Math.abs(wiValueWi - x) >= error) {
        return calculateRecursive(values, wiValueWi);
      }
      return wiValueWi;
    };

    let x = ss.median(values);
    return calculateRecursive(values, x);
  },
  checkStability: (data, homogenityData) => {
    let psd = data.reproducibility / 2.8;
    let avgDiff = Math.abs(data.avg - homogenityData.avg);

    let extended = false;
    let result = avgDiff <= psd * 0.3;

    if (result) {
      return { result, extended };
    }

    extended = true;
    let hUncertainty = Math.pow(
      (1.25 * homogenityData.sd) / Math.sqrt(homogenityData.tests),
      2
    );
    let sUncertainty = Math.pow((1.25 * data.sd) / Math.sqrt(data.tests), 2);
    let extensionFactor = Math.sqrt(hUncertainty + sUncertainty) * 2;

    return {
      extended,
      result: avgDiff <= psd * 0.3 + extensionFactor,
    };
  },
};
