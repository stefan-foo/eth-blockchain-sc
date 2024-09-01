import React, { useState } from "react";
import { useEthersContext } from "../contexts/ethers.context";
import { useSnackbar } from "../contexts/snackbar.context";

const CreateBet: React.FC = () => {
  const { account, provider, factoryContract } = useEthersContext();
  const { openSnackbar } = useSnackbar();

  const [home, setHome] = useState<string>("");
  const [away, setAway] = useState<string>("");
  const [kickoffDate, setKickoffDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateBet = async () => {
    if (!(provider && account && factoryContract)) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const tx = await factoryContract.createGameBet(
        home,
        away,
        Math.floor(new Date(kickoffDate).getTime() / 1000)
      );
      await tx.wait();

      setHome("");
      setAway("");
      setKickoffDate("");

      openSnackbar({
        autoHideDuration: 3000,
        message: "Game bet created successfully",
      });
    } catch (error: any) {
      openSnackbar({
        autoHideDuration: 3000,
        message: error?.reason ?? "Unknown error",
        severity: "error",
      });
      setError("Error creating game bet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-4 bg-gray-100 rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-semibold mb-3 text-center text-gray-800">
          Create New Bet
        </h2>
        {error && <div className="mb-3 text-red-600 text-center">{error}</div>}
        <div className="mb-3">
          <label className="block mb-1 text-gray-700 text-sm">Home Team</label>
          <input
            type="text"
            value={home}
            onChange={(e) => setHome(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full text-sm"
            placeholder="Enter home team name"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-gray-700 text-sm">Away Team</label>
          <input
            type="text"
            value={away}
            onChange={(e) => setAway(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full text-sm"
            placeholder="Enter away team name"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-gray-700 text-sm">
            Kickoff Time
          </label>
          <input
            type="datetime-local"
            value={kickoffDate}
            onChange={(e) => setKickoffDate(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full text-sm"
          />
        </div>
        <button
          onClick={handleCreateBet}
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-blue-400" : "bg-blue-500"
          } hover:bg-blue-600 text-sm`}
          disabled={loading}
        >
          {loading ? "Creating Bet..." : "Create Bet"}
        </button>
      </div>
    </div>
  );
};

export default CreateBet;
