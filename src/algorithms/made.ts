import { Result } from '../types';

export function MADe(values: number[]): Result {
  // TODO: Implement

  const sd = 1;
  const u = (1.25 * sd) / Math.sqrt(values.length);

  return { value: sd, uncertainty: u };
}
