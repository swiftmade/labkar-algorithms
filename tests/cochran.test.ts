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
    expect(output?.maxDeviation).toBeCloseTo(31.205, 3);
    expect(output?.cPairIndex).toBe(11);
    expect(output?.cPair).toEqual([91, 83.1]);
    expect(output?.outlier).toBe(true);

    output = Cochran(samples, { alpha: 0.01 });
    expect(output?.outlier).toBe(true);
  });

  it.only('Cochran Algorithm Test (Straggler)', () => {
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
    expect(output?.outlier).toBe(true);

    output = Cochran(samples, { alpha: 0.01 });
    expect(output?.outlier).toBe(false);
  });

  it('Cochran Algorithm Test (Null)', () => {
    const samples = [[73, 45]];

    const output = Cochran(samples);
    expect(output).toBe(null);
  });

  it.todo('Cochran Algorithm Test (Straggler)');

  //TODO: Any value considered as straggler
});
