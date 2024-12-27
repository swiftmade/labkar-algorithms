import { grubbs } from '../src/grubbs';

// TODO: Improve these tests
describe('Grubbs test', () => {
  it('calculates for %5', () => {
    const result = grubbs([100, 100, 100, 100, 1, 100, 100, 100, 100, 100], {
      alpha: 0.01,
    });

    expect(result[0].outlierIndexes).toEqual([4]);
    expect(result[0].stdev).toBeCloseTo(31.31, 2);
  });

  it('Only -60 is outlier in this group', () => {
    const results = grubbs([-60, -55.6, -54.7, -54.6, -54.5, -54.4, -54.1], {
      alpha: 0.01,
    });

    // console.log(results);

    // Find all outlier indexes
    const outlierIndexes = results
      .map((result) => result.outlierIndexes)
      .flat();

    expect(outlierIndexes).toEqual([0]);
  });

  it.skip('calculates for %1', () => {
    // TODO: Implement
  });
});
