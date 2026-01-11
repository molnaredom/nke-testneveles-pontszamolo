import { femaleExercises } from "./exercises-female";
import { maleExercises } from "./exercises-male";
import type { Exercise, ExerciseSet } from "./exercises-female";

export type { Exercise, ExerciseSet };
export { femaleExercises, maleExercises };

export const EXERCISES = {
  female: femaleExercises,
  male: maleExercises,
};
