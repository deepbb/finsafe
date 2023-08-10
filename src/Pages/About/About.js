import "./About.css";

export default function About() {
  return (
    <div>
      <div style={{ position: "relative", backgroundColor: "#e6e6e6" }}>
        <img src="assets/images/about.png" width="100%" />
        {/* <h1 style={{position:"absolute", top:"45%", left:"40%"}}>About Us</h1>*/}
      </div>

      <div className="banner_section">
        <div className="banner_text">
          <h1 style={{ textAlign: "left" }}>
            Revealing the Inner Workings <br></br>of Our Success
          </h1>
        </div>
        <div className="banner_text1">
          <div className="help_txt">
            <p style={{ textAlign: "justify" }}>
              {" "}
              Welcome to Finsafe, a leading financial solutions provider focused
              on helping small and medium-sized businesses (MSMEs) achieve
              growth and success through effective financial planning and
              mentorship. At Finsafe, we understand the challenges faced by
              MSMEs in managing their finances and unlocking their full
              potential. Our mission is to provide customized financial
              solutions that address the unique needs of each business we serve,
              while also offering expert guidance and support to individuals
              seeking to achieve their financial goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
