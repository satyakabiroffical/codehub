import styled from "@emotion/styled";
import {
  Box,
  Button,
  CssBaseline,


  SwipeableDrawer,
 
} from "@mui/material";

import * as React from "react";
import { BiSortAlt2 } from "react-icons/bi";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: " #11071F",
  //   theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: " #11071F",
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: " #11071F",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function Drawer1({ name, rate, children }, props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root style={{ backgroundColor: " #11071F", height: "auto" }}>
      <CssBaseline />

      <Button
        onClick={toggleDrawer(true)}
        style={{
          color: "#fff",
          border: "1px solid #fff",
          fontSize: "1rem",
          backgroundColor: " #11071F",
          width: '12rem',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <BiSortAlt2  style={{ fontSize: '1.5rem'}} /> {name}
      </Button>

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        // ModalProps={{
        //   keepMounted: true,
        //   height: 100      }}
        PaperProps={{
          sx: {
            width: 1000,
            height: 400,
            backgroundColor: "#11071F",
            color: "#FFF",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Puller />

          {children}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default Drawer1;
