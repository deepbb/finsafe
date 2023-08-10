// import "./App.css";
import { GlobalLoading } from "react-global-loading";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Dashboard from "./Pages/Dashboard";
import Footer from "./Components/Footer";
import CfoServices from "./Pages/CfoServices/CfoServices";
import Blog from "./Pages/Blog";
import Login from "./Pages/Login";

import {
  Bankingrelationship,
  BusinessTransaction,
  CapitalStructuring,
  InternalSystem,
  Investorrelationship,
  JointVentures,
  WorkingCapital,
  BusinessPlanning,
  ManagementReporting,
  MergersAcquisitions,
} from "./Pages/CfoServices";

import StartYourBusiness from "./Pages/StartYourBusiness";

import {
  DormantCompany,
  NidhiCompany,
  OnePersonCompany,
  PrivateLimitedCompany,
  ProducerCompany,
  PublicLimitedCompany,
  SectionCompany,
  CompanyServices,
} from "./Pages/StartYourBusiness/CompanyServices";

import {
  Fssai,
  Gst,
  IecCode,
  Msme,
  Pan,
  Patent,
  Pf,
  Tan,
  Trademark,
  StatutoryRegistration,
  Professional,
} from "./Pages/StartYourBusiness/StatutoryRegistration";

import {
  Incorporation,
  Llp,
  Partnership,
  Propreitorship,
  Societies,
  Trust,
} from "./Pages/StartYourBusiness/Incorporation";

import LoansCapital from "./Pages/LoansCapital/LoansCapital";

import {
  BusinessTermLoans,
  LoanAssets,
  LoanDocumentationSupport,
  MsmeLoans,
  ProjectReportsPreparation,
  TalkToExperts,
  WorkingCapitalLoans,
} from "./Pages/LoansCapital";

import {
  BusinessAdvisory,
  CertifiedFinancial,
  CharteredAccountant,
  CompanySecretory,
  CostAccountant,
  CyberCrime,
  LegalAdvisor,
} from "./Pages/TakeExpertAdvice";

import AccountsAudit from "./Pages/AccountsAudit";

import {
  Audit,
  ForensicAudits,
  InternalAudits,
  StatutoryauditSupport,
  StockAudit,
  TaxAudit,
} from "./Pages/AccountsAudit/Audit";

import {
  Accounts,
  AssetsAccounting,
  Bookkeeping,
  HrFunction,
  Payroll,
  Quarterly,
  Receivable,
  RegularTax,
  Secretarial,
  Vendor,
} from "./Pages/AccountsAudit/Accounts";

import StatutoryCompliances from "./Pages/StatutoryCompliances";
import {
  GSTaudits,
  IncomeTaxAssesments,
  Noticehandling,
  Assesments,
} from "./Pages/StatutoryCompliances/Assesments";

import {
  LlpProprietorship,
  RegularCompliance,
  YearlyReturnsfiling,
  CompanyLawServices,
} from "./Pages/StatutoryCompliances/CompanyLawServices";

import {
  DirectTax,
  AdvanceTax,
  IncomeTaxReturns,
  PropertyTax,
  TaxAuditSupport,
  TdsTcsReturns,
  TransferPricingAudit,
} from "./Pages/StatutoryCompliances/DirectTax";

import {
  Customs,
  GSTAdvisory,
  GSTEInvoice,
  GSTEwaybill,
  GSTmonthlyReturnsfiling,
  GSTYearlyreturns,
  IECcompliance,
  IndirectTax,
} from "./Pages/StatutoryCompliances/IndirectTax";

import {
  ESICompliance,
  LLCServices,
  Pfcompliance,
  ProfessionalTax,
  Rera,
  Others,
} from "./Pages/StatutoryCompliances/Others";

import BusinessLegalServices from "./Pages/BusinessLegalServices";
import {
  BusinessLegalDrafting,
  CustomerAgreement,
  CustomerLitigation,
  JointVenture,
  LandLitigation,
  LandTitle,
} from "./Pages/BusinessLegalServices";
import PersonalService from "./Pages/Personalservice/Personalservice";

import {
  Investment,
  Estate,
  Tax,
  Individual,
  IncomeTax,
} from "./Pages/Personalservice/index";

import About from "./Pages/About/About";
import Contact from "./Pages/Contact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import TakeExpertAdvice from "./Pages/TakeExpertAdvice";
import SignUp from "./Pages/SignUp";
import PhoneLogin from "./Pages/PhoneLogin";
import AdminService from "./Pages/Adminservice/Adminservice"
import AdminNotification from "./Pages/AdminNotification";
import { NotificationsContextProvider } from "./Context/NotificationsContext";
import PostCreate from "./Pages/PostCreate";
import PostShow from "./Pages/PostShow";
import PostEdit from "./Pages/PostEdit";
import { useState } from "react";
import { insertNewDoc } from "./API/readDoc";
import Enquiries from "./Pages/Enquiries";

