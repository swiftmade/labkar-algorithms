import { average, standardDeviation } from 'simple-statistics';
import criticalValueTable from './criticalValueTable';

export type GrubbsResult = {
  average: number;
  criticalValue: number;
  dataSet: number[];
  gPass: boolean[];
  gSet: number[];
  outlierIndexes: number[];
  outliers: number[];
  stdev: number[];
};

export function grubbs(
  originDataSet: number[],
  originOptions: { alpha: number }
): GrubbsResult[] {
  if (typeof originDataSet === 'undefined') {
    throw new Error('dataSet MUST be passed');
  }
  if (originDataSet.filter(isValidData).length > 100) {
    throw new Error('dataSet.length MUST less than 100');
  }
  if (originDataSet.filter(isValidData).length <= 2) {
    throw new Error('dataSet.length MUST greater than 2');
  }
  // defaultOptions
  var options = {
    alpha: 0.01,
    recursion: true,
  };
  // Merge options
  if (typeof originOptions !== 'undefined') {
    if (typeof originOptions.alpha !== 'undefined') {
      options.alpha = originOptions.alpha;
    }
    // TODO no recursion mode is not support yet
    // if (typeof options_.recursion !== 'undefined') {
    //   options.recursion = options_.recursion;
    // }
  }
  var criticalValue = criticalValueTable[options.alpha];
  if (typeof criticalValue === 'undefined') {
    throw new Error('alpha ' + options.alpha + ' is not support');
  }
  var digit = getDigit(originDataSet);
  var powDigit = Math.pow(10, digit);

  // Main algorithm
  var result: GrubbsResult[] = [];
  var done = false;
  var dataSet: (number | undefined)[] = originDataSet.slice();
  var currentRound: any = {};
  var i;
  var gResult;
  // If no outlier, done
  while (!done) {
    done = true;
    currentRound = {};
    currentRound.dataSet = dataSet.slice();
    currentRound.stdev = standardDeviation(
      currentRound.dataSet.filter(isValidData)
    );
    currentRound.average =
      Math.round(average(currentRound.dataSet.filter(isValidData)) * powDigit) /
      powDigit;
    currentRound.criticalValue =
      criticalValue[currentRound.dataSet.filter(isValidData).length];
    currentRound.gSet = [];
    // true if pass, false if unpass, undefined if no data
    currentRound.gPass = [];
    currentRound.outliers = [];
    currentRound.outlierIndexes = [];
    for (i = 0; i < currentRound.dataSet.length; i++) {
      if (typeof currentRound.dataSet[i] === 'undefined') {
        currentRound.gSet.push(undefined);
        currentRound.gPass.push(undefined);
        continue;
      }
      if (typeof currentRound.dataSet[i] !== 'number') {
        throw new Error('data MUST be number');
      }
      gResult =
        (currentRound.dataSet[i] - currentRound.average) / currentRound.stdev;
      currentRound.gSet.push(gResult);
      if (Math.abs(gResult) > currentRound.criticalValue) {
        done = false;
        currentRound.gPass.push(false);
        currentRound.outliers.push(currentRound.dataSet[i]);
        currentRound.outlierIndexes.push(i);
        dataSet[i] = undefined;
      } else {
        currentRound.gPass.push(true);
      }
    }
    result.push(currentRound);
  }
  return result;
}

function isValidData(data: any) {
  return typeof data !== 'undefined' && !isNaN(data) && data !== null;
}

function getDigit(dataSet: any) {
  if (!dataSet) return 0;
  var filteredDataSet = dataSet.filter(isValidData);
  var filteredDataSetLength = filteredDataSet.length;
  if (filteredDataSetLength === 0) return 0;
  var digit = 0;
  filteredDataSet.forEach(function (data: any) {
    var dataString = data.toString();
    var dotIndex = dataString.indexOf('.');
    if (dotIndex === -1) return;
    var currentDigit = dataString.length - dotIndex - 1;
    if (currentDigit > digit) {
      digit = currentDigit;
    }
  });
  return digit;
}
