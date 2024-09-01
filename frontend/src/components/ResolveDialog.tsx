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
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h3 className="text-lg font-semibold mb-4">Resolve Bet</h3>
        <div className="flex flex-col space-y-2 mb-4">
          <button
            onClick={() => setSelectedOutcome(Outcome.HOME)}
            className={`px-4 py-2 rounded text-white ${
              selectedOutcome === Outcome.HOME
                ? "bg-green-700 opacity-100"
                : "bg-green-400 hover:bg-green-500  opacity-60"
            }`}
          >
            Home Team Wins
          </button>
          <button
            onClick={() => setSelectedOutcome(Outcome.DRAW)}
            className={`px-4 py-2 rounded text-white ${
              selectedOutcome === Outcome.DRAW
                ? "bg-gray-700 opacity-100"
                : "bg-gray-400 hover:bg-gray-500 opacity-60"
            }`}
          >
            Draw
          </button>
          <button
            onClick={() => setSelectedOutcome(Outcome.AWAY)}
            className={`px-4 py-2 rounded text-white ${
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveDialog;
