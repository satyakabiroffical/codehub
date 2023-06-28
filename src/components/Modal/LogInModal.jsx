import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

import { useMediaQuery } from "@mui/material";
const LogInModal = ({ description, rate, open, height, width, setOpen }) => {
  const matches = useMediaQuery("(max-width:870px)");

  const style = {
    position: "absolute",
    top: `${matches ? "48%" : "50%"}`,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `${matches ? "90%" : "60%"}`,
    bgcolor: "var(--color-theme)",
    border: "2px solid #000",
    boxShadow:
      "rgba(0, 12, 22, 0.48) 6px 2px 16px 0px,rgba(132, 20, 197, 0.8) -6px -2px 16px 0px",
    p: `${matches ? "1" : "4"}`,
    overflow: "Hidden",
  };
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            style={{
              height: `${
                height ? height : !matches ? `${rate ? "90%" : "80%"}` : "44rem"
              }`,
              width: `${
                width ? width : matches ? "90%" : `${rate ? "90%" : '"60%"'}`
              }`,
            }}
          >
            {description}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default LogInModal;
