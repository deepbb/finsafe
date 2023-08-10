import { useState, useContext } from "react";
import {
  AiOutlineLoading,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { auth as firebaseAuth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../Context/AuthContext";
import { usePreventAuthUser } from "../../Hooks/redirect";

import "./SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  usePreventAuthUser("signup", auth);

  const handleEyeClick = () => {
    setShowPassword((bool) => !bool);
  };

  const onSignUp = () => {
    if (email !== "" && password !== "") {
      if (password === confirmPassword) {
        setLoading(true);
        localStorage.setItem("name", email);
        createUserWithEmailAndPassword(firebaseAuth, email, password)
          .then((userCredential) => {
            setAuth(userCredential.user);
            alert("User created and signed In");
            setLoading(false);
          })
          .catch((error) => {
            alert("Could not sign in.");
            setLoading(false);
          });
      } else {
        alert("Passwords does not match");
      }
    }
  };

  return (
    <div className="login_container">
      <div className="login_left">
        <img
          src="assets/images/login_banner.png"
          className="login_image"
          alt="Login Banner"
        ></img>
      </div>
      <div className="login_right">
        <div className="header_text">
          <h1 className="login_header">Register to Finsafe</h1>
        </div>
        <div className="login_box">
          <div className="center_text">
            <label>Email</label>
          </div>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="logininput"
          ></input>
        </div>
        <div className="login_box">
          <div className="center_text">
            <label>Password</label>
          </div>
          <div style={{ display: "flex", position: "relative" }}>
            <input
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="logininput"
            />
            {showPassword ? (
              <AiFillEye className="password_eye" onClick={handleEyeClick} />
            ) : (
              <AiFillEyeInvisible
                className="password_eye"
                onClick={handleEyeClick}
              />
            )}
          </div>
        </div>
        <div className="login_box">
          <div className="center_text">
            <label>Confirm Password</label>
          </div>
          <input
            value={confirmPassword}
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="logininput"
          ></input>
        </div>
        <div className="login_box">
          <center>
            <button
              className="button_login"
              style={{ width: "60%", height: "40px" }}
              onClick={onSignUp}
            >
              {loading ? <AiOutlineLoading className="loading" /> : "Sign Up"}
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}
