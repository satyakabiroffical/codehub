// import React from 'react'

// const ContactUs = () => {
//   return (
//     <div>ContactUs</div>
//   )
// }

// export default ContactUs

import {
  Button,
  // TextField,
  Typography,
  Container,
  Stack,
  // makeStyles,
  InputBase,
  // Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// // import { Link } from "react-router-dom";
// import { handleAlert } from "../../redux/Alert/alertSlice";
// import {
//   getContactUs,
//   postContactUs,
// } from "../../redux/festures/contactUsSlice";

const ContactUs = () => {
  const styless = {
    border: 0.2,
    borderColor: "#2197D4",
    borderRadius: 2,
    p: 1,
    color: "#fff",
  };
  const stylesss1 = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
    color: "#fff",
  };
  const boxStyle = {
    border: 0.2,
    borderColor: "#2197D4",
    borderRadius: 2,
    p: 1,
    boxShadow: "3px 3px 4px rgba(33, 151, 212, 0.07)",
    color: "#fff",
  };

  // const dispatch = useDispatch();
  // const { loading, contactData } = useSelector((state) => ({
  //   ...state.contact,
  // }));
  const [input, setInput] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // useEffect(() => {
  //   dispatch(
  //     getContactUs({
  //       url: `${process.env.REACT_APP_API_USE}/contactUs/getContactUs`,
  //     })
  //   );
  // }, []);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  // console.log(contactData, "contactData");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.name && input.email && input.message && input.subject !== "") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/enquiry/createEnquiry`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: input,
      })
        .then((response) => {
          // console.log("verif", response);
          if (response.data.data) {
            toast.success("login sucssesfully!", {
              position: "top-center",
              autoClose: true,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setInput((prev) => ({
              ...prev,
              name: "",
              email: "",
              subject: "",
              message: "",
            }));
          }
        })
        .catch((error) => {
          // alert(error.response.data.message);
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });

      // toast.success("your form successfully submitted", {
      //   position: "top-center",
      //   autoClose: true,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
      // setInput((prev) => ({
      //   ...prev,
      //   name: "",
      //   email: "",
      //   subject: "",
      //   message: "",
      // }));
      //   dispatch(
      //     postContactUs({
      //       url: `${process.env.REACT_APP_API_USE}/enquiry/createEnquiry`,
      //       data: input,
      //     })
      //   ).then((data) => {
      //     dispatch(
      //       handleAlert({
      //         isOpen: true,
      //         type: `${data.payload.success ? "success" : "error"}`,
      //         msg: data.payload.message,
      //       })
      //     );
      //     setInput((prev) => ({
      //       ...prev,
      //       name: "",
      //       email: "",
      //       subject: "",
      //       message: "",
      //     }));
      //   });
      // } else {
      //   dispatch(
      //     handleAlert({
      //       isOpen: true,
      //       type: "error",
      //       msg: "enter all fild",
      //     })
      //   );
      // }
    }
  };
  return (
    <>
      <Container
        style={{ color: "#fff" }}
        maxWidth="xl"
        sx={{ display: "flex", gap: 6, flexDirection: "column" }}
      >
        <Container
          maxWidth="xl"
          component={"div"}
          sx={{
            color: "white",
            py: 1.5,
            mt: 5,
            borderRadius: 1.5,
            // bgcolor: "#FA5D29",
            bgcolor: "primary.main",
            width: "100%",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight={700} style={{ color: "#fff" }}>
            Contact us
          </Typography>
        </Container>
        <Box
          sx={{
            display: " flex",
            // justifyContent: "space-between",
            color: "white",
            flexDirection: { xs: "column", md: "row", xl: "row" },
            gap: 4,
            width: "100%",
            // alighItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row", xl: "row" },
              width: "100%",
              gap: 2,
            }}
            flex={2.5}
          >
            <Box
              sx={{
                ...boxStyle,
                ...stylesss1,
                width: "100%",
                height: { xs: "230px ", md: "450px", xl: "450px" },
              }}
            >
              <img
                src={require("../../assets/Icons/location.png")}
                style={{ width: 65, height: 65 }}
              />
              <Typography
                variant="h6"
                color="initial"
                fontWeight={600}
                style={{ color: "#fff" }}
              >
                {" "}
                Our Address
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                textAlign={"center"}
                whiteSpace={"pre-wrap"}
                style={{ color: "#fff" }}
              >
                {/* {contactData?.address || "N/A"} */}
              </Typography>
            </Box>
            <Box
              sx={{
                flexDirection: { xs: "row", md: "column", xl: "column" },
                width: "100%",
                height: { xs: "100%", md: "450px", xl: "450px" },
                gap: 2,
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  ...boxStyle,
                  ...stylesss1,
                  width: { xs: "450px", md: "100%", xl: "100%" },
                  height: { xs: "230px", md: "48%", xl: "48%" },
                }}
              >
                <img
                  src={require("../../assets/Icons/call.png")}
                  style={{ width: 65, height: 65 }}
                />
                <Typography
                  variant="h6"
                  color="initial"
                  fontWeight={600}
                  style={{ color: "#fff" }}
                >
                  Call Us
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  textAlign={"center"}
                  whiteSpace={"pre-wrap"}
                  style={{ color: "#fff" }}
                >
                  {/* {contactData?.call || "N/A"} */}
                </Typography>
              </Box>
              <Box
                sx={{
                  ...boxStyle,
                  ...stylesss1,
                  width: { xs: "450px", md: "100%", xl: "100%" },
                  height: { xs: "230px", md: "48%", xl: "48%" },
                }}
              >
                <img
                  src={require("../../assets/Icons/msg.png")}
                  style={{ width: 60, height: 60 }}
                />
                <Typography
                  variant="h6"
                  color="initial"
                  fontWeight={600}
                  style={{ color: "#fff" }}
                >
                  Email US
                </Typography>
                <Typography
                  // component={Link}
                  // to={contactData?.email}
                  style={{ color: "#fff" }}
                  value
                  variant="body1"
                  color="primary"
                  textAlign={"center"}
                  whiteSpace={"pre-wrap"}
                >
                  {/* {contactData?.email || "N/A"} */}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }} flex={5}>
            <form
              onSubmit={handleSubmit}
              style={{ color: "#fff" }}
              Validate
              autoComplete="off"
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Stack direction={"column"} spacing={3}>
                  <Stack direction={"row"} spacing={3}>
                    <Stack
                      direction={"column"}
                      spacing={1}
                      sx={{ width: "100%" }}
                      style={{ color: "#fff" }}
                    >
                      <Typography
                        variant="body1"
                        color="initial"
                        style={{ color: "#fff" }}
                      >
                        Your Name
                      </Typography>
                      <InputBase
                        fullWidth
                        required
                        variant="outlined"
                        type={"text"}
                        placeholder="Type Your Name"
                        sx={{ ...styless }}
                        value={input.name}
                        onChange={(e) =>
                          setInput((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </Stack>
                    <Stack
                      direction={"column"}
                      spacing={1}
                      sx={{ width: "100%" }}
                    >
                      <Typography
                        variant="body1"
                        color="initial"
                        style={{ color: "#fff" }}
                      >
                        Your Email
                      </Typography>
                      <InputBase
                        fullWidth
                        required
                        variant="outlined"
                        type={"email"}
                        placeholder="Type YourEmail"
                        sx={{ ...styless }}
                        value={input.email}
                        onChange={(e) =>
                          setInput((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </Stack>
                  </Stack>
                  <Stack direction={"column"} spacing={1}>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={{ color: "#fff" }}
                    >
                      Subject
                    </Typography>
                    <InputBase
                      fullWidth
                      required
                      type={"text"}
                      variant="outlined"
                      placeholder="Type Your Subject"
                      sx={{ ...styless }}
                      value={input.subject}
                      onChange={(e) =>
                        setInput((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                    />
                  </Stack>
                  <Stack direction={"column"} spacing={1}>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={{ color: "#fff" }}
                    >
                      Message
                    </Typography>
                    <InputBase
                      fullWidth
                      required
                      variant="outlined"
                      placeholder="Type Your Message"
                      multiline
                      type={"text"}
                      rows={5}
                      sx={{ ...styless }}
                      value={input.message}
                      onChange={(e) =>
                        setInput((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                    />
                  </Stack>
                  <Button
                    type={"submit"}
                    variant="contained"
                    color="primary"
                    size={"large"}
                    sx={{ width: "20%" }}
                  >
                    Submit
                  </Button>
                </Stack>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
      <Box sx={{ height: "10rem", width: "100%" }} />
    </>
  );
};

export default ContactUs;
