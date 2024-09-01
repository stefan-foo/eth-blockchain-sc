import React, { useState } from "react";

interface KickoffTimeDialogProps {
  currentKickoffTime: Date;
  onClose: () => void;
  onUpdate: (newKickoffTime: Date) => void;
}

const KickoffTimeDialog: React.FC<KickoffTimeDialogProps> = ({
  currentKickoffTime,
  onClose,
  onUpdate,
}) => {
  const [newKickoffTime, setNewKickoffTime] =
    useState<Date>(currentKickoffTime);

  const handleConfirm = () => {
    onUpdate(newKickoffTime);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h3 className="text-lg font-semibold mb-4">Edit Kickoff Time</h3>
        <input
          type="datetime-local"
          value={newKickoffTime.toISOString().slice(0, 16)}
          onChange={(e) => setNewKickoffTime(new Date(e.target.value))}
          className="p-2 border border-gray-300 rounded w-full mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
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

export default KickoffTimeDialog;
