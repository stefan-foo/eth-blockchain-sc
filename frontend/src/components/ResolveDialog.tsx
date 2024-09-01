import React, { useState } from "react";
import { Outcome } from "../core/types/Outcome";

interface ResolveDialogProps {
  onClose: () => void;
  onResolve: (outcome: Outcome) => void;
}

const ResolveDialog: React.FC<ResolveDialogProps> = ({
  onClose,
  onResolve,
}) => {
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);

  const handleConfirm = () => {
    console.log(selectedOutcome);
    if (selectedOutcome !== null) {
      onResolve(selectedOutcome);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-3 rounded shadow-md w-64">
        <h3 className="text-base font-semibold mb-3">Resolve Bet</h3>
        <div className="flex flex-col space-y-1 mb-3">
          <button
            onClick={() => setSelectedOutcome(Outcome.HOME)}
            className={`px-3 py-1 rounded text-white text-sm ${
              selectedOutcome === Outcome.HOME
                ? "bg-green-700 opacity-100"
                : "bg-green-400 hover:bg-green-500 opacity-60"
            }`}
          >
            Home Team Wins
          </button>
          <button
            onClick={() => setSelectedOutcome(Outcome.DRAW)}
            className={`px-3 py-1 rounded text-white text-sm ${
              selectedOutcome === Outcome.DRAW
                ? "bg-gray-700 opacity-100"
                : "bg-gray-400 hover:bg-gray-500 opacity-60"
            }`}
          >
            Draw
          </button>
          <button
            onClick={() => setSelectedOutcome(Outcome.AWAY)}
            className={`px-3 py-1 rounded text-white text-sm ${
              selectedOutcome === Outcome.AWAY
                ? "bg-red-700 opacity-100"
                : "bg-red-400 hover:bg-red-500 opacity-60"
            }`}
          >
            Away Team Wins
          </button>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleConfirm}
            disabled={selectedOutcome === null}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-blue-300 text-sm"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveDialog;
