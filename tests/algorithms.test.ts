import { MADe, M_Estimator, Q, Hampel, A_Algorithm, Cochran } from '../src/lib';

describe('Algorithms', () => {
  it('A algorithm', () => {
    const samples = [
      0.04, 0.055, 0.178, 0.202, 0.206, 0.227, 0.228, 0.23, 0.23, 0.235, 0.236,
      0.237, 0.243, 0.244, 0.245, 0.2555, 0.26, 0.264, 0.267, 0.27, 0.273,
      0.274, 0.274, 0.278, 0.2811, 0.287, 0.287, 0.288, 0.289, 0.295, 0.296,
      0.311, 0.331, 0.4246,
    ];
    const output = A_Algorithm(samples);

    expect(output.robust).toBeCloseTo(0.262, 3);
    expect(output.robustDeviation).toBeCloseTo(0.0386, 3);
    expect(output.lowLimit).toBeCloseTo(0.2042, 3);
    expect(output.highLimit).toBeCloseTo(0.3198, 3);
  });

  it('MADe Method', () => {
    const samples = [13.9, 14.12, 13.65];
    const output = MADe(samples);
    expect(output.value).toBeCloseTo(0.32626, 3);
  });

  it('M-Estimator Method', () => {
    const samples = [
      13.9, 14.12, 13.65, 14.26, 13.9, 14.25, 0, 13.96, 13.6, 13.7, 13.76, 0,
    ];
    const output = M_Estimator(samples);

    expect(output.value).toBeCloseTo(3.099415, 3);
    expect(output.uncertainty).toBeCloseTo(1.118405, 3);
  });

  it('Q Method', () => {
    const samples = [
      41.41, 39.22, 47.29, 82.46, 45.24, 49.96, 38.2, 45.41, 39.82, 48.17,
      39.67, 47.55, 35.75, 46.13, 52.18, 45.15, 41.57, 43.39, 49.38, 45.67,
      41.08, 49.28, 49.48, 48.37, 33.96, 49.4, 24.4, 41.55, 37.43, 40.63, 49.92,
      47.88, 43.73, 38.1, 38.1, 46.82, 90.11, 45.74, 53.4, 42.65, 47.92, 42.02,
      49.47, 43.89, 50.05, 37.41, 53.64, 56.3, 47.13, 39.08, 44.73, 47, 50.53,
      44.22, 47.83, 46.04, 47, 36.3, 46.44, 24.79, 46.26, 39.88, 38.64, 50.19,
      48.61, 44.18,
    ];

    const output = Q(samples);

    expect(output.value).toBeCloseTo(5.5457, 3);
    // expect(output.hampel).toBeCloseTo(44.722, 3);
  });

  it('Hampel Method', () => {
    const samples = [
      41.41, 39.22, 47.29, 82.46, 45.24, 49.96, 38.2, 45.41, 39.82, 48.17,
      39.67, 47.55, 35.75, 46.13, 52.18, 45.15, 41.57, 43.39, 49.38, 45.67,
      41.08, 49.28, 49.48, 48.37, 33.96, 49.4, 24.4, 41.55, 37.43, 40.63, 49.92,
      47.88, 43.73, 38.1, 38.1, 46.82, 90.11, 45.74, 53.4, 42.65, 47.92, 42.02,
      49.47, 43.89, 50.05, 37.41, 53.64, 56.3, 47.13, 39.08, 44.73, 47, 50.53,
      44.22, 47.83, 46.04, 47, 36.3, 46.44, 24.79, 46.26, 39.88, 38.64, 50.19,
      48.61, 44.18,
    ];

    const output = Hampel(samples, Q(samples).value);

    expect(output.value).toBeCloseTo(44.722, 3);
  });

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
    expect(output).toBe('outlier');
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
    expect(output).toBe('non-outlier');
  });
  it('Cochran Algorithm Test (Null)', () => {
    const samples = [[73, 45]];

    const output = Cochran(samples);
    expect(output).toBe(null);
  });

  //TODO: implement cochran algorithm test (straggler) - Any value considered as straggler

});
