import React, { useState } from "react";
import "./Contact.css";
import { insertNewDoc } from "../../API/readDoc";

function Contact() {
  const [dataToSend, setData] = useState({});
  const [err, setErr] = useState(null);

  const submitRes = () => {
    if (!dataToSend.name || dataToSend.name === "") {
      setErr("Please fill the name field");
      return;
    } else if (!dataToSend.email || dataToSend.email === "") {
      setErr("Please fill the email field");
      return;
    } else if (!dataToSend.detail || dataToSend.detail === "") {
      setErr("Please fill the message field");
      return;
    }
    dataToSend.date = Date.now();
    setErr(null);
    insertNewDoc("user_enquiry", dataToSend);
    alert("Your response has been recorded successfully, Finsafe Administration will contact you soon");
  }

  return (
    <div>
      <div class="contact_section">
        <div style={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: "wrap", backgroundImage: "url('assets/images/contact.jpeg')", }}>

          <div class="contact_inside1">

            <center><h1 className="contact-boxheader">Get In Touch</h1></center>

            <center><h3 className="contact-boxtext1" style={{ backgroundcolor: "#aaa", paddingTop: "60px" }}>
              <i
                style={{ padding: "10px 10px 10px 10px", color: "lightblue" }}
                className="fa fa-mobile"
                aria-hidden="true"
              ></i>
              <u className="contact-boxtext">Phone</u> <div style={{ color: "white" }}>+91 9901576612</div>
            </h3>

              <h3 className="contact-boxtext1">
                <i
                  style={{ padding: "10px 10px 10px 10px", color: "lightblue" }}
                  className="fa fa-envelope-o"
                  aria-hidden="true"
                ></i>
                <u className="contact-boxtext">Email</u> <div style={{ color: "white" }}>contact@finsafegroup.com
                  <br></br>admin@finsafegroup.com
                </div>
              </h3>

              <h3 className="contact-boxtext1">
                <i
                  style={{ padding: "10px 10px 10px 10px", color: "lightblue" }}
                  className="fa fa-map-marker"
                  aria-hidden="true"
                ></i>
                <u className="contact-boxtext">Address</u>
                <address style={{ color: "white" }}>
                  No.1574/22,2nd Cross,<br></br>
                  HBCS Layout<br></br>
                  Ramanjaneya Nagar,Uttarahalli<br></br>
                  Bangalore-560061<br></br>
                  Karnataka, India<br></br>
                </address>
              </h3></center>

          </div>

          <div class="contact_inside1">
            <center><h1 className="contact-boxheader">Google Map Address</h1></center>
            <iframe
              title="company_location"
              src="https://maps.google.com/maps?q=No.1574/22,2nd+Cross,HBCS+Layout+Ramanjaneya+Nagar,Uttarahalli+Bangalore-560061+Karnataka,+India&output=embed"
              width="100%"
              height="450"
              frameborder="0"
              style={{ border: "0" }}
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <div class="contact_inside" style={{ backgroundcolor: "#ccc", }}>
          <h1 className="contact-boxheader">Talk to us!</h1>
          <h2>Feel Free to contact us any time. We will get back to you as soon as we can!</h2>
          <input
            onChange={(e) => { dataToSend.name = e.target.value }}
            type="text"
            className="form-control form-group"
            placeholder="Name"
          />
          <input
            onChange={(e) => { dataToSend.email = e.target.value }}
            type="text"
            className="form-control form-group"
            placeholder="Email"
          />
          <textarea
            onChange={(e) => { dataToSend.detail = e.target.value }}
            class="form-control form-group"
            placeholder="Message"
          ></textarea>
          {err && <div style={{ fontSize: 12, color: "red" }}>{err}</div>}

          <button onClick={() => { submitRes() }} class="contact_form_submit">Send</button>
        </div>

        <div class="contact_inside" style={{ backgroundcolor: "#ddd" }}>
          <img
            src="assets/images/contactUs.jpeg"
            alt="contactimage"
            width="100%"
          />
        </div>
      </div>


    </div>
  )
}

export default Contact