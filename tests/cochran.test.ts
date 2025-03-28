import { Cochran } from '../src/lib';

describe('Cochran Algorithm', () => {
  it('Cochran Algorithm Test (Outlier)', () => {
    const samples = [
      [91, 89.6],
      [89.7, 89.8],
      [88, 87.5],
      [89.2, 88.5],
      [89, 90],
      [88.5, 90.5],
      [88.9, 88.2],
      [90.1, 88.4],
      [86, 85.8],
      [87.6, 84.4],
      [88.2, 87.4],
      [91, 83.1],
      [87.5, 87.8],
      [87.5, 87.6],
      [88.8, 85],
    ];

    let output = Cochran(samples, { alpha: 0.05 });
    expect(output?.hasOutliers).toBe(true);
    expect(output?.outlierIndexes).toEqual([11]);

    output = Cochran(samples, { alpha: 0.01 });
    expect(output?.hasOutliers).toBe(true);
    expect(output?.outlierIndexes).toEqual([11]);
  });

  it('Cochran Algorithm Test (Straggler)', () => {
    const samples = [
      [9.9, 10.2],
      [10.4, 9.5],
      [10, 10],
      [10, 10],
      [10.2, 10.3],
      [9.5, 9.9],
      [10.5, 10.1],
      [10.1, 10.3],
      [10, 10.1],
      [10.2, 10],
    ];

    let output = Cochran(samples);
    expect(output?.hasOutliers).toBe(true);

    output = Cochran(samples, { alpha: 0.01 });
    expect(output?.hasOutliers).toBe(false);
  });

  it('Cochran Algorithm Test (Null)', () => {
    const samples = [[73, 45]];

    const output = Cochran(samples);
    expect(output).toBe(null);
  });

  it('Repeats test until there are no outliers', () => {
    const samples = [
      [0.135, 0.194], // index=0 = outlier
      [0.187, 0.189],
      [0.182, 0.186],
      [0.188, 0.196],
      [0.191, 0.181],
      [0.188, 0.018], // index=5 = outlier
      [0.187, 0.196],
      [0.177, 0.186],
      [0.179, 0.187],
      [0.188, 0.196],
    ];

    const output = Cochran(samples, { alpha: 0.01 });
    expect(output?.outlierIndexes).toContain(0);
    expect(output?.outlierIndexes).toContain(5);
  });

  it('Cochran Algorithm Test (New Values)', () => {
    const samples = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ];

    const output = Cochran(samples);
    expect(output?.hasOutliers).toBe(false); // Adjust the expectation based on your algorithm's behavior
  });

  it('Cochran Algorithm Test (New Values)', () => {
    const samples = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ];

    const output = Cochran(samples);
    expect(output?.hasOutliers).toBe(false); // Adjust the expectation based on your algorithm's behavior
  });
});
