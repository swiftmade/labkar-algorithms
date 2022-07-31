import {
  MADe,
  M_Estimator,
  Q,
  Hampel,
  A_Algorithm,
  ReferenceValue,
} from '../src/lib';

describe('Reference Value', () => {
  it('x value is not range', () => {
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

  it('No reference values', () => {
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

  it('Prioritizes reference value', () => {
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

  it('Alternative: prioritizes reference array', () => {
    const formulae = [
      {
        formula: '0.4',
        method: 'TEST',
        min: 0,
        max: 100,
        is_reference: false,
      },
    ];

    const output = ReferenceValue(79.3, formulae);

    expect(output?.value).toBe(0.4);
    expect(output?.method).toBe('TEST');
  });
});
