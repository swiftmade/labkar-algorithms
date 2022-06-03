import { M_Estimator, QHampel } from '../src/lib';

describe('Algorithms', () => {
  it.skip('MADe Method', () => {
    // TODO: Implement
  });

  it('M-Estimator Method', () => {
    const results = [
      13.9, 14.12, 13.65, 14.26, 13.9, 14.25, 0, 13.96, 13.6, 13.7, 13.76, 0,
    ];

    const output = M_Estimator(results);

    expect(output.value).toBe(3.099415);
    expect(output.uncertainty).toBe(1.118405);
  });

  it('Q-Hampel Method', () => {
    const results = [
      13.9, 14.12, 13.65, 14.26, 13.9, 14.25, 0, 13.96, 13.6, 13.7, 13.76, 0,
    ];

    const output = QHampel(results);

    // TODO: Expected value is incorrect here. Look for a real life example.
    expect(output.value).toBe(0.4136);
  });
});
