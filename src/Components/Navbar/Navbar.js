import React from "react";
import "./Navbar.css";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import Dropdown from "../Dropdown";
import { Link } from "react-router-dom";

export const addHideMobile = (classString) => {
  return classString + " hide_mobile";
};

export const addHide = (classString) => {
  return classString + " hide";
};

const INITIAL_NAVBAR_STATE = {
  takeExpAdv: false,
  startYoBu: false,
  cfoServ: false,
  loanCap: false,
  busLegSer: false,
  persServ: false,
};

function Navbar() {
  const [collapse, setCollapse] = useState(true);
  const [menu, setMenu] = useState(INITIAL_NAVBAR_STATE);

  let headerClass;

  if (collapse) {
    headerClass = addHideMobile("header_section");
  } else {
    headerClass = "header_section";
  }

  const resetMenu = () => {
    setMenu({ ...INITIAL_NAVBAR_STATE });
    setCollapse(true);
  };

  return (
    <>
      <div className="navbar">
        <div className={headerClass}>
          <div className="navbar_text navbar_text_mobile">
            <Link to="/" onClick={resetMenu} className="navbar_link">
              Home
            </Link>
          </div>
          <div className="navbar_text navbar_text_mobile">
            <Link to="/about" onClick={resetMenu} className="navbar_link">
              About Us
            </Link>
          </div>
          <Dropdown
            isActive={menu["staCom"]}
            setIsActive={() => {
              setMenu({
                ...INITIAL_NAVBAR_STATE,
                staCom: !menu["staCom"],
              });
            }}
            resetMenu={resetMenu}
            headerName="Statutory Compliances"
            headerLink="/statutorycompliances"
            subHeaders={[
              {
                link: "/directtax",
                title: "Direct Tax",
                subHeaders: [
                  { link: "/incometaxreturns", title: "Income Tax returns" },
                  { link: "/taxauditsupport", title: "Tax Audit Support" },
                  {
                    link: "/transferpricingaudit",
                    title: "Transfer Pricing Audit",
                  },
                  { link: "/propertytax", title: "Property Tax" },
                  { link: "/tdstcsreturns", title: "TDS & TCS Returns" },
                  { link: "/advancetax ", title: "Advance tax" },
                ],
              },
              {
                link: "/indirecttax",
                title: "Indirect Tax",
                subHeaders: [
                  { link: "/gstadvisory", title: "GST Advisory" },
                  {
                    link: "/gstmonthlyreturnsfiling",
                    title: "GST monthly Returns filing",
                  },
                  {
                    link: "/gstYearlyreturns",
                    title: "GST Yearly returns & audits",
                  },
                  { link: "/customs", title: "Customs" },
                  { link: "/ieccompliance", title: "IEC compliance" },
                  { link: "/gstEwaybill", title: "GST E-way bill" },
                  { link: "/gsteinvoice", title: "GST E-Invoice" },
                ],
              },
              {
                link: "/companylawservices",
                title: "Company Law Services",
                subHeaders: [
                  {
                    link: "/yearlyreturnsfiling",
                    title: "Yearly Returns filing",
                  },
                  { link: "/regularcompliance", title: "Regular Compliance" },
                  {
                    link: "/llpProprietorship",
                    title: "LLP/Proprietorship to Company Conversion",
                  },
                ],
              },
              {
                link: "/assesments",
                title: "Assesments & Litigations",
                subHeaders: [
                  { link: "/gstaudits", title: "GST audits" },
                  {
                    link: "/incometaxassesments",
                    title: "Income Tax Assesments",
                  },
                  {
                    link: "/noticehandling",
                    title: "Notice handling from GST & Income tax",
                  },
                ],
              },
              {
                link: "/rera",
                title: "Others",
                subHeaders: [
                  { link: "/rera", title: "RERA" },
                  {
                    link: "/llcservices",
                    title: "Labour Law compliance services",
                  },
                  { link: "/pfcompliance", title: "PF Compliance" },
                  { link: "/esicompliance", title: "ESI Compliance" },
                  { link: "/professionaltax", title: "Professional Tax" },
                ],
              },
            ]}
          />
          <Dropdown
            isActive={menu["takeExpAdv"]}
            setIsActive={() => {
              setMenu({
                ...INITIAL_NAVBAR_STATE,
                takeExpAdv: !menu["takeExpAdv"],
              });
            }}
            resetMenu={resetMenu}
            headerName="Take Expert Advice"
            headerLink="/takeexpertadvice"
            subHeaders={[
              {
                link: "/businessadvisory",
                title: "Talk to Business Advisory Analyst",
              },
              {
                link: "/certifiedfinancial",
                title: "Talk to Certified Financial Planner",
              },
              {
                link: "/charteredaccountant",
                title: "Talk to Chartered Accountant",
              },
              { link: "/costaccountant", title: "Talk to Cost Accountant" },
              { link: "/legaladvisor", title: "Talk to Legal Advisor" },
              { link: "/cyberCrime ", title: "Talk to Cyber Crime Expert" },
              {
                link: "/CompanySecretory",
                title: "Talk to Company Secretory",
              },
            ]}
          />
          <Dropdown
            isActive={menu["startYoBu"]}
            setIsActive={() => {
              setMenu({
                ...INITIAL_NAVBAR_STATE,
                startYoBu: !menu["startYoBu"],
              });
            }}
            resetMenu={resetMenu}
            headerName="Start Your Business"
            headerLink="/startyourbusiness"
            subHeaders={[
              {
                link: "/incorporation",
                title: "InCorporation",
                subHeaders: [
                  {
                    link: "/llp",
                    title: "Limited Liability Partnership(LLP)",
                  },
                  { link: "/partnership", title: "Partnership Firm" },
                  { link: "/propreitorship", title: "Propreitorship" },
                  { link: "/trust", title: "Trust" },
                  { link: "/societies", title: "Co-operative Societies" },
                ],
              },

              {
                link: "/statutoryregistration",
                title: "Statutory Registration/Licenses",
                subHeaders: [
                  { link: "/gst", title: "GST" },
                  { link: "/professional", title: "Professional Tax" },
                  { link: "/pan", title: "PAN" },
                  { link: "/tan", title: "TAN" },
                  { link: "/ieccode", title: "IEC Code" },
                  {
                    link: "/msme",
                    title: "MSME Registration(Udayam)",
                  },
                  { link: "/pf", title: "PF ESI" },
                  { link: "/fssai", title: "FSSAI License" },
                  { link: "/trademark", title: "Trademark/Copyright" },
                  { link: "/patent", title: "Patent Registration" },
                ],
              },

              {
                link: "/companyservices",
                title: "Company Services",
                subHeaders: [
                  {
                    link: "/privatelimitedcompany",
                    title: "Private Limited Company",
                  },
                  {
                    link: "/publiclimitedcompany",
                    title: "Public Limited Company",
                  },
                  { link: "/sectioncompany", title: "Section 8(NGO) Company" },
                  { link: "/onepersoncompany", title: "One Person Company" },
                  { link: "/nidhicompany", title: "Nidhi Company" },
                  { link: "/producercompany", title: "Producer Company" },
                  { link: "/dormantcompany", title: "Dormant Company" },
                ],
              },
            ]}
          />
          <Dropdown
            isActive={menu["cfoServ"]}
            setIsActive={() => {
              setMenu({ ...INITIAL_NAVBAR_STATE, cfoServ: !menu["cfoServ"] });
            }}
            resetMenu={resetMenu}
            headerName="CFO Services"
            headerLink="/CfoServices"
            subHeaders={[
              {
                link: "/BusinessTransaction",
                title: "Business Transaction Advisory",
              },
              { link: "/MergersAcquisitions", title: "Mergers & Acquisitions" },
              { link: "/JointVentures", title: "Joint Ventures" },
              { link: "/CapitalStructuring", title: "Capital Structuring" },
              { link: "/Bankingrelationship", title: "Banking relationship" },
              {
                link: "/BusinessPlanning",
                title: "Business Planning & Forcasting",
              },
              { link: "/WorkingCapital", title: "Working Capital Management" },
              { link: "/ManagementReporting", title: "Management Reporting" },
              {
                link: "/Investorrelationship",
                title: "Investor relationship management",
              },
              {
                link: "/InternalSystem",
                title: "Internal System & Processes design(SOPs)",
              },
            ]}
          />
          <Dropdown
            isActive={menu["accAud"]}
            setIsActive={() => {
              setMenu({
                ...INITIAL_NAVBAR_STATE,
                accAud: !menu["accAud"],
              });
            }}
            resetMenu={resetMenu}
            headerName="Accounts & Audit"
            headerLink="/accountsaudit"
            subHeaders={[
              {
                link: "/accounts",
                title: "Accounts",
                subHeaders: [
                  {
                    link: "/bookkeeping",
                    title: "Bookkeeping & Record maintenance",
                  },
                  { link: "/payroll", title: "Payroll Management" },
                  { link: "/vendor", title: "Vendor Payable Management" },
                  {
                    link: "/receivable",
                    title: "Accounts Receivable Management",
                  },
                  {
                    link: "/assetsaccounting",
                    title: "Asset Accounting & Management",
                  },
                  { link: "/hrfunction ", title: "HR Function Suppport" },
                  {
                    link: "/quarterly",
                    title: "Quarterly & Yearly Financials Preparation",
                  },
                  { link: "/regulartax ", title: "Regular Tax returns filing" },
                  {
                    link: "/secretarial",
                    title: "Company Secretarial Services",
                  },
                ],
              },
              {
                link: "/audit",
                title: "Audit",
                subHeaders: [
                  {
                    link: "/statutoryauditsupport",
                    title: "Statutory audit Support",
                  },
                  { link: "/taxaudit", title: "Tax Audit Management" },
                  { link: "/internalaudits", title: "Internal Audits" },
                  { link: "/forensicaudits", title: "Forensic Audits" },
                  { link: "/stockaudit", title: "Stock Audit" },
                ],
              },
            ]}
          />
          <Dropdown
            isActive={menu["busLegSer"]}
            setIsActive={() => {
              setMenu({
                ...INITIAL_NAVBAR_STATE,
                busLegSer: !menu["busLegSer"],
              });
            }}
            resetMenu={resetMenu}
            headerName=" Business legal Services "
            headerLink="/businesslegalservices"
            subHeaders={[
              {
                link: "/jointventure",
                title: "Joint Development & Joint Venture agreement drafting",
              },
              {
                link: "/businesslegaldrafting",
                title: "Business Legal agreement drafting",
              },
              { link: "/landtitle", title: "Land Title Due diligence" },
              { link: "/landlitigation", title: "Land Litigation assistance" },
              {
                link: "/customeragreement",
                title: "Customer Agreement drafting",
              },
              {
                link: "/customerlitigation",
                title: "Customer litigation support",
              },
            ]}
          />
          <Dropdown
            isActive={menu["loanCap"]}
            setIsActive={() => {
              setMenu({ ...INITIAL_NAVBAR_STATE, loanCap: !menu["loanCap"] });
            }}
            resetMenu={resetMenu}
            headerName="Loans & Capital"
            headerLink="/loanscapital"
            subHeaders={[
              { link: "/talktoexperts", title: "Talk to Expert" },
              { link: "/workingcapitalloans", title: "Working Capital Loans" },
              { link: "/businesstermloans", title: "Business Term Loans" },
              { link: "/loansassets", title: "Loans on Assets" },
              { link: "/msmeloans", title: "MSME Loans" },
              {
                link: "/projectreportspreparation",
                title: "Project report preparation",
              },
              {
                link: "/loandocumentationsupport",
                title: "Loan Documentation Support",
              },
            ]}
          />
          <Dropdown
            isActive={menu["persServ"]}
            setIsActive={() => {
              setMenu({ ...INITIAL_NAVBAR_STATE, persServ: !menu["persServ"] });
            }}
            resetMenu={resetMenu}
            headerName="Personal Services"
            headerLink="/personalservice"
            subHeaders={[
              { link: "/talktoexperts", title: "Talk to Expert" },
              { link: "/investment", title: "Investment planning" },
              { link: "/estate", title: "Estate management services" },
              { link: "/tax", title: "Tax Planning" },
              { link: "/incometax", title: "Income tax returns" },
              { link: "/individual", title: "Individual Accounts maintenance" },
            ]}
          />

          <div className="navbar_text navbar_text_mobile">
            <Link to="/contact" onClick={resetMenu} className="navbar_link">
              Contact Us
            </Link>
          </div>
        </div>
        <MdMenu
          className="navbar_icon"
          onClick={() => {
            setCollapse(!collapse);
          }}
        />
      </div>
    </>
  );
}

export default Navbar;
