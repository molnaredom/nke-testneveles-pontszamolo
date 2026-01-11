import type { Exercise } from "../data/exercises";

type TableViewProps = {
  exercise: Exercise;
  genderLabel: string;
  onClose: () => void;
  isFemale: boolean;
};

export function TableView({
  exercise,
  genderLabel,
  onClose,
  isFemale,
}: TableViewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`bg-card rounded-2xl sm:rounded-4xl shadow-2xl overflow-hidden border max-h-[90vh] w-full max-w-4xl flex flex-col ${
          isFemale ? "border-pink-500/30" : "border-cyan-500/30"
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-6 text-white transition-all duration-300 ${
            isFemale ? "bg-header-female" : "bg-header-male"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-widest mb-2 opacity-90 ${
                  isFemale ? "text-pink-400" : "text-cyan-400"
                }`}
              >
                Pontok Táblázata
              </p>
              <h2 className="text-2xl sm:text-3xl font-black">
                {exercise.name} • {genderLabel}
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 ${
                isFemale ? "btn-close-female" : "btn-close-male"
              }`}
            >
              Bezárás
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr
                  className={`${
                    isFemale ? "bg-pink-900/20" : "bg-cyan-900/20"
                  } border-b`}
                >
                  <th className="px-2 sm:px-3 py-1.5 text-left font-bold text-gray-300 uppercase text-xs">
                    Érték ({exercise.unit})
                  </th>
                  <th className="px-2 sm:px-3 py-1.5 text-center font-bold text-gray-300 uppercase text-xs">
                    Pont
                  </th>
                </tr>
              </thead>
              <tbody>
                {exercise.data.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-700/30 hover:bg-gray-700/30 transition-colors ${
                      index % 2 === 0 ? "bg-gray-800/20" : "bg-gray-900/20"
                    }`}
                  >
                    <td className="px-2 sm:px-3 py-1 text-gray-200 font-semibold">
                      {item.value}
                    </td>
                    <td
                      className={`px-2 sm:px-3 py-1 text-center font-bold ${
                        isFemale ? "text-pink-400" : "text-cyan-400"
                      }`}
                    >
                      {item.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-700">
          <p className="text-center text-gray-400 text-xs sm:text-sm">
            Összesen {exercise.data.length} pont-érték kombináció
          </p>
        </div>
      </div>
    </div>
  );
}
