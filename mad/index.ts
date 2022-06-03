import { standardDeviation, median } from "simple-statistics";

function Mestimator(arr: number[], x: number) {
  var sumSeries = 0;
  for (var i = arr.length - 1; i >= 0; i--) {
    sumSeries += Number(Math.abs(arr[i] - x));
  }
  return (1 / (0.798 * arr.length)) * sumSeries;
}
function Uvalue(s: number, arr: number[]) {
  return (1.25 * s) / Math.sqrt(arr.length);
}

function calculateUvalue(arr: number[]) {
  var madex = Math.abs(standardDeviation(arr) - median(arr)) * 1.483;
  var result = Uvalue(Mestimator(arr, madex), arr);
  return result;
}

export { calculateUvalue }; 