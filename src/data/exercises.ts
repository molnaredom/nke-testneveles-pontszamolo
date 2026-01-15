import { femaleExercises as femaleExercisesKifuto } from "./exercises-female-kifuto";
import { femaleExercises as femaleExercisesUj } from "./exercises-female-uj";
import { maleExercises as maleExercisesKifuto } from "./exercises-male-kifuto";
import { maleExercises as maleExercisesUj } from "./exercises-male-uj";
import type { Exercise, ExerciseSet } from "./exercises-female-kifuto";

export type { Exercise, ExerciseSet };

export type Gender = "female" | "male";
export type Cohort = "kifuto" | "uj";

export const EXERCISES: Record<Gender, Record<Cohort, ExerciseSet>> = {
  female: {
    kifuto: femaleExercisesKifuto,
    uj: femaleExercisesUj,
  },
  male: {
    kifuto: maleExercisesKifuto,
    uj: maleExercisesUj,
  },
};
