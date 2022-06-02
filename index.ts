// create MAD & M estimator algorithms
function getStandardDeviation (arr: number[]) { 
  const n = arr.length
  const mean = arr.reduce((a, b) => a + b) / n
  return Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}
const median = (arr: number[]): number => {  
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? ((s[mid - 1] + s[mid]) / 2) : s[mid];
};
function mad(arr: number[]) {
  const med = median(arr);
  const abs = arr.map((x) => Math.abs(x - med));  
  return median(abs);
}
var arr = [1, 4, 3, 4, 5, 6, 7, 8, 9, 10]; // median is 5.5
console.log(mad(arr)); // median absolute deviation is 2.5
console.log( getStandardDeviation(arr) * 1.4826 );