const Base = () => {
  const [showEnquiryModal, setModal] = useState(false);
  const [dataToSend, setData] = useState({});
  const [err, setErr] = useState(null);

  const submitRes = () => {
    if (!dataToSend.name || dataToSend.name === "") {
      setErr("Please fill the name field");
      return;
    } else if (!dataToSend.phone) {
      setErr("Please fill the mobile field with a 10 digit mobile number");
      return
    } else if (!dataToSend.email || dataToSend.email === "") {
      setErr("Please fill the email field");
      return;
    } else if (!dataToSend.city || dataToSend.city === "") {
      setErr("Please fill the city field");
      return;
    } else if (!dataToSend.state || dataToSend.state === "") {
      setErr("Please fill the state field");
      return;
    } else if (!dataToSend.detail || dataToSend.detail === "") {
      setErr("Please fill the detail field");
      return;
    }
    dataToSend.date = Date.now();
    setErr(null);
    setModal(false);
    insertNewDoc("user_enquiry", dataToSend);
    alert("Your response has been recorded successfully, Finsafe Administration will contact you soon");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {showEnquiryModal &&
        <div style={{ width: parseInt(window.innerWidth) > 600 ? "20%" : "90%", backgroundColor: "#072f5f", position: "fixed", zIndex: 111, alignSelf: "center", display: "flex", flexDirection: "column", padding: 20, borderRadius: 10, marginLeft: parseInt(window.innerWidth) > 600 ? 20 : 0 }}>
          <div style={{ display: "flex", flexDirection: "row", marginBottom: 20, justifyContent: "space-between" }}>
            <div style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>Enquiry Details</div>
            <div style={{ fontWeight: "bold", padding: 5, color: "#072f5f", backgroundColor: "white", borderRadius: 8 }} onClick={() => { setModal(false) }}>Close</div>
          </div>
          <input onChange={(e) => { dataToSend.name = e.target.value }} style={{ marginBottom: 15, borderRadius: 10, backgroundColor: "white", height: 30, padding: 5 }} placeholder="Customer Name"></input>
          <input onChange={(e) => { dataToSend.org = e.target.value }} style={{ marginBottom: 15, borderRadius: 10, backgroundColor: "white", height: 30, padding: 5 }} placeholder="Organisation Name"></input>
          <input onChange={(e) => { dataToSend.email = e.target.value }} style={{ marginBottom: 15, borderRadius: 10, backgroundColor: "white", height: 30, padding: 5 }} placeholder="Email"></input>
          <input type="number" onChange={(e) => { dataToSend.phone = e.target.value }} style={{ marginBottom: 15, borderRadius: 10, backgroundColor: "white", height: 30, padding: 5 }} placeholder="Phone"></input>
          <input onChange={(e) => { dataToSend.city = e.target.value }} style={{ marginBottom: 15, borderRadius: 10, backgroundColor: "white", height: 30, padding: 5 }} placeholder="City"></input>
          <input onChange={(e) => { dataToSend.state = e.target.value }} style={{ marginBottom: 15, borderRadius: 10, backgroundColor: "white", height: 30, padding: 5 }} placeholder="State"></input>
          <input onChange={(e) => { dataToSend.detail = e.target.value }} style={{ marginBottom: 15, borderRadius: 10, backgroundColor: "white", height: 70, padding: 5 }} placeholder="Please put your enquiry details here"></input>
          {err && <div style={{ fontSize: 12, color: "white" }}>{err}</div>}
          <div style={{ fontWeight: "bold", padding: 5, color: "#072f5f", backgroundColor: "white", borderRadius: 8, width: "fit-content", alignSelf: "center" }} onClick={() => { submitRes() }}>Submit</div>
        </div>}

      {!showEnquiryModal && <div onClick={() => { setModal(true) }} style={{ textAlign: "center", width: 100, padding: 10, backgroundColor: "#072f5f", color: "white", top: 280, zIndex: 100, right: -40, position: "fixed", transform: "rotate(-90deg)", borderRadius: 10 }}>
        Talk to us
      </div>}
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/adminnotification", element: <AdminNotification /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/phonelogin", element: <PhoneLogin /> },
      {
        path: "/takeexpertadvice",
        element: <TakeExpertAdvice />,
      },
      {
        path: "/businessadvisory",
        element: <BusinessAdvisory />,
      },
      {
        path: "/certifiedfinancial",
        element: <CertifiedFinancial />,
      },
      {
        path: "/charteredaccountant",
        element: <CharteredAccountant />,
      },
      {
        path: "/companysecretory",
        element: <CompanySecretory />,
      },
      {
        path: "/costaccountant",
        element: <CostAccountant />,
      },
      {
        path: "/cybercrime",
        element: <CyberCrime />,
      },
      {
        path: "/legaladvisor",
        element: <LegalAdvisor />,
      },
      {
        path: "/cfoservices",
        element: <CfoServices />,
      },
      {
        path: "/bankingrelationship",
        element: <Bankingrelationship />,
      },
      {
        path: "/businesstransaction",
        element: <BusinessTransaction />,
      },
      {
        path: "/loanscapital",
        element: <LoansCapital />,
      },
      {
        path: "/businesstermloans",
        element: <BusinessTermLoans />,
      },
      {
        path: "/talktoexperts",
        element: <TalkToExperts />,
      },
      {
        path: "/loandocumentationsupport",
        element: <LoanDocumentationSupport />,
      },
      {
        path: "/loansassets",
        element: <LoanAssets />,
      },
      {
        path: "/msmeloans",
        element: <MsmeLoans />,
      },
      {
        path: "/projectreportspreparation",
        element: <ProjectReportsPreparation />,
      },
      {
        path: "/capitalstructuring",
        element: <CapitalStructuring />,
      },
      {
        path: "/internalsystem",
        element: <InternalSystem />,
      },
      {
        path: "/businessplanning",
        element: <BusinessPlanning />,
      },
      {
        path: "/investorrelationship",
        element: <Investorrelationship />,
      },
      {
        path: "/workingcapital",
        element: <WorkingCapital />,
      },
      {
        path: "/workingcapitalloans",
        element: <WorkingCapitalLoans />,
      },
      {
        path: "/jointventures",
        element: <JointVentures />,
      },
      {
        path: "/managementreporting",
        element: <ManagementReporting />,
      },
      {
        path: "/mergersacquisitions",
        element: <MergersAcquisitions />,
      },
      {
        path: "/personalservice",
        element: <PersonalService />,
      },
      {
        path: "/investment",
        element: <Investment />,
      },
      {
        path: "/estate",
        element: <Estate />,
      },
      {
        path: "/incometax",
        element: <IncomeTax />,
      },
      {
        path: "/tax",
        element: <Tax />,
      },
      {
        path: "/estate",
        element: <Estate />,
      },
      {
        path: "/individual",
        element: <Individual />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/businesslegalservices",
        element: <BusinessLegalServices />,
      },
      {
        path: "/businesslegaldrafting",
        element: <BusinessLegalDrafting />,
      },
      {
        path: "/customeragreement",
        element: <CustomerAgreement />,
      },
      {
        path: "/customerlitigation",
        element: <CustomerLitigation />,
      },
      {
        path: "/jointventure",
        element: <JointVenture />,
      },
      {
        path: "/landlitigation",
        element: <LandLitigation />,
      },
      {
        path: "/landTitle",
        element: <LandTitle />,
      },
      {
        path: "/dormantcompany",
        element: <DormantCompany />,
      },
      {
        path: "/nidhicompany",
        element: <NidhiCompany />,
      },
      {
        path: "/onepersoncompany",
        element: <OnePersonCompany />,
      },
      {
        path: "/privatelimitedcompany",
        element: <PrivateLimitedCompany />,
      },
      {
        path: "/producercompany",
        element: <ProducerCompany />,
      },
      {
        path: "/Publiclimitedcompany",
        element: <PublicLimitedCompany />,
      },
      {
        path: "/sectioncompany",
        element: <SectionCompany />,
      },
      {
        path: "/startyourbusiness",
        element: <StartYourBusiness />,
      },
      {
        path: "/companyservices",
        element: <CompanyServices />,
      },
      {
        path: "/trademark",
        element: <Trademark />,
      },
      {
        path: "/tan",
        element: <Tan />,
      },
      {
        path: "/statutoryregistration",
        element: <StatutoryRegistration />,
      },
      {
        path: "/pf",
        element: <Pf />,
      },
      {
        path: "/patent",
        element: <Patent />,
      },
      {
        path: "/pan",
        element: <Pan />,
      },
      {
        path: "/Msme",
        element: <Msme />,
      },
      {
        path: "/ieccode",
        element: <IecCode />,
      },
      {
        path: "/gst",
        element: <Gst />,
      },
      {
        path: "/fssai",
        element: <Fssai />,
      },
      {
        path: "/llp",
        element: <Llp />,
      },
      {
        path: "/professional",
        element: <Professional />,
      },
      {
        path: "/partnership",
        element: <Partnership />,
      },
      {
        path: "/propreitorship",
        element: <Propreitorship />,
      },
      {
        path: "/societies",
        element: <Societies />,
      },
      {
        path: "/trust",
        element: <Trust />,
      },
      {
        path: "/incorporation",
        element: <Incorporation />,
      },
      {
        path: "/assetsaccounting",
        element: <AssetsAccounting />,
      },
      {
        path: "/bookkeeping",
        element: <Bookkeeping />,
      },
      {
        path: "/hrfunction",
        element: <HrFunction />,
      },
      {
        path: "/Payroll",
        element: <Payroll />,
      },
      {
        path: "/quarterly",
        element: <Quarterly />,
      },
      {
        path: "/Receivable",
        element: <Receivable />,
      },
      {
        path: "/regulartax",
        element: <RegularTax />,
      },
      {
        path: "/secretarial",
        element: <Secretarial />,
      },
      {
        path: "/vendor",
        element: <Vendor />,
      },
      {
        path: "/accountsaudit",
        element: <AccountsAudit />,
      },
      {
        path: "/accounts",
        element: <Accounts />,
      },
      {
        path: "/audit",
        element: <Audit />,
      },
      {
        path: "/forensicaudits",
        element: <ForensicAudits />,
      },
      {
        path: "/internalaudits",
        element: <InternalAudits />,
      },
      {
        path: "/statutoryauditsupport",
        element: <StatutoryauditSupport />,
      },
      {
        path: "/stockaudit",
        element: <StockAudit />,
      },
      {
        path: "/taxaudit",
        element: <TaxAudit />,
      },
      {
        path: "/statutorycompliances",
        element: <StatutoryCompliances />,
      },
      {
        path: "/gstaudits",
        element: <GSTaudits />,
      },
      {
        path: "/incometaxassesments",
        element: <IncomeTaxAssesments />,
      },
      {
        path: "/noticehandling",
        element: <Noticehandling />,
      },
      {
        path: "/llpproprietorship",
        element: <LlpProprietorship />,
      },
      {
        path: "/regularcompliance",
        element: <RegularCompliance />,
      },
      {
        path: "/yearlyreturnsfiling",
        element: <YearlyReturnsfiling />,
      },
      {
        path: "/advancetax",
        element: <AdvanceTax />,
      },
      {
        path: "/directtax",
        element: <DirectTax />,
      },
      {
        path: "/incometaxreturns",
        element: <IncomeTaxReturns />,
      },
      {
        path: "/propertytax",
        element: <PropertyTax />,
      },
      {
        path: "/taxauditsupport",
        element: <TaxAuditSupport />,
      },
      {
        path: "/tdstcsReturns",
        element: <TdsTcsReturns />,
      },
      {
        path: "/transferpricingaudit",
        element: <TransferPricingAudit />,
      },
      {
        path: "/customs",
        element: <Customs />,
      },
      {
        path: "/gstadvisory",
        element: <GSTAdvisory />,
      },
      {
        path: "/gsteinvoice",
        element: <GSTEInvoice />,
      },
      {
        path: "/gstewaybill",
        element: <GSTEwaybill />,
      },
      {
        path: "/gstmonthlyreturnsfiling",
        element: <GSTmonthlyReturnsfiling />,
      },
      {
        path: "/gstyearlyreturns",
        element: <GSTYearlyreturns />,
      },
      {
        path: "/ieccompliance",
        element: <IECcompliance />,
      },
      {
        path: "/ESICompliance",
        element: <ESICompliance />,
      },
      {
        path: "/llcservices",
        element: <LLCServices />,
      },
      {
        path: "/pfcompliance",
        element: <Pfcompliance />,
      },
      {
        path: "/professionaltax",
        element: <ProfessionalTax />,
      },
      {
        path: "/rera",
        element: <Rera />,
      },
      {
        path: "/assesments",
        element: <Assesments />,
      },
      {
        path: "/indirecttax",
        element: <IndirectTax />,
      },
      {
        path: "/directtax",
        element: <DirectTax />,
      },
      {
        path: "/companylawservices",
        element: <CompanyLawServices />,
      },
      {
        path: "/others",
        element: <Others />,
      },
      {
        path: "/adminservice",
        element: <AdminService />,
      },
      {
        path: "/enquiries",
        element: <Enquiries />
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/createpost",
        element: <PostCreate />,
      },
      {
        path: "/post/:id",
        element: <PostShow />,
      },
      {
        path: "/postedit/:id",
        element: <PostEdit />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <NotificationsContextProvider>
        <RouterProvider router={router} />
        <GlobalLoading />
      </NotificationsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
