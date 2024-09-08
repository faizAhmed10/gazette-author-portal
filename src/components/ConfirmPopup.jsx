import React from "react";
import Modal from "react-modal";

const ConfirmPopup = ({ isOpen, onRequestClose, onConfirm, message }) => {
    Modal.setAppElement('#root');
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "black",
      color: "white"
    },
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Confirmation Popup"
        style={customStyles}
        shouldCloseOnOverlayClick={true}
      >
        <h2 className="font-bold text-lg">{message}</h2>
        <div className="my-2 flex justify-between w-[70%] mx-auto font-bold">
            <button onClick={onConfirm} className="p-2 rounded bg-white text-black">Confirm</button>
            <button onClick={onRequestClose} className="p-2 rounded bg-white text-black">Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmPopup;
