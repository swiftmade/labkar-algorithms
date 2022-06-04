import { MADe, M_Estimator, QHampel } from '../src/lib';

describe('Algorithms', () => {
  it('MADe Method', () => {
    const samples = [
      13.9, 14.12, 13.65
    ];
    const output = MADe(samples);
    expect(output.value).toBeCloseTo(0.32626);
  });

  it('M-Estimator Method', () => {
    const samples = [
      13.9, 14.12, 13.65, 14.26, 13.9, 14.25, 0, 13.96, 13.6, 13.7, 13.76, 0,
    ];
    const output = M_Estimator(samples);

    expect(output.value).toBeCloseTo(3.099415);
    expect(output.uncertainty).toBeCloseTo(1.118405);
  });

  it.skip('Q-Hampel Method', () => {
    const samples = [
      13.9, 14.12, 13.65, 14.26, 13.9, 14.25, 0, 13.96, 13.6, 13.7, 13.76, 0,
    ];

    const output = QHampel(samples);

    // TODO: Expected value is incorrect here. Look for a real life example.
    expect(output.value).toBe(0.4136);
  });
});
