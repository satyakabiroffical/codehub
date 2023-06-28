import classnames from "classnames";
import OtpInput from "react18-input-otp";
import style from "../../assets/css/Register.module.css";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import { AccountCircle, Call, Email } from "@mui/icons-material";
import GoogleFB from "components/Login/GoogleLogin";


import GithubButton1 from "components/Login/GithubButton";
import { useEffect, useState } from "react";

const UserLogin = () => {
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");
  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  const [veryfy, setVeryfy] = useState(false);

  const [verifyLoading, setVerifyLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setFName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [loginUser, setLoginUser] = useState(false);
  const navigate = useNavigate();

  const loginState = ProductContext(ProductArray);
  const LoginMenu = loginState.LoginMenu;
  const setLoginMenu = loginState.setLoginMenu;

  const [checked, setChecked] = useState(false);
  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  useEffect(() => {
    const isLogin = localStorage.getItem("token");
    const isLoginId = localStorage.getItem("id");
    if (isLogin) {
      setLoginUser(true);
    } else if (isLogin && isLoginId) {
      setLoginUser(true);
    } else {
      setLoginUser(false);
    }
  }, [loginUser]);

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
    if (enteredOtp.length === 4) {
      setVerifyLoading(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/signUp/otpVerify`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          mobile,
          otp: enteredOtp,
        },
      })
        .then((response) => {
          // console.log("verif", response);
          if (response.data.data) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.data._id);
            // alert("login sucssefully");

            setTimeout(() => {
              setVerifyLoading(false);
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
             
            }, 2000);
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
    }
    // console.log(enteredOtp);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (localStorage.getItem("id")) {
      const userId = localStorage.getItem("id");
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/signUp`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          name,
          mobile,
          email,
          userId: userId,
        },
      })
        .then((response) => {
          // console.log(response);
          // alert(response.data.message);
          if (response.data.success === true) {
            localStorage.setItem("name", name);
            localStorage.setItem("mobile", mobile);
            localStorage.setItem("email", email);
            toast.success('Otp sent in your register mobile number', {
              position: "top-center",
              autoClose: true,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setVeryfy(true);
            setIsLoading(false);
            sendOTP();
          }
        })
        .catch((error) => {
          // console.log(error.response.data);
          toast.warn(error.response.data.message, {
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
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/signUp`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          name,
          mobile,
          email,
        },
      })
        .then((response) => {
          // console.log(response);
          // alert(response.data.message);
          if (response.data.success === true) {
            localStorage.setItem("name", name);
            localStorage.setItem("mobile", mobile);
            localStorage.setItem("email", email);
            toast.success('Otp sent in your register mobile number', {
              position: "top-center",
              autoClose: true,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setVeryfy(true);
            setIsLoading(false);
            sendOTP();
          }
        })
        .catch((error) => {
          // console.log(error.response.data);

          toast.warn(error.response.data.message, {
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
    }

    // setFName("");
    // // setMobile("");
    // setEmail("");
    // setPass("");
  };
  const matches = useMediaQuery("(max-width:870px)");

  const handleLoginSubmit = () => {
        const userId = localStorage.getItem('id')
    setIsLoading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/logIn`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        mobile,
              userId: userId,
      },
    })
      .then((response) => {
        // console.log(response);
        // alert(response.data.message);
        if (response.data.success === true) {
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem("mobile", response.data.data.mobile);
          toast.success('Otp sent in your register mobile number', {
            position: "top-center",
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setVeryfy(true);
          setLoginMenu(false);
          setIsLoading(false);
          sendOTP();
        }
      })
      .catch((error) => {
        // console.log(error.response.data)

        toast.warn(error.response.data.message, {
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
  };

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const sendOTP = () => {
    setMinutes(1);
    setSeconds(0);
  };
  const resendOTP = () => {
    setMinutes(1);
    setSeconds(0);
    handleLoginSubmit();
  };
  return (
    <>
      <Container>
        <Col
          className="offset-lg-0 offset-md-3"
          lg="10"
          md="6"
          style={{ overflow: "hidden", height: "40rem" }}
        >
          <Row>
            <Col
              lg="5"
              md="6"
              style={{
                transform: `${
                  LoginMenu || veryfy ? "translateX(-500px)" : "translateX(0px)"
                }`,

                transition: "transform",
                transitionDuration: "800ms",
              }}
            >
              <div
                className="square square-7"
                id="square7"
                style={{ transform: squares7and8 }}
              />
              <div
                className="square square-8"
                id="square8"
                style={{ transform: squares7and8 }}
              />

              <Card className="card-register">
                <CardHeader>
                  <CardImg
                    alt="..."
                    src={require("assets/img/square-purple-1.png")}
                  />
                  <CardTitle tag="h4" s>
                    Register
                  </CardTitle>
                </CardHeader>

                <CardBody>
                  <Form className="form">
                    <InputGroup
                      className={classnames({
                        "input-group-focus": fullNameFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <AccountCircle sx={{ fontSize: "1rem" }} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        required
                        placeholder="Full Name"
                        type={"text"}
                        onFocus={(e) => setFullNameFocus(true)}
                        onBlur={(e) => setFullNameFocus(false)}
                        onChange={(e) => setFName(e.target.value)}
                        id="fName"
                        value={name}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": emailFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Email sx={{ fontSize: "1rem" }} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        required
                        placeholder="Email"
                        type={"email"}
                        onFocus={(e) => setEmailFocus(true)}
                        onBlur={(e) => setEmailFocus(false)}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        value={email}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": mobileFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Call sx={{ fontSize: "1rem" }} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Mobile"
                        required
                        type={"number"}
                        onFocus={(e) => setMobileFocus(true)}
                        onBlur={(e) => setMobileFocus(false)}
                        onChange={(e) => setMobile(e.target.value)}
                        id="mobile"
                        value={mobile}
                      />
                    </InputGroup>

                    <FormGroup>
                      <FormControlLabel
                        size="small"
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={handleChangeChecked}
                          />
                        }
                        label={"I agree to the  terms and conditions"}
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                    </FormGroup>
                    <FormGroup className="text-left m-1">
                      <Label>
                        <span className="form-check-sign" />
                        Already have an account?
                        <a href="#loginUser" onClick={() => setLoginMenu(true)}>
                          Click to login here
                        </a>
                      </Label>
                    </FormGroup>
                  </Form>

                  <GoogleFB />
                  <GithubButton1 />
                </CardBody>

                <CardFooter>
                  <Button
                    disabled={checked === false}
                    className="btn-round"
                    color="primary"
                    size="lg"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    send Otp
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            {/* Login */}
            <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
              <Card
                className="card-register"
                style={{
                  // display: `${LoginMenu || veryfy ? "block" : "none"}`,
                  transform: `${
                    !LoginMenu
                      ? "translateX(1000px)"
                      : `${
                          matches ? "translateY(-500px)" : "translateX(-386px)"
                        }`
                  }`,
                  transition: "transform",
                  transitionDuration: "800ms",
                }}
              >
                <CardHeader>
                  <CardImg
                    alt="..."
                    src={require("assets/img/square-purple-1.png")}
                  />
                  <CardTitle tag="h4">LogIN</CardTitle>
                </CardHeader>
                <CardBody style={{ marginTop: "2rem" }}>
                  <Form className="form">
                    <InputGroup>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": mobileFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <Call sx={{ fontSize: "1rem" }} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Mobile"
                          type={"number"}
                          required
                          onFocus={(e) => setMobileFocus(true)}
                          onBlur={(e) => setMobileFocus(false)}
                          onChange={(e) => setMobile(e.target.value)}
                          id="mobile"
                          value={mobile}
                        />
                      </InputGroup>
                    </InputGroup>
                  </Form>

                  <GoogleFB />
                  <GithubButton1 />
                </CardBody>
                <CardFooter>
                  <FormGroup className="text-left m-1">
                    <Label>
                      <span className="form-check-sign" />
                      something else.. ? &nbsp;
                      <a href="#loginUser" onClick={() => setLoginMenu(false)}>
                        Click to signUp here
                      </a>
                    </Label>
                  </FormGroup>
                  <Button
                    className="btn-round"
                    color="primary"
                    size="lg"
                    type="submit"
                    onClick={handleLoginSubmit}
                  >
                    Login
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            {/* verify */}
            <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
              <Card
                className="card-register"
                style={{
                  transform: `${
                    !veryfy
                      ? "translateY(500px)"
                      : `${
                          matches ? "translateY(-900px)" : "translateY(-381px)"
                        }`
                  }`,
                  transition: "transform",
                  transitionDuration: "800ms",
                }}
              >
                <CardHeader>
                  <CardImg
                    alt="..."
                    src={require("assets/img/square-purple-1.png")}
                  />
                  <CardTitle tag="h4" s>
                    verify
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form">
                    <InputGroup>
                      <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={4}
                        isDisabled={false}
                        hasErrored={true}
                        isInputSecure={false}
                        // onSubmit={(otp) => console.log(otp)}
                        autoComplete="true"
                        type="number"
                        inputStyle={style.inputStyle}
                        separator={<span style={{ margin: "0.3rem" }} />}
                      />
                    </InputGroup>
                  </Form>
                </CardBody>
                <CardFooter
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {/* {seconds > 0 || minutes > 0 ? (
                          <span>
                            Time Remaining :{" "}
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                          </span>
                        ) : (
                          <span>Didn't receive code?</span>
                        )} */}
                  <span>
                    {isLoading ? (
                      <CircularProgress
                        color="secondary"
                        value={40}
                        size={20}
                        style={{
                          margin: "auto",
                          padding: "auto",
                        }}
                      />
                    ) : (
                      <>
                        {seconds > 0 || minutes > 0 ? (
                          <span>
                            Time Remaining :{" "}
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                          </span>
                        ) : (
                          <span>Didn't receive code?</span>
                        )}
                      </>
                    )}
                    &nbsp;
                    <span
                      disabled={seconds > 0 || minutes > 0}
                      style={{
                        color: "#e14eca",
                        cursor: "pointer",
                        display:
                          seconds > 0 || minutes > 0 ? "none" : "inline-block",
                      }}
                      onClick={resendOTP}
                    >
                      Resend OTP
                    </span>
                  </span>
                  <Button
                    className="btn-round"
                    color="primary"
                    size="lg"
                    type="submit"
                    disabled
                    onClick={handleSubmit}
                    style={{
                      display: `${matches ? "flex" : "none"}`,
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress
                      style={{
                        display: `${verifyLoading ? "block" : "none"}`,
                      }}
                      color="info"
                      size={20}
                      value={40}
                    />{" "}
                    verify
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default UserLogin;
