import "./Header.css";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsFillTelephoneFill, BsMenuButton, BsJustify } from "react-icons/bs";
import { BsBellFill, } from "react-icons/bs";
import { MdEmail, MdMenu } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import { AiTwotonePhone } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { NotificationsContext } from "../../Context/NotificationsContext";
import { ADMIN_EMAILS, ADMIN_NUMBER } from "../../constants";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth as firebaseAuth } from "../../firebase";
import NotificationsModal from "../NotificationsModal/NotificationsModal";

const provider = new GoogleAuthProvider();

const signInClick = (setAuth, setIsClicked) => () => {
  console.log("SignIn Clicked");
  setIsClicked(true);
  signInWithPopup(firebaseAuth, provider)
    .then((result) => {
      localStorage.setItem("name", result._tokenResponse.fullName)
      setAuth(result.user);
      setIsClicked(false);
    })
    .catch((error) => {
      console.error("Sign In Failed");
      setIsClicked(false);
    });
};

const signOutClick = (setAuth, setIsClicked) => () => {
  console.log("SignOut Clicked");
  localStorage.clear()
  signOut(firebaseAuth)
    .then((result) => {
      setAuth(null);
      setIsClicked(false);
    })
    .catch((error) => console.error(error));
};

const getButton = (auth, setAuth, isClicked, setIsClicked) => {
  if (auth) {
    const signOut = {
      text: "Sign Out",
      onClick: isClicked ? () => { } : signOutClick(setAuth, setIsClicked),
    };
    const blog = {
      text: "Blog Page",
      to: "/blog",
    };
    if (ADMIN_NUMBER.includes(parseInt(localStorage.getItem("phone")))) {
      return [
        {
          text: "Admin",
          to: "/admin",
        },
        {
          text: "Admin Service",
          to: "/adminservice",
        },
        {
          text: "Admin Notification",
          to: "/adminnotification",
        },
        {
          text: "Enquiries",
          to: "/enquiries",
        },
        blog,
        signOut,
      ];
    } else {
      return [
        {
          text: localStorage.getItem("name"),
          to: "/dashboard",
        },
        blog,
        signOut,
      ];
    }
  } else {
    return [
      // {
      //   text: (
      //     <>
      //       <button className="signin-button" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingBottom: 15, paddingTop: 15, }}>
      //         <img
      //           alt=""
      //           src="assets/images/google.png"
      //           className="hover_click"
      //           style={{ aspectRatio: 1, height: "21px" }}
      //         />
      //         <div className="mobile_hide">Sign In</div>
      //       </button>
      //     </>
      //   ),
      //   onClick: isClicked ? () => { } : signInClick(setAuth, setIsClicked),
      // },
      {
        text: (
          <>
            {" "}
            <button className="signin-button" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingBottom: 15, paddingTop: 15 }}>
              {" "}
              {/* <i className="fa fa-envelope-o" aria-hidden="true"></i>{" "} */}
              <div className="mobile-hide" >Blog Page</div>
            </button>
          </>
        ),
        to: "/blog",

      },
      {
        text: (
          <>
            <button className="signin-button" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingBottom: 15, paddingTop: 15 }}>
              <i className="fa fa-mobile" aria-hidden="true"></i>
              <div className="mobile-hide">Sign In</div>
            </button>
          </>
        ),
        to: "/phonelogin",
      },
    ];
  }
};

export default function Header() {
  const { auth, setAuth, getIdentifier, isAdmin } = useContext(AuthContext);
  const { newNotifications, setNewNotifications } =
    useContext(NotificationsContext);
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [menuClicked, setClicked] = useState(false);
  const rightButton = getButton(auth, setAuth, isClicked, setIsClicked);

  return (
    <>
      {!isAdmin && newNotifications.length ? (
        <NotificationsModal
          isOpen={showModal}
          closeModal={() => setShowModal(false)}
          newNotifications={newNotifications}
          setNewNotifications={setNewNotifications}
          getIdentifier={getIdentifier}
        />
      ) : (
        <>
          <NotificationsModal
          isOpen={showModal}
          closeModal={() => setShowModal(false)}
          newNotifications={newNotifications}
          setNewNotifications={setNewNotifications}
          getIdentifier={getIdentifier}
        /></>
      )}
      <div className="top_header" style={{ alignItems: "center", padding: 15 }}>
        <div className="social_icon_box">
          <div>
            <Link to="https://wa.me/919901579912">
              <IoLogoWhatsapp className="whatsapp social_icons" />
            </Link>
          </div>
          <div>
            <Link to="mailto:contact@finsafegroup.com">
              <HiMail className="mail social_icons" />
            </Link>
          </div>
          <div>
            <Link to="tel:+919705727288">
              <BsFillTelephoneFill className="phone social_icons" />
            </Link>
          </div>
          <div>
            {newNotifications.length && !isAdmin ? (

              <div onClick={() => {
                setShowModal(true);
              }}>
                <BsBellFill className="phone social_icons" />
              </div>

            ) : (
              <div onClick={() => {
                setShowModal(true);
              }}>
                <BsBellFill className="phone social_icons" />
              </div>
            )}
          </div>
        </div>

        {
          window.innerWidth > 700 ? (<div style={{ display: "flex" }}>
            {rightButton.map((rb, index) => {
              return rb.to ? (
                <Link
                  key={index}
                  className="right_button"
                  to={rb.to}
                  style={{ fontWeight: 700 }}
                >
                  {rb.text}
                </Link>
              ) : (
                <div key={index} className="right_button" onClick={rb.onClick}>
                  {rb.text}
                </div>
              );
            })}
          </div>) : (
            <div style={{ display: "flex", alignItems: "flex-end", flexDirection: "column" }}>
              {<MdMenu onClick={() => { setClicked(true) }} className="mail social_icons" />}
              {menuClicked && <div style={{ backgroundColor: "#072f5f", zIndex: 100, top: 0, position: "absolute", zIndex: 100, right: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#072f5f", padding: 20, paddingRight: 100 }}>
                  <MdMenu onClick={() => { setClicked(false) }} style={{ alignSelf: "flex-end" }} className="mail social_icons" />
                  {rightButton.map((rb, index) => {
                    return rb.to ? (
                      <Link
                        onClick={() => { setClicked(false) }}
                        key={index}
                        className="right_button"
                        to={rb.to}
                        style={{ fontWeight: 700, margin: 10 }}
                      >
                        {rb.text}
                      </Link>
                    ) : (
                      <div onClick={() => { setClicked(false) }} style={{ fontWeight: 700, margin: 10 }} key={index} className="right_button" onClick={rb.onClick}>
                        {rb.text}
                      </div>
                    );
                  })}</div>

              </div>}
            </div>
          )
        }
      </div>

      <div className="mid_header">
        <div className="mid-left">
          <Link to="/">
          <img
            src="/assets/images/logo.png"
            alt="logonot loaded"
            className="logo"
          />
          </Link>
        </div>

        <div className="mid-right"></div>
      </div>
    </>
  );
}
