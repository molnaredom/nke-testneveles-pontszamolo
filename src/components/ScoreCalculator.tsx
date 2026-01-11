import { useState } from "react";
import { EXERCISES } from "../data/exercises";
import type { Exercise } from "../data/exercises";

type Gender = "female" | "male";

export function ScoreCalculator() {
  const [gender, setGender] = useState<Gender>("female");
  const [selectedExercise, setSelectedExercise] =
    useState<string>("speed3200m");
  const [value, setValue] = useState<string>("");
  const [points, setPoints] = useState<number | null>(null);

  const exercises = EXERCISES[gender];
  const exercise: Exercise | undefined = exercises[selectedExercise];

  const handleCalculate = () => {
    if (!exercise || !value) return;

    const inputValue = parseFloat(value);
    if (isNaN(inputValue)) return;

    // Find the matching value in the exercise data
    const match = exercise.data.find((d) => d.value === inputValue);

    if (match) {
      setPoints(match.points);
    } else {
      // Find the closest value
      let closest = exercise.data[0];
      let minDiff = Math.abs(closest.value - inputValue);

      for (const item of exercise.data) {
        const diff = Math.abs(item.value - inputValue);
        if (diff < minDiff) {
          minDiff = diff;
          closest = item;
        }
      }

      setPoints(closest.points);
    }
  };

  const genderLabel = gender === "female" ? "👩 Nő" : "👨 Férfi";
  const genderColor =
    gender === "female"
      ? "from-pink-400 to-pink-600"
      : "from-blue-400 to-blue-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">⚽ Pontszámló</h1>
          <p className="text-gray-400 text-lg">
            NKE Testnevelés Óra Pont Kalkulátor
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Gender Selector */}
          <div className={`bg-gradient-to-r ${genderColor} p-8 text-white`}>
            <p className="text-sm font-semibold uppercase tracking-wider mb-4">
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
                    setPoints(null);
                  }}
                  className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    gender === g
                      ? "bg-white text-gray-800 shadow-lg scale-105"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  {g === "female" ? "👩 Nő" : "👨 Férfi"}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Exercise Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Gyakorlat típusa
              </label>
              <select
                value={selectedExercise}
                onChange={(e) => {
                  setSelectedExercise(e.target.value);
                  setValue("");
                  setPoints(null);
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-gray-700 font-medium bg-gray-50"
              >
                {Object.entries(exercises).map(([key, exercise]) => (
                  <option key={key} value={key}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit Display */}
            {exercise && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  Mértékegység
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {exercise.unit}
                </p>
              </div>
            )}

            {/* Value Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Teljesített érték
              </label>
              <input
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setPoints(null);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCalculate();
                }}
                placeholder="pl. 5.36"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-gray-700 font-medium bg-gray-50 text-lg"
              />
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={!value}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
                value
                  ? "bg-gradient-to-r from-green-400 to-green-600 hover:shadow-lg hover:scale-105 active:scale-95"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              🎯 Pontszám kiszámítása
            </button>

            {/* Result Display */}
            {points !== null && (
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl border-3 border-yellow-300 text-center animate-pulse">
                <p className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                  Elért pontszám
                </p>
                <p className="text-6xl font-black text-yellow-600">{points}</p>
                <p className="text-gray-600 text-sm mt-4">
                  {genderLabel} | {exercise?.name} | {value} {exercise?.unit}
                </p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-blue-900 text-sm">
                <strong>💡 Tipp:</strong> A táblázatban nem szereplő értékekhez
                automatikusan a legközelebbi érték pontszámát használjuk.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          NKE Testnevelés Pont Kalkulátor v1.0
        </p>
      </div>
    </div>
  );
}
