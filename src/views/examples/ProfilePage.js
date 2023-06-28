import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import ContactDetail from "../../components/ContactDetail/ContactDetail";
// import UserProfile from "../../components/ContactDetail/UserProfile";

// import { useSelector, useDispatch } from "react-redux";
// import { handleLogin } from "../../redux/auth";
import { toast } from "react-toastify";
// import userProfilePic from '../../Assets/image/userProfile.jpg'
// import AddToAdress from "../../components/addToAdress/AddToAdress";
// import { handleAddress, handleDefaultAddress } from "../../redux/address";
// import Confirm from '../../components/Confirm'
import {
  Avatar,
  Button,
  CardMedia,
  CircularProgress,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";

// import MyAccount from '../../components/MyAccount'

import { Box, Container } from "@mui/system";

import axios from "axios";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import { Save } from "@mui/icons-material";
const ProfilePage = () => {
  const picInput = useRef(null);
  const userData = ProductContext(ProductArray);
  const user = userData.user;
  const setState = userData.setState;
  const getUserByUserId = userData.getUserByUserId;
  const setUser = userData.setUser;
  const [loading, setloading] = useState(false);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [file, setFile] = useState();
  // console.log(user);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",

    mobile: "",
    email: "",
    profilePic: "",
  });

  useEffect(() => {
    getUserByUserId(`${process.env.REACT_APP_URL}/getUserById/${userId}`);
  }, [token]);
  useEffect(() => {
    if (user) {
      // console.log(user, "user1");
      setProfile({
        name: user.name,
        mobile: user.mobile,
        email: user.email,
      });
    }
  }, [user]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const handleProfilePic = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setProfile((prev) => ({
      ...prev,
      profilePic:
        e.target.files && e.target.files.length ? e.target.files[0] : "",
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    setloading(true);
    const formData = new FormData();

    formData.append("mobile", profile.mobile);
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("picture", profile.profilePic);
    // console.log(profile.profilePic, "pic");
    // console.log(...formData, "hghghgfhg");
    if (profile.name === "" && profile.email === "")
      // console.log(...formData,'jvjvhjvjh')
      toast.error("Please Provide at least one field to update profile");
    fetch(`${process.env.REACT_APP_URL}/updateUser/${userId}`, {
      method: "PUT",
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then(async (response) => {
        if (response.ok) return response.json();
        else throw await response.json();
      })
      .then((result) => {
        // console.log(result, "update result");

        getUserByUserId(`${process.env.REACT_APP_URL}/getUserById/${userId}`);
        toast.success(result.message, {
          position: "top-center",
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };
  const handleLogOut = async () => {
    // handleRemoveCart(userId);

    try {
      await axios.get(`${process.env.REACT_APP_URL}/logOut`);
      // console.log(response);
      toast.success("Logged out successfully..!", {
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
      setUser("");
      navigate("/");
    } catch (error) {
      // console.log(error);
      toast.success("Logging out failed...!", {
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
  useEffect(() => {
    if (!token) {
      navigate("/register-page");
    }
  }, []);
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          height: "100%",
          background: "var(--color-theme2)",

          p: { xs: "0", sm: "5" },
        }}
      >
        <Container
          elevation={10}
          sx={{
            height: "30rem",
            width: { xs: "100%", sm: "50%" },
            ml: { xs: "0", sm: "2" },
            p: 2,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
            background: "var(--color-theme2)",
            color: "var(--color-main)",
          }}
        >
          {/* {console.log(user.picture=== undefined ? 'raje' : 'imgae')} */}
          {user?.picture && user.picture.length > 0 && (
            <CardMedia
              component="img"
              image={user?.googlePicture ? user?.googlePicture : user?.picture}
              onError={(e) =>
                (e.target.src = require("assets/img/avatar-svgrepo-com.png"))
              }
              // imgProps={{ onError: (e) => { e.target.src = require('assets/img/avtar.svg')} }}
              alt="Profile image"
              sx={{ borderRadius: "50%", height: "12rem", width: "12rem" }}
            />
          )}

          <Typography
            variant="h1"
            component="h2"
            fontSize={{ xs: 30, sm: 40 }}
            sx={{ textTransform: "capitalize" }}
          >
            {user.name && user.name.length > 0 ? user.name : ""}
          </Typography>
          <Box
            sx={{
              height: "10rem",
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              textTransform: "capitalize",
            }}
          >
            <Link to="/orderHistory-page" style={{ color: "#fff" }}>
              <Button sx={{ color: "#fff" }}>Order-History</Button>
            </Link>
            <Divider sx={{ width: "100%", background: "#fff" }} />
            {/* <DrawerRight
                  name={
                    <Button href="#Cart" sx={{ color: "#fff" }}>
                    
                    </Button>
                  }
                  Cart={true}
                /> */}
            <Button sx={{ color: "#fff" }} onClick={() => setState(true)}>
              {" "}
              Cart
            </Button>

            <Divider sx={{ width: "100%", background: "#fff" }} />
            <Button
              href="#Log-out"
              sx={{ height: "2rem", width: "100%", color: "#fff" }}
              onClick={handleLogOut}
            >
              Log-Out
            </Button>
            <Divider sx={{ width: "100%", background: "#fff" }} />
          </Box>
        </Container>

        <Container
          elevation={10}
          sx={{
            mr: { xs: "0", sm: "2" },
            mb: { xs: "5", sm: "0" },
            height: "30rem",
            width: { xs: "100%", sm: "50%" },
            background: "var(--color-theme2)",
            color: "var(--color-main)",
            textAlign: "center",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              mt: { xs: 0, sm: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "var(--color-main)",
              "& .MuiFormLabel-root": {
                color: "#fff",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#fff",
              },
              "&  .MuiInputBase-root": {
                color: "#fff",
              },

              "&  .MuiInputBase-root::before": {
                borderBottom: "1px solid #763CAC",
              },
              "&  .MuiInputBase-root::after": {
                borderBottom: "1px solid #fff",
              },
              "&  .MuiFormLabel-asterisk": {
                color: "#FA5D29",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row", xl: "row" },
                alignItems: "center",
                justifyContne: "center",
                mt: { xs: 0, xl: "5rem" },
              }}
            >
              <Avatar
                src={file}
                sx={{
                  m: 1,
                  bgcolor: "secondary.main",
                  width: 50,
                  height: 50,
                  mb: 2,
                }}
              ></Avatar>

              <Button variant="contained" component="label">
                Upload
                <input
                  hidden
                  multiple
                  type="file"
                  ref={picInput}
                  onChange={handleProfilePic}
                  accept=".png*, .jpeg*, .jpg*"
                />
              </Button>
            </Box>
            <Box component="form" validate sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    variant="standard"
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    variant="standard"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    variant="standard"
                    name="mobile"
                    label="Mobile Number"
                    type="text"
                    id="mobile"
                    autoComplete="mobile"
                    value={profile.mobile}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        mobile: e.target.value,
                      }))
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  {/* <Button
                    onClick={handleProfileSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    component="label"
                  >
                    submit
                  </Button> */}
                  {/* <LoadingButton
                    loading
                    loadingPosition="start"
                    startIcon={<Save />}
                    onClick={handleProfileSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    component="label"
                  >
                    Save
                  </LoadingButton> */}

                  <LoadingButton
                    color="primary"
                    loading={loading}
                    loadingPosition="start"
                    onClick={handleProfileSubmit}
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      "&.Mui-disabled": {
                        color: "#fff",
                        backgroundColor: "#C70039 ",
                      },
                    }}
                    component="label"
                  >
                    <span>Submit</span>
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Paper>
    </>
  );
};

export default ProfilePage;
