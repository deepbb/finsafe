import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer" style={{ display: "flex", flexDirection: "column" }}>
      <div className="row">
        <div className="col">
          <h1 className="footer_companyname">Finsafe Financial Solutions Private Limited</h1>
          {/*<img
            src="assets/images/logo.png"
            alt="Footer Logo"
            className="footer_logo"
  />*/}
          <div className="footer-address">
            <h4 className="footer-address">
              <h2><i
                style={{ padding: "10px 10px 10px 10px", color: "#923304" }}
                className="fa fa-map-marker"
                aria-hidden="true"
              ></i>
                <u className="boxtext">Address</u></h2>
              No.1574/22,2nd Cross,<br></br>
              HBCS Layout<br></br>
              Ramanjaneya Nagar,Uttarahalli<br></br>
              Bangalore-560061<br></br>
              Karnataka, India<br></br>
            </h4>
          </div>
        </div>
        <div className="col">
          <h3>
            Popular Services{" "}
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <ul className="footer_list">
            <li>
              <Link to="/takeexpertadvice">Take Expert Advice</Link>
            </li>
            <li>
              <Link to="/startyourbusiness">Start Your Business</Link>
            </li>
            <li>
              <Link to="/CfoServices">CFO Services</Link>
            </li>
            <li>
              <Link to="/accountsaudit">Accounts & Audit</Link>
            </li>
            <li>
              <Link to="/loanscapital">Loans & Capital</Link>
            </li>
            <li>
              <Link to="/businesslegalservices">Business Legal Services</Link>
            </li>
            <li>
              <Link to="/statutorycompliances">Statutory Compliances</Link>
            </li>
            <li>
              <Link to="/personalservice">Personal Services</Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <h3>
            COMPANY{" "}
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <ul className="footer_list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <h3>
            Terms & Policies
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <ul className="footer_list">
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Terms & Conditions</Link>
            </li>
          </ul>
          <div className="col">
            <div className="social-icons">
              <Link to="https://www.facebook.com/finsafegroupblr">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="https://twitter.com/finsafegroupblr">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="https://wa.me/919901579912">
                <i className="fab fa-whatsapp"></i>
              </Link>
              <Link to="https://www.instagram.com/finsafegroupblr/">
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="line_break"></div>
      <div className="copyright" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, margin: 10 }}>
        <div className="color_white">@Developed By AWT</div>

        <div className="color_white">
          Copyright © 2023 <Link to="/index">Finsafe</Link>
        </div>
      </div>
    </div>
  );
}