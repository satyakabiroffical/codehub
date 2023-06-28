import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
// import sk from "../../assets/img/sk.jpg";
import { Login, LogoutSharp, RestoreSharp } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, CardMedia, useMediaQuery } from "@mui/material";
import style from "../../assets/css/OrderHistory.module.css";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";

export default function AccountMenu({ isShow }) {
  const matches = useMediaQuery(" (max-width:870px)");

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const users = ProductContext(ProductArray);
  const user = users.user;
  const  setUser = users.setUser;
  const  setLoginMenu = users.setLoginMenu;

  const handleLogOut = async () => {
    // handleRemoveCart(userId);
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/logOut`);
      // console.log(response);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.clear();
      navigate("/");
      setUser('')
    } catch (error) {
      console.log(error);
      toast.success(error.data.message, {
        position: "top-center",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    // console.log(data);
  };
  // console.log(user)
  // console.log(user.picture)
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
      
        }}
      >
        <Tooltip title={`${user ? `${'hii....' + ' '+ user?.name}` : "Log-In"}`} arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: { xs: "0", md: "2" },
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {localStorage.getItem("token") ? (
               <CardMedia
               component="img"
               image={
                user?.googlePicture ? user?.googlePicture : user?.picture
              }
               onError={(e) =>
                 (e.target.src = require("assets/img/avatar-svgrepo-com.png"))
               }
               // imgProps={{ onError: (e) => { e.target.src = require('assets/img/avtar.svg')} }}
               alt="Profile image"
               sx={{ borderRadius: "50%", height: 32, width: 32,  }}
             />
            ) : (
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}
              />
            )}
          </IconButton>
        </Tooltip>
        <Button
          sx={{
            display: "block",

            "&:hover": {
              bgcolor: "#2c1250",
              color: "rgb(252, 109, 38)",
            },
          }}
          variant="contained"
          onClick={() => navigate("/comming-soon-page")}
          style={{
            border: "1px solid var(--color-themeS)",
            backgroundColor: " #2c1250",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
            width: `${matches ? "0.6rem" : "7rem"}`,
            height: "2.5rem",
            fontSize: "0.7rem",
            Padding: "0.5rem",
            margin: `${matches ? "0" : "0 24px"}`,
            display: `${matches ? "none" : "flex"}`,
          }}
          className={`${style.btn_1}  ${style.btn_123_media}`}
        >
          <span> Sell</span>
        </Button>

        {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
      </Box>

      {localStorage.getItem("token") ? (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link
            to="/profile-page"
            style={{ color: "#171941", fontWeight: "700" }}
          >
            <MenuItem style={{ color: "#171941", fontWeight: "700" }}>
              {localStorage.getItem("token") ? (
                <CardMedia
                component="img"
                image={
                  user?.googlePicture ? user?.googlePicture : user?.picture
                }
                onError={(e) =>
                  (e.target.src = require("assets/img/avatar-svgrepo-com.png"))
                }
                // imgProps={{ onError: (e) => { e.target.src = require('assets/img/avtar.svg')} }}
                alt="Profile image"
                sx={{ borderRadius: "50%", height: 32, width: 32, mr: 1 }}
              />
              ) : (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1,
                    bgcolor: "secondary.main",
                  }}
                />
              )}
              Profile
            </MenuItem>
          </Link>
          <Divider />
          <Link
            to="/orderHistory-page"
            style={{ color: "#171941", fontWeight: "700" }}
          >
            <MenuItem style={{ color: "#171941", fontWeight: "700" }}>
              <RestoreSharp sx={{ width: 32, height: 32, mr: 1 }} />
              Order-History
            </MenuItem>
          </Link>

          <MenuItem
            onClick={handleLogOut}
            style={{ color: "#171941", fontWeight: "700" }}
          >
            <LogoutSharp sx={{ width: 28, height: 28, mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link
            to="/register-page"
            style={{ color: "#171941", fontWeight: "700" }}
          >
            <MenuItem style={{ color: "#171941", fontWeight: "700" }}>
       
              {localStorage.getItem("token")  ? (
                <CardMedia
                component="img"
                image={
                  user?.googlePicture ? user?.googlePicture : user?.picture
                }
                onError={(e) =>
                  (e.target.src = require("assets/img/avatar-svgrepo-com.png"))
                }
                // imgProps={{ onError: (e) => { e.target.src = require('assets/img/avatar-svgrepo-com.png')} }}
                alt="Profile image"
                sx={{ borderRadius: "50%", height: 32, width: 32,  mr: 1,  }}
              />
              ) : (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1,
                    bgcolor: "secondary.main",
                  }}
                />
              )}
              Register
            </MenuItem>
          </Link>
          <Link to={'/register-page'}>
          <MenuItem
           onClick={()=>setLoginMenu(true)}
            style={{ color: "#171941", fontWeight: "700" }}
          >
            <Login sx={{ width: 28, height: 28, mr: 1 }} />
            LogIn
          </MenuItem>
          </Link>
        </Menu>
      )}
    </React.Fragment>
  );
}
