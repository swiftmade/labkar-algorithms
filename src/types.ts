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
