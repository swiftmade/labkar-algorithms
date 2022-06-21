import {
  MADe,
  M_Estimator,
  Q,
  Hampel,
  A_Algorithm,
  ReferenceValue,
} from '../src/lib';

describe('Algorithms', () => {
  it('Reference Value (CASE1: x value is not range)', () => {
    let x = 0.4;
    const formulae = [
      {
        formula: '0.075*X+4.6',
        method: 'TS EN 13132',
        min: 60.1,
        max: 500.0,
        is_reference: true,
      },
      {
        formula: '0.016*X+3.70 ',
        method: 'TS EN ISO 13032',
        min: 8.0,
        max: 50.0,
        is_reference: true,
      },
      {
        formula: '0.6*X',
        method: 'ASTM D381',
        min: 1.0,
        max: 30.0,
        is_reference: false,
      },
    ];
    const output = ReferenceValue(x, formulae);

    expect(output).toBe(null);
  });

  it('Reference Value (CASE2: is not reference array)', () => {
    let x = 0.4;
    const formulae = [
      {
        formula: '0.075*X+4.6',
        method: 'TS EN 13132',
        min: 60.1,
        max: 500.0,
        is_reference: false,
      },
      {
        formula: '0.016*X+3.70 ',
        method: 'TS EN ISO 13032',
        min: 8.0,
        max: 50.0,
        is_reference: false,
      },
      {
        formula: '0.6*X',
        method: 'ASTM D381',
        min: 1.0,
        max: 30.0,
        is_reference: false,
      },
    ];
    let output = ReferenceValue(x, formulae);
    expect(output).toBe(null);

    x = 10;
    output = ReferenceValue(x, formulae);

    expect(output?.value).toBeCloseTo(6, 3);
    expect(output?.method).toBe('ASTM D381');
  });

  it('Reference Value (CASE3: is reference array)', () => {
    let x = 0.4;
    const formulae = [
      {
        formula: '0.075*X+4.6',
        method: 'TS EN 13132',
        min: 60.1,
        max: 500.0,
        is_reference: true,
      },
      {
        formula: '0.016*X+3.70 ',
        method: 'TS EN ISO 13032',
        min: 8.0,
        max: 50.0,
        is_reference: true,
      },
      {
        formula: '0.6*X',
        method: 'ASTM D381',
        min: 1.0,
        max: 30.0,
        is_reference: false,
      },
    ];
    let output = ReferenceValue(x, formulae);
    expect(output).toBe(null);

    x = 10;
    output = ReferenceValue(x, formulae);

    expect(output?.value).toBeCloseTo(3.86, 3);
    expect(output?.method).toBe('TS EN ISO 13032');
  });

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
});
