export type Result = {
  value: number;
  uncertainty?: number;
};

export type AResult = {
  robust: number;
  robustDeviation: number;
  highLimit: number;
  lowLimit: number;
};

export type CochranResult = {
  outlier: boolean;
  /**
   * Value used to compare to the elected critical value
   */
  cValue: number;
  /**
   * The pair used to calculate the max deviation
   */
  cPair: number[];
  /**
   * Index of the pair used to calculate the max deviation
   */
  cPairIndex: number;
  /**
   * Maximum value among (stdDev(pair) ^ 2)
   */
  maxDeviation: number;
};

export type ReferenceResult = {
  value: number;
  method: string;
};

export type FormulaType = {
  is_reference: boolean;
  method: string;
  formula: string;
  min: number;
  max: number;
};
