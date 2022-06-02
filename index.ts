function getStandardDeviation(arr: number[]) {
  const n = arr.length;
  const mean = arr.reduce((a, b) => a + b) / n;
  return Math.sqrt(arr.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}
function calculateMedian(arr: number[]) {
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
}
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

var arr = [1, 2, 3, 4, 5, 6, 3, 8, 2, 20];
var standartDeviation = getStandardDeviation(arr);
var madex = Math.abs(standartDeviation - calculateMedian(arr)) * 1.483;

var result = Uvalue(Mestimator(arr, madex), arr);
console.log(result);
