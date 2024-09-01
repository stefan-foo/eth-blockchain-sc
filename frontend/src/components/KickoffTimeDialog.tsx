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
      <div className="bg-white p-3 rounded shadow-md w-64">
        <h3 className="text-base font-semibold mb-3">Edit Kickoff Time</h3>
        <input
          type="datetime-local"
          value={newKickoffTime.toISOString().slice(0, 16)}
          onChange={(e) => setNewKickoffTime(new Date(e.target.value))}
          className="p-1 border border-gray-300 rounded w-full mb-3 text-sm"
        />
        <div className="flex justify-between">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
          >
            Save
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

export default KickoffTimeDialog;
