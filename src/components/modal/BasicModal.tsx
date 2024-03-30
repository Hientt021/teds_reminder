"use client";
import { Box, Modal, ModalProps } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import React, { useEffect, useState } from "react";

export interface IBasicModalProps extends ModalProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
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
export default function BasicModal(props: IBasicModalProps) {
  const { children, open, header, footer, ...rest } = props;

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
          {header}
          {children}
          {footer}
        </Box>
      </Fade>
    </Modal>
  );
}
