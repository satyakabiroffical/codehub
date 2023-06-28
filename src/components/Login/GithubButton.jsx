import GithubButton from "react-github-login-button";
import { GitHub } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const client_id = "43f8e82ed88588afff23";
// const client_secret = "8d2b5ee44b5199b416baac86a6a2fdafc44061e5"
const GithubButton1 = () => {
  const isId = window.location.search?.slice(6);
  const navigate = useNavigate();
  const notify = () => toast.success("Sign in Succesfully!");
  // console.log(isId, "params");

  // console.log(window.location.search);
  // alert('lkdahnjkl')
  useEffect(() => {
    if (isId) {
      getUserByGithub();
    }
  }, [isId]);
  const getUserByGithub = () => {
    axios({
      method: "post",
      url: `https://server.skcodehub.com/api/getUserData?${isId}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log("verif", response);
        if (response.data.data) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.data._id);
          // alert("login sucssefully");

          setTimeout(() => {
            // setVerifyLoading(false);
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
            navigate("/");
          }, 1000);
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
  };

  function loginWithGithub() {
    window.location
      .assign("https://github.com/login/oauth/authorize?client_id=" + client_id)
      .then((res) => {
        console.log(res);
        return res.json();
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        {localStorage.getItem("accessToken") ? (
          <>
            <h1> we have the access token </h1>
            <button
              onClick={() => {
                ("accessToken");
              }}
            >
              log out{" "}
            </button>

            {/* <button onClick={getUserData}></button> */}
          </>
        ) : (
          <>
            {/* <Button
              variant="outlined"
              maxWidth={400}
              minWidth={200}
              sx={{
                color: "#fff",
                bgcolor: "#2c2c2c",
                maxHeight: "400px",
                maxWidth: "265px",
                width: "100%",
                mt: 1,
              }}
              startIcon={<GitHub />}
              onClick={loginWithGithub}
            >
              LOGIN WITH GITHUB
            </Button> */}

            <GithubButton
              type="light"
              style={{
                color: "#fff",
                backgroundColor: "#2c2c2c",
                maxHeight: "400px",
                maxWidth: "265px",
                width: "100%",
                marginTop: "3.5px",
              }}
              maxWidth={400}
              minWidth={200}
              onClick={loginWithGithub}
            />
          </>
        )}
      </header>
    </div>
  );
};

export default GithubButton1;
