import { useState, useMemo } from "react";
import { EXERCISES } from "../data/exercises";
import type { Exercise } from "../data/exercises";

type Gender = "female" | "male";

export function ScoreCalculator() {
  const [gender, setGender] = useState<Gender>("female");
  const [selectedExercise, setSelectedExercise] =
    useState<string>("speed3200m");
  const [value, setValue] = useState<string>("");

  const exercises = EXERCISES[gender];
  const exercise: Exercise | undefined = exercises[selectedExercise];

  // Dinamikus pontszám kalkulálás - useMemo helyett setState
  const points = useMemo(() => {
    if (!exercise || !value) {
      return null;
    }

    const inputValue = parseFloat(value);
    if (isNaN(inputValue)) {
      return null;
    }

    // Keress meg pontosan vagy a legközelebb
    const match = exercise.data.find((d) => d.value === inputValue);

    if (match) {
      return match.points;
    }

    let closest = exercise.data[0];
    let minDiff = Math.abs(closest.value - inputValue);

    for (const item of exercise.data) {
      const diff = Math.abs(item.value - inputValue);
      if (diff < minDiff) {
        minDiff = diff;
        closest = item;
      }
    }

    return closest.points;
  }, [value, exercise]);

  const genderLabel = gender === "female" ? "👩 Nő" : "👨 Férfi";

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-7xl font-black mb-3">
            <span className="text-gradient-primary">⚽ PONTSZÁMLÓ</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium">
            NKE Testnevelés Óra Pont Kalkulátor
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-4xl shadow-2xl overflow-hidden border">
          {/* Gender Selector */}
          <div
            className={`p-10 text-white transition-all duration-300 ${
              gender === "female" ? "bg-header-female" : "bg-header-male"
            }`}
          >
            <p
              className={`text-sm font-semibold uppercase tracking-widest mb-6 opacity-90 ${
                gender === "female" ? "text-pink-400" : "text-cyan-400"
              }`}
            >
              Nem kiválasztása
            </p>
            <div className="flex gap-4">
              {(["female", "male"] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setGender(g);
                    setSelectedExercise(Object.keys(EXERCISES[g])[0]);
                    setValue("");
                  }}
                  className={`flex-1 py-4 px-6 rounded-3xl font-bold text-lg transition-all duration-300 transform ${
                    gender === g
                      ? g === "female"
                        ? "btn-active-female"
                        : "btn-active-male"
                      : "btn-inactive"
                  }`}
                >
                  {g === "female" ? "👩 Nő" : "👨 Férfi"}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-10 space-y-8">
            {/* Exercise Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                Gyakorlat
              </label>
              <select
                value={selectedExercise}
                onChange={(e) => {
                  setSelectedExercise(e.target.value);
                  setValue("");
                }}
                className="w-full px-6 py-4 rounded-3xl text-base bg-input"
              >
                {Object.entries(exercises).map(([key, exercise]) => (
                  <option key={key} value={key}>
                    {exercise.name} • {exercise.unit}
                  </option>
                ))}
              </select>
            </div>

            {/* Value Input */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                Teljesítmény
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Érték megadása..."
                  className="w-full px-6 py-4 rounded-3xl text-lg bg-input"
                />
                {exercise && (
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">
                    {exercise.unit}
                  </span>
                )}
              </div>
            </div>

            {/* Result Display */}
            {points !== null && (
              <div className="group relative mt-10 animate-slide-up">
                <div
                  className={`${
                    gender === "female"
                      ? "glow-background-female"
                      : "glow-background-male"
                  }`}
                ></div>
                <div
                  className={`relative ${
                    gender === "female" ? "bg-result-female" : "bg-result-male"
                  } rounded-4xl p-10`}
                >
                  <div className="text-center space-y-4">
                    <p
                      className={`text-sm font-bold uppercase tracking-widest ${
                        gender === "female" ? "text-pink-400" : "text-cyan-400"
                      }`}
                    >
                      Elért pont
                    </p>
                    <p
                      className={`text-8xl font-black ${
                        gender === "female" ? "text-pink-300" : "text-cyan-300"
                      }`}
                    >
                      {points}
                    </p>
                    <div className="pt-2 space-y-1">
                      <p className="text-gray-300 text-sm font-semibold">
                        {genderLabel} • {exercise?.name}
                      </p>
                      <p className="text-gray-400 text-xs font-medium">
                        {value} {exercise?.unit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!points && value && (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm font-medium">
                  ⏳ Érték feldolgozása...
                </p>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-10 bg-info p-6 rounded-3xl">
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong
                  className={
                    gender === "female" ? "text-pink-400" : "text-cyan-400"
                  }
                >
                  💡 Tipp:
                </strong>{" "}
                Az érték beíráskor azonnal megjelenik a pontszám. Ha nincs
                pontos érték, a legközelebbi értéket használjuk.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-10 font-medium">
          NKE Testnevelés Pont Kalkulátor v4.0 • SCI-FI EDITION
        </p>
      </div>
    </div>
  );
}
