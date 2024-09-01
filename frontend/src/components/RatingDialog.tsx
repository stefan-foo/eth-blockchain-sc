import React, { useState } from "react";

interface RatingDialogProps {
  onClose: () => void;
  betAddress: string;
}

const RatingDialog: React.FC<RatingDialogProps> = ({ onClose, betAddress }) => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h3>Rate Bet</h3>
        <div className="flex justify-center mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`mx-1 text-xl ${
                rating >= star ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingDialog;
