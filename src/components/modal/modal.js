import React from "react";

import { Dialog } from "@mui/material";
import { useModal } from "./useModal";

const GlobalModal = () => {
  const { modalOpen, setModalOpen, modalContent } = useModal();
  console.log(modalOpen, setModalOpen, modalContent);
  return (
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
      {modalContent}
    </Dialog>
  );
};

export default GlobalModal;
