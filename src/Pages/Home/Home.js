import React, { useEffect, useState } from "react";
import shortid from "shortid";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ServiceCard from "../../Components/ServiceCard";
import { GrBusinessService, GrServices, GrServicePlay } from "react-icons/gr";
import { FcServices } from "react-icons/fc";
import { FaServicestack } from "react-icons/fa";
import { getAllDocs } from "../../API/readDoc";
import { SCROLL_NOTIF } from "../../constants";
import {
  MdMiscellaneousServices,
  MdOutlineHomeRepairService,
  MdOutlineBusiness,
} from "react-icons/md";

import "@splidejs/react-splide/css";
import "./Home.css";
import { FiDollarSign } from 'react-icons/fi';
import{RiMoneyDollarBoxLine,RiCopyrightFill} from "react-icons/ri";
import { FaUserTie,FaBriefcase} from 'react-icons/fa';
import {AiFillBank,AiOutlineFileDone,AiOutlineAudit } from "react-icons/ai";
import { FaBusinessTime} from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectList = [
  {
    // title: "Business Services",
    image: "assets/images/banners/business1.png",
    // description:
      // "FINSAFE efficient process such as payroll, AP & AR will help reduce operations cost signficantly.",
  },
  {
    // title: "CFO Services",
    image: "assets/images/banners/business2.png",
    // description:
      // "Freelancing Chief Financial Officer services CFO. Finsafe CFO services,strong financial growth just like large MNCs.",
  },
  {
    // title: "Loan Services",
    image: "./assets/images/banners/business3.png",
    // description:
      // "Finsafe maintains with banks and Financial institutions which helps to raise required growth capital for your organisation",
  },
  {
    // title: "Transaction Advisory",
    image: "./assets/images/banners/business4.png",
    // description:
      // "Finsafe experts will help you in drafting and vetting business agreements which help you enter into strong business relationships",
  },
  {
    // title: "Tax Planning",
    image: "assets/images/banners/business5.png",
    // description:
      // "Our Tax Experts will help implement best Tax best planning for your organisation.",
  },
  {
    // title: "Statutory Compliances",
    image: "assets/images/banners/business6.png",
    // description:
      // "Our experienced team ensures your organisation is always compliant (GST, RERA, Income tax and Companies act etc.)",
  },
  {
    // title: "Financial planning",
    image: "assets/images/banners/business7.png",
    // description:
      // "FINSAFE's Certified financial planners builds a robust plan to help achive your financial targets",
  },
  // {
  //   title: "Investment",
  //   image: "assets/images/banners/income_tax.png",
  //   description:
  //     "Our relationship with large financial institutions ensure highest value loan at lowest possible returns	",
  // },
  // {
  //   title: "Wealth Management services",
  //   image: "assets/images/banners/wealth_Mangement_service.png",
  //   description:
  //     "Our team of Experts ensures your wealth, assets are preserved and passed on to Generations to come.	",
  // },
];

const SERVICE_CARDS_1 = [
  {
    title: "Start Your Business",
    icon: GrBusinessService,
    image: "assets/images/cards/1.png",
    color1: "#BB710D",
    color2: "#BB710D",
    link: "/businesslegalservices",
  },
  {
    title: "Get Expert Financial advice",
    image: "assets/images/cards/2.png",
    icon: MdMiscellaneousServices,
    color1: "#BF570D",
    color2: "#BF570D",
    link: "/businesslegalservices",
  },
  {
    title: "Raise Capital - Loans & Equity",
    image: "assets/images/cards/3.png",
    icon: GrServices,
    color1: "#CC4922",
    color2: "#CC4922",
    link: "/loanscapital",
  },
  {
    title: "File your Income tax returns",
    image: "assets/images/cards/4.png",
    icon: FaServicestack,
    color1: "#BC331C",
    color2: "#BC331C",
    link: "/incometax",
  },
  {
    title: "GST compliances",
    image: "assets/images/cards/5.png",
    icon: GrServicePlay,
    color1: "#C2701C",
    color2: "#C2701C",
    link: "/ieccompliance",
  },
  {
    title: "Personal Financial planner",
    image: "assets/images/cards/6.png",
    icon: MdMiscellaneousServices,
    color1: "#BC331C",
    color2: "#C2701C",
    link: "/pfcompliance",
  },
  {
    title: "Virtual CFO services",
    image: "assets/images/cards/7.png",
    icon: MdOutlineHomeRepairService,
    color1: "#BF570D",
    color2: "#BF570D",
    link: "/CfoServices",
  },
  {
    title: " Business Transaction Advisory",
    image: "assets/images/cards/8.png",
    icon: MdOutlineBusiness,
    color1: "#CC4922",
    color2: "#CC4922",
    link: "/BusinessTransaction",
  },
];

const SERVICE_CARDS_2 = [
  {
    title: "Loan Documentation Support",
    icon: GrBusinessService,
    image: "assets/images/cards1/11.png",
    color1: "#CC4922",
    color2: "#CC4922",
    link: "/loandocumentationsupport",
  },
  {
    title: "Joint Ventures",
    icon: MdMiscellaneousServices,
    image: "assets/images/cards1/12.png",
    color1: "#BF4827",
    color2: "#BF4827",
    link: "/JointVentures",
  },
  {
    title: "Investment planning",
    icon: GrServices,
    image: "assets/images/cards1/13.png",
    link: "/investment",
    color1: "#BF570D",
    color2: "#BF570D",
  },
  {
    title: "Payroll Management",
    icon: FaServicestack,
    image: "assets/images/cards1/14.png",
    link: "/payroll",
    color1: "#BB710D",
    color2: "#BB710D",
  },
  {
    title: "GST E-Way Bill",
    icon: GrServicePlay,
    image: "assets/images/cards1/15.png",
    link: "/gstEwaybill",
    color1: "#BC331C",
    color2: "#BC331C",
  },
  {
    title: "Investor Relationship Management",
    icon: MdMiscellaneousServices,
    image: "assets/images/cards1/16.png",
    link: "/Investorrelationship",
    color1: "#BF570D",
    color2: "#BF570D",
  },
  {
    title: "Land Title Due Diligence",
    icon: MdOutlineHomeRepairService,
    image: "assets/images/cards1/17.png",
    link: "/landtitle",
    color1: "#CC4922",
    color2: "#CC4922",
  },
  {
    title: "Trademark/Copyright",
    icon: RiCopyrightFill,
    image: "assets/images/cards1/18.png",
    link: "/trademark",
    color1: "#E29513",
    color2: "#E29513",
  },
];

