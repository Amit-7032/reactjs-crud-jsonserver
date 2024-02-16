import React from "react";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleOverlayClick = () => {
    onCancel();
  };
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="custom-modal" onClick={handleModalClick}>
        <div className="modal-content">
          <p>{message}</p>
          <div className="modal-actions">
            <button className="btn btn-danger" onClick={onConfirm}>
              Confirm
            </button>
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
