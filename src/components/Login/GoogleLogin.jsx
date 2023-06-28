import { GoogleLogin } from "@react-oauth/google";
// import FacebookLogin from 'react-facebook-login';
// import style from '../../styles/user.module.css';
// import { useRouter } from "next/router";
import { toast } from "react-toastify";
// import HeadingContext from '../../context/MainContext';

import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const GoogleFB = ({ handleClose }) => {
  //   const a = useContext(HeadingContext);
  const notify = () => toast.success("Sign in Succesfully!");

  const navigate = useNavigate();
  const sendTokentodb = (token) => {
    // console.log(token)
    fetch(`${process.env.REACT_APP_URL}/loginWithGoogle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token1: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //    console.log(data)
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.data._id);
        if (typeof window !== "undefined") {
          notify();
          navigate("/");
          localStorage.setItem("jwt", JSON.stringify(data));
        }
      })
      .catch((err) => console.log(err));
  };
  const responseGoogle = async (response) => {
    // console.log(response)
    var id_token = response.credential;
    sendTokentodb(id_token);
  };
  const clientId =
    "182512171435-juoi3e56csjgrl10argnghtpci7l8u43.apps.googleusercontent.com";

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          auto_select={true}
          ux_mode
          onSuccess={(credentialResponse) => {
            responseGoogle(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          width={265}
        />
      </GoogleOAuthProvider>
      {/* className={style.GoogleButton} */}
      {/* <FacebookLogin
     appId="5306161989395369"
     autoLoad={true}
     fields="name,email,picture"
     callback={responseFaceBook}
     cssclassName={style.FaceBookButton}
     icon="fa-facebook"
   />,  */}
    </>
  );
};
export default GoogleFB;
