import React from "react";

import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useModal } from "./useModal";
import CustomButton from "../custom-button/custom-button.component";
import useIsMobile from "../../App/useIsMobile";

const GlobalModal = () => {
  const { modalOpen, setModalOpen, modalContent, maxWidth = "xs" } = useModal();
  const isMobile = useIsMobile();
  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      fullScreen={isMobile}
      maxWidth={maxWidth}
      fullWidth
      scroll="paper"
    >
      <DialogContent>{modalContent}</DialogContent>
      <DialogActions>
        <CustomButton onClick={() => setModalOpen(false)}>Close</CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default GlobalModal;
