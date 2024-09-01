import React, { useState } from "react";
import { useEthersContext } from "../contexts/ethers.context";

const CreateBet: React.FC = () => {
  const { account, provider, factoryContract } = useEthersContext();

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

      alert("Game bet created successfully");
      setHome("");
      setAway("");
      setKickoffDate("");
    } catch (error) {
      setError("Error creating game bet. Please try again.");
      console.error("Error creating game bet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Create New Game Bet
      </h2>
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Home Team</label>
        <input
          type="text"
          value={home}
          onChange={(e) => setHome(e.target.value)}
          className="p-3 border border-gray-300 rounded w-full"
          placeholder="Enter home team name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Away Team</label>
        <input
          type="text"
          value={away}
          onChange={(e) => setAway(e.target.value)}
          className="p-3 border border-gray-300 rounded w-full"
          placeholder="Enter away team name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Kickoff Time</label>
        <input
          type="datetime-local"
          value={kickoffDate}
          onChange={(e) => setKickoffDate(e.target.value)}
          className="p-3 border border-gray-300 rounded w-full"
        />
      </div>
      <button
        onClick={handleCreateBet}
        className={`w-full p-3 rounded text-white ${
          loading ? "bg-blue-400" : "bg-blue-500"
        } hover:bg-blue-600`}
        disabled={loading}
      >
        {loading ? "Creating Bet..." : "Create Bet"}
      </button>
    </div>
  );
};

export default CreateBet;
