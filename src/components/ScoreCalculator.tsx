import { useState, useMemo } from "react";
import { EXERCISES } from "../data/exercises";
import type { Exercise, Gender, Cohort } from "../data/exercises";
import { TableView } from "./TableView";

export function ScoreCalculator() {
  const [gender, setGender] = useState<Gender>("female");
  const [cohort, setCohort] = useState<Cohort>("kifuto");
  const [selectedExercise, setSelectedExercise] =
    useState<string>("speed3200m");
  const [value, setValue] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");
  const [showTable, setShowTable] = useState<boolean>(false);

  const exercises = EXERCISES[gender][cohort];
  const exercise: Exercise | undefined = exercises[selectedExercise];

  // Ellenőrizzük, hogy az aktuális gyakorlat perc:mp formátumot igényel-e
  const isTimeFormat = exercise?.unit === "perc:mp";

  // Dinamikus pontszám kalkulálás
  const points = useMemo(() => {
    if (!exercise) {
      return null;
    }

    if (isTimeFormat) {
      // Perc:mp formátumhoz
      if (!minutes && !seconds) {
        return null;
      }
      const m = minutes ? parseInt(minutes, 10) : 0;
      const s = seconds ? parseInt(seconds, 10) : 0;
      if (isNaN(m) || isNaN(s)) {
        return null;
      }

      // Keress meg pontosan
      const match = exercise.data.find((d) => {
        if (typeof d.value === "object" && "minutes" in d.value) {
          return d.value.minutes === m && d.value.seconds === s;
        }
        return false;
      });

      if (match) {
        return match.points;
      }

      // Ha nincs pontos egyezés, keress rá a legközelebbire
      let closest = exercise.data[0];
      let minDiff = Infinity;

      for (const item of exercise.data) {
        if (typeof item.value === "object" && "minutes" in item.value) {
          const totalSeconds = item.value.minutes * 60 + item.value.seconds;
          const inputTotalSeconds = m * 60 + s;
          const diff = Math.abs(totalSeconds - inputTotalSeconds);
          if (diff < minDiff) {
            minDiff = diff;
            closest = item;
          }
        }
      }

      return closest.points;
    } else {
      // Normál formátumhoz
      if (!value) {
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
      let minDiff = Math.abs(
        (typeof closest.value === "number" ? closest.value : 0) - inputValue
      );

      for (const item of exercise.data) {
        if (typeof item.value === "number") {
          const diff = Math.abs(item.value - inputValue);
          if (diff < minDiff) {
            minDiff = diff;
            closest = item;
          }
        }
      }

      return closest.points;
    }
  }, [value, minutes, seconds, exercise, isTimeFormat]);

  const genderLabel = gender === "female" ? "👩 Nő" : "👨 Férfi";

  return (
    <div className="h-screen flex flex-col bg-bg-gradient overflow-hidden">
      {/* Header - Compact */}
      <div className="flex-shrink-0 py-2 sm:py-3 px-4 sm:px-6 text-center animate-fade-in">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-0.5">
          <span>🎯</span>{" "}
          <span className="text-gradient-primary">PONTSZÁMOLÓ</span>
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm font-medium">
          NKE Tisztjelöltek Testnevelés Óra
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
        <div className="max-w-2xl mx-auto">
          {/* Main Card */}
          <div className="bg-card rounded-2xl sm:rounded-4xl shadow-2xl overflow-hidden border">
            {/* Gender & Cohort Selector */}
            <div
              className={`p-4 sm:p-6 text-white transition-all duration-300 ${
                gender === "female" ? "bg-header-female" : "bg-header-male"
              }`}
            >
              {/* Gender Selector */}
              <div className="mb-4 sm:mb-6">
                <p
                  className={`text-xs font-semibold uppercase tracking-widest mb-3 opacity-90 ${
                    gender === "female" ? "text-pink-400" : "text-cyan-400"
                  }`}
                >
                  Nem
                </p>
                <div className="flex gap-2 sm:gap-4">
                  {(["female", "male"] as Gender[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setGender(g);
                        setSelectedExercise(
                          Object.keys(EXERCISES[g][cohort])[0]
                        );
                        setValue("");
                        setMinutes("");
                        setSeconds("");
                      }}
                      className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform ${
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

              {/* Cohort Selector */}
              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-widest mb-3 opacity-90 ${
                    gender === "female" ? "text-pink-400" : "text-cyan-400"
                  }`}
                >
                  Évfolyam
                </p>
                <div className="flex gap-2 sm:gap-4">
                  {(["kifuto", "uj"] as Cohort[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCohort(c);
                        setSelectedExercise(
                          Object.keys(EXERCISES[gender][c])[0]
                        );
                        setValue("");
                        setMinutes("");
                        setSeconds("");
                      }}
                      className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform ${
                        cohort === c
                          ? gender === "female"
                            ? "btn-active-female"
                            : "btn-active-male"
                          : "btn-inactive"
                      }`}
                    >
                      {c === "kifuto" ? "Kifutó" : "Új"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Exercise Selection */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wide">
                  Gyakorlat
                </label>
                <select
                  value={selectedExercise}
                  onChange={(e) => {
                    setSelectedExercise(e.target.value);
                    setValue("");
                    setMinutes("");
                    setSeconds("");
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-sm sm:text-base bg-input"
                >
                  {Object.entries(exercises).map(([key, exercise]) => (
                    <option key={key} value={key}>
                      {exercise.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Value Input */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wide">
                  Teljesítmény
                </label>
                {isTimeFormat ? (
                  <div className="flex gap-2 sm:gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        placeholder="Perc"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-sm sm:text-base bg-input no-spinner"
                      />
                      <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-xs">
                        p
                      </span>
                    </div>
                    <div className="flex-1 relative">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="59"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        placeholder="Másodperc"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-sm sm:text-base bg-input no-spinner"
                      />
                      <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-xs">
                        mp
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Érték..."
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-sm sm:text-base bg-input no-spinner"
                    />
                    {exercise && (
                      <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-xs">
                        {exercise.unit}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Result Display */}
              {points !== null && (
                <div className="group relative mt-4 sm:mt-6 animate-slide-up">
                  <div
                    className={`${
                      gender === "female"
                        ? "glow-background-female"
                        : "glow-background-male"
                    }`}
                  ></div>
                  <div
                    className={`relative ${
                      gender === "female"
                        ? "bg-result-female"
                        : "bg-result-male"
                    } rounded-2xl sm:rounded-4xl p-4 sm:p-6`}
                  >
                    <div className="text-center space-y-2">
                      <p
                        className={`text-xs font-bold uppercase tracking-widest ${
                          gender === "female"
                            ? "text-pink-400"
                            : "text-cyan-400"
                        }`}
                      >
                        Pont
                      </p>
                      <p
                        className={`text-6xl sm:text-7xl lg:text-8xl font-black ${
                          gender === "female"
                            ? "text-pink-300"
                            : "text-cyan-300"
                        }`}
                      >
                        {points}
                      </p>
                      <div className="pt-1 space-y-0">
                        <p className="text-gray-300 text-xs sm:text-sm font-semibold">
                          {genderLabel} •{" "}
                          {cohort === "kifuto" ? "Kifutó" : "Új"} •{" "}
                          {exercise?.name}
                        </p>
                        <p className="text-gray-400 text-xs font-medium">
                          {isTimeFormat ? `${minutes}:${seconds}` : value}{" "}
                          {exercise?.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Table View Button */}
              <button
                onClick={() => setShowTable(!showTable)}
                className={`py-2 sm:py-2 px-3 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                  gender === "female" ? "btn-inactive" : "btn-inactive"
                }`}
              >
                📊 Pontok Táblázata
              </button>

              {/* Info Box */}
              <div className="mt-4 sm:mt-6 bg-info p-3 sm:p-4 rounded-2xl">
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  <strong
                    className={
                      gender === "female" ? "text-pink-400" : "text-cyan-400"
                    }
                  >
                    💡
                  </strong>{" "}
                  Az érték beíráskor azonnal megjelenik a pontszám.
                </p>

                {/* Table View Modal */}
                {showTable && exercise && (
                  <TableView
                    exercise={exercise}
                    genderLabel={genderLabel}
                    onClose={() => setShowTable(false)}
                    isFemale={gender === "female"}
                  />
                )}
              </div>

              {/* Advertisement Banner */}
              <div className="mt-8 sm:mt-12 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 p-3 sm:p-4 rounded-2xl text-center">
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  <span className="text-purple-400 font-semibold">
                    ✨ Saját weboldalt szeretnél?
                  </span>
                  <br />
                  <span className="text-gray-400">
                    Fedezd fel az{" "}
                    <a
                      href="https://molnarcodes.hu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-semibold underline"
                    >
                      molnarcodes.hu
                    </a>{" "}
                    weboldalt és készíttetess velem egy professionális
                    megoldást!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="flex-shrink-0 py-2 px-4 text-center bg-gradient-to-t from-black/20 to-transparent">
        <p className="text-center text-gray-500 text-xs font-medium">
          v4.0 • Molnár Ádám által fejlesztve © 2026
        </p>
      </div>
    </div>
  );
}
