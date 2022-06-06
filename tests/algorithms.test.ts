import { MADe, M_Estimator, QHampel } from '../src/lib';

describe('Algorithms', () => {
  it('MADe Method', () => {
    const samples = [13.9, 14.12, 13.65];
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

  it('Q-Hampel Method', () => {
    const samples = [
      41.41, 39.22, 47.29, 82.46, 45.24, 49.96, 38.2, 45.41, 39.82, 48.17,
      39.67, 47.55, 35.75, 46.13, 52.18, 45.15, 41.57, 43.39, 49.38, 45.67,
      41.08, 49.28, 49.48, 48.37, 33.96, 49.4, 24.4, 41.55, 37.43, 40.63, 49.92,
      47.88, 43.73, 38.1, 38.1, 46.82, 90.11, 45.74, 53.4, 42.65, 47.92, 42.02,
      49.47, 43.89, 50.05, 37.41, 53.64, 56.3, 47.13, 39.08, 44.73, 47, 50.53,
      44.22, 47.83, 46.04, 47, 36.3, 46.44, 24.79, 46.26, 39.88, 38.64, 50.19,
      48.61, 44.18,
    ];

    const output = QHampel(samples);      

    expect(output.value).toBeCloseTo(5.5457);
    expect(output.hampel).toBeCloseTo(44.722);
    
  });
});
