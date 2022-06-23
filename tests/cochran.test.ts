import { Cochran } from '../src/lib';
import { CochranResult } from '../src/types';

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

    const output = Cochran(samples);
    expect(output).toBe(CochranResult.Outlier);
  });

  it('Cochran Algorithm Test (Correct)', () => {
    const samples = [
      [73, 45],
      [22, 26],
      [12, 42],
      [42, 20],
      [21, 30],
    ];

    const output = Cochran(samples);
    expect(output).toBe(CochranResult.NonOutlier);
  });

  it('Cochran Algorithm Test (Null)', () => {
    const samples = [[73, 45]];

    const output = Cochran(samples);
    expect(output).toBe(null);
  });

  it.todo('Cochran Algorithm Test (Straggler)');

  //TODO: Any value considered as straggler
});
