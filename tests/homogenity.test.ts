import { homogenity, HomogenityTestResult } from '../src/homogenity';

describe('homogenity', () => {
    it('should correctly calculate homogenity for given dataset', () => {
        // Arrange
        const testData: HomogenityTestResult[] = [
            { label: 'X', values: [0.452, 0.438] },
            { label: 'X', values: [0.436, 0.432] },
            { label: 'X', values: [0.435, 0.434] },
            { label: 'X', values: [0.456, 0.441] },
            { label: 'X', values: [0.434, 0.433] },
            { label: 'X', values: [0.439, 0.430] },
            { label: 'X', values: [0.433, 0.430] },
            { label: 'X', values: [0.434, 0.429] },
            { label: 'X', values: [0.434, 0.436] }
        ];
        const r = 0.07;

        // Act
        const result = homogenity(testData, r);

        // Assert
        expect(result.homogenity).toBe(true);
        expect(result.xAvg).toBeCloseTo(0.436, 3);
        expect(result.sw).toBeCloseTo(0.006, 3);
        expect(result.ss).toBeCloseTo(0.005, 3);
        expect(result.ss2).toBeCloseTo(0.00002, 5);
        expect(result.c).toBeCloseTo(0.0001, 4);
        expect(result.cSqrt).toBeCloseTo(0.012, 3);
    });

    it('should correctly calculate homogenity for second dataset with 10 measurements', () => {
        // Arrange
        const testData: HomogenityTestResult[] = [
            { label: 'X', values: [0.452, 0.438] },
            { label: 'X', values: [0.436, 0.432] },
            { label: 'X', values: [0.435, 0.434] },
            { label: 'X', values: [0.456, 0.441] },
            { label: 'X', values: [0.434, 0.433] },
            { label: 'X', values: [0.439, 0.43] },
            { label: 'X', values: [0.433, 0.430] },
            { label: 'X', values: [0.434, 0.429] },
            { label: 'X', values: [0.434, 0.436] },
            { label: 'X', values: [0.47, 0.43] }
        ];

        const r = 0.07;

        // Act
        const result = homogenity(testData, r);

        // Assert
        expect(result.homogenity).toBe(true);
        expect(result.xAvg).toBeCloseTo(0.438, 3);
        expect(result.sw).toBeCloseTo(0.011, 2);
        expect(result.ss).toBeCloseTo(0.000, 3);
        expect(result.ss2).toBeCloseTo(-0.00001, 4);
        expect(result.c).toBeCloseTo(0.0002, 4);
        expect(result.cSqrt).toBeCloseTo(0.015, 3);
    });

    it('should throw error when input array is empty', () => {
        expect(() => homogenity([], 0.07)).toThrow('At least one test result is required');
    });

    it('should throw error when values array does not contain exactly 2 values', () => {
        const invalidData: HomogenityTestResult[] = [
            { label: 'X', values: [0.452, 0.438, 0.434] }
        ];

        expect(() => homogenity(invalidData, 0.07)).toThrow('We currently only support two values per test');
    });
});
