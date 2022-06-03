import { grubbs } from '../src/grubbs';

// TODO: Improve these tests
describe('Grubbs test', () => {
  it('calculates for %5', () => {
    const result = grubbs([100, 100, 100, 100, 1, 100, 100, 100, 100, 100], {
      alpha: 0.01,
    });

    expect(result[0].outlierIndexes).toEqual([4]);
    expect(result[0].stdev).toEqual(29.7);
  });

  it.skip('calculates for %1', () => {
    // TODO: Implement
  });
});
