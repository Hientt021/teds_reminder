"use client";
import { toast } from "@/utils/toast";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, ModalProps } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import React, { useEffect, useState } from "react";

export interface IWarningModalProps extends ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};
export default function WarningModal(props: IWarningModalProps) {
  const { children, open, onCancel, onConfirm, confirmText, ...rest } = props;
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      {...rest}
    >
      <Fade in={open}>
        <Box sx={style} className="flex flex-col gap-3">
          {children}
          <Box className="flex justify-end gap-3">
            <Button variant="text" color="inherit" onClick={onCancel}>
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              onClick={async () => {
                setLoading(true);
                try {
                  onConfirm();
                  onCancel();
                } catch (e: any) {
                  toast(e.message, "error");
                } finally {
                  setLoading(false);
                }
              }}
              variant="contained"
            >
              {confirmText}
            </LoadingButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
