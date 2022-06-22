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
export enum CochranResultType {
  Outlier = 'outlier',
  Straggler = "straggler",
  NonOutlier = "non-outlier"  
};
/* export type CochranResult = 'outlier' | 'straggler' | 'not-outlier' | null; */
export type CochranResult = CochranResultType;