const SPLIDE_CARP_OPTS = {
  gap: "0px",
  perPage: 4,
  breakpoints: {
    500: {
      perPage: 1,
    },
    840: {
      perPage: 2,
    },
    1000: {
      perPage: 3,
    },
  },
};

export default function Home() {
  const [scrollText, setText] = useState("");
  useEffect(() => {
    getAllDocs(SCROLL_NOTIF)
      .then(data => {
        console.log(data);
        setText(data[0].text);
      }).catch(error => console.error(error))
  }, [])
  return (
    <>
      <Splide
        aria-label="Home Slide"
        options={{ autoplay: true, width: "100%" }}
      >
        {ProjectList.map((project) => {
          return (
            <SplideSlide key={shortid.generate()}>
              <div className="splider_box">
                <img src={project.image} alt="" className="slider_image" />
                {/* <div className="text_overlay overlay_text">
                  <h2 className="banner-title">{project.title}</h2>
                  <p className="banner-description">{project.description}</p>
                </div> */}
              </div>
            </SplideSlide>
          );
        })}
      </Splide>

      <h1 style={{ color: "#923300" }}>
        <center> Our Popular Services</center>
      </h1>
      {/* <Splide options={SPLIDE_CARP_OPTS}>
        {SERVICE_CARDS_1.map((serviceCard) => {
          return (
            <SplideSlide key={shortid.generate()}>
              <ServiceCard
                title={serviceCard.title}
                ICON={serviceCard.icon}
                link={serviceCard.link}
                color1={serviceCard.color1}
                color2={serviceCard.color2}
                image={serviceCard.image}
              />
            </SplideSlide>
          );
        })}
      </Splide> */}
      <div className="ours">
        <div className="our1">
        <Link to="/startyourbusiness" style={{textDecoration:"none",fontweight:"1000",color:"white"}}><center>
          <i className="ouricons">
              <FaBusinessTime />
          </i>
            <p>Start Your Business</p>
          </center>
        </Link> 
        </div>
        <div class="our2">
        <Link to="/talktoexperts" style={{textDecoration:"none",fontweight:"1000",color:"white"}}><center>
            <i className="ouricons">
              <RiMoneyDollarBoxLine />
            </i>
            <p>Get Experts financial advice</p>
          </center></Link>
        </div>
        <div class="our3">
        <Link to="/loanscapital" style={{textDecoration:"none",fontweight:"1000",color:"white"}}> <center>
            <i className="ouricons">
              <AiFillBank />
            </i>
            <p>Raise Capital - Loans & Equity</p>
          </center></Link>
        </div>
        <div class="our4">
          <Link to="/incometax" style={{textDecoration:"none",fontweight:"1000",color:"white"}}><center>
            <i className="ouricons">
              <AiOutlineFileDone/>
            </i>
            <p>File your Income tax returns</p>
          </center>
          </Link>
        </div>
        <div class="our5">
        <Link to="/ieccompliance" style={{textDecoration:"none",fontweight:"1000",color:"white"}}>
          <center>
            <i className="ouricons">
              <AiOutlineAudit />
            </i>
            <p>GST compliances</p>
          </center></Link>
        </div>
        <div class="our6">
        <Link to="/businesslegalservices" style={{textDecoration:"none",fontweight:"1000",color:"white"}}>
          <center>
            <i className="ouricons">
              <FiDollarSign/>
            </i>
            <p>Personal Financial planner</p>
          </center></Link>
        </div>
        <div class="our7">
        <Link to="/CfoServices" style={{textDecoration:"none",fontweight:"1000",color:"white"}}>
          <center>
            <i className="ouricons">
              <FaUserTie/>
            </i>
            <p>Virtual CFO services</p>
          </center></Link>
        </div>
        <div class="our8">
        <Link to="/BusinessTransaction" style={{textDecoration:"none",fontweight:"1000",color:"white"}}>
          <center>
            <i className="ouricons">
              <FaBriefcase />
            </i>
            <p>Business Transaction Advisory</p>
          </center></Link>
        </div>
      </div>

      <div className="scroll-left">
        <p>
          {/* Finsafe provides financial planning and mentorship services
          Individuals and wants to be trusted partner in their sucessful
          financial journey. */}
          {scrollText}
        </p>
      </div>

      <h1 style={{ color: "#923300" }}>
        <center>Frequently Used Services</center>
      </h1>
      <Splide options={SPLIDE_CARP_OPTS}>
        {SERVICE_CARDS_2.map((serviceCard) => {
          return (
            <SplideSlide key={shortid.generate()}>
              <ServiceCard
                style={{ color: "#fff" }}
                title={serviceCard.title}
                ICON={serviceCard.icon}
                link={serviceCard.link}
                color1={serviceCard.color1}
                color2={serviceCard.color2}
                image={serviceCard.image}
              />
            </SplideSlide>
          );
        })}
      </Splide>

      {/*cilent silder*/}
    </>
  );
}
