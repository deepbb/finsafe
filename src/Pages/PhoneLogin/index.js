import { useState, useContext, useEffect } from "react";
import "./PhoneLogin.css";
import { auth as firebaseAuth } from "../../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { usePreventAuthUser } from "../../Hooks/redirect.js";

import { AuthContext } from "../../Context/AuthContext";
import LoadingButton from "../../Components/LoadingButton";
import { getUserByNumber } from "../../API/readDoc";

export default function Login() {
  const [name, setName] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const [confirmationResult, setConfirmationResult] = useState(null);

  usePreventAuthUser("phonelogin", auth);

  const onLogin = () => {
    if (mobilenumber !== "" && name !== "") {
      const number = "+91" + mobilenumber;
      setLoading(true);
      localStorage.setItem("name", name);
      // fetchUserByPhone(mobilenumber, ()=>{

      // });
      getUserByNumber(parseInt(mobilenumber), (data) => {
        if (data) {
          signInWithPhoneNumber(firebaseAuth, number, window.recaptchaVerifier)
            .then((confirmationResult) => {
              setConfirmationResult(confirmationResult);
              localStorage.setItem("phone", mobilenumber);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
              alert("Your number is not registered, Please try again with the registered number or contact Finsafe administration to join.");
              setLoading(false);
            });
        } else {
          alert("Your number is not registered, Please try again with the registered number or contact Finsafe administration to join.");
          setLoading(false);
        }
      })

    }
  };

  const fetchUserByPhone = (number, cb) => {


  }

  const onCodeSubmit = () => {
    if (confirmationCode) {
      setLoading(true);
      confirmationResult.confirm(confirmationCode).then((result) => {
        setAuth(result.user);
        setLoading(false);
      });
    } else {
      alert("No Confirmation Code");
    }
  };

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("Capthca Completed.");
        },
      },
      firebaseAuth
    );
  }, []);

  return (
    <div className="login_container">
      <div className="login_left">
        <img
          src="assets/images/phone_banner2.png"
          className="login_image"
          alt="phone_banner"
        ></img>
      </div>
      <div className="login_right">
        <div className="header_text" style={{ paddingBottom: "40px" }}>
          <h1 className="login_header">Login with Phone Number</h1>
          <div className="bottom_text">(Only Indian Numbers)</div>
        </div>
        <div className="login_box">
          {confirmationResult ? (
            <>
              <div>
                <label>Confirmation Code</label>
              </div>
              <input
                value={confirmationCode}
                onChange={(e) => {
                  setConfirmationCode(e.target.value);
                }}
                className="logininput"
              ></input>
            </>
          ) : (
            <>
              <div>
                <label>Enter Name </label>
              </div>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="logininput"
              ></input>
              <div>
                <label>Mobile Number</label>
              </div>
              <input
                value={mobilenumber}
                onChange={(e) => {
                  setMobilenumber(e.target.value);
                }}
                className="logininput"
              ></input>
            </>
          )}
        </div>
        <div id="recaptcha-container"></div>
        <div className="login_box">
          <center>
            {" "}
            <LoadingButton
              className="button_login"
              style={{ width: "60%", height: "40px" }}
              loading={loading}
              onClick={confirmationCode ? onCodeSubmit : onLogin}
            >
              {confirmationCode ? "Submit" : "Login"}
            </LoadingButton>
          </center>
        </div>
      </div>
    </div>
  );
}
