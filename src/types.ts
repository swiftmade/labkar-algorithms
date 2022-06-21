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
  max: number;
  formula: string;
};