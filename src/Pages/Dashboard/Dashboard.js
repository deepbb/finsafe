import "./Dashboard.css";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import LoadingButton from "../../Components/LoadingButton";
import { useContext, useEffect, useState } from "react";
import Director from "./Director";
import shortid from "shortid";
import _ from "lodash";
import AddDirector from "./AddDirector";
import CompanyDetails from "./CompanyDetails";
import YearFileInput from "./YearFileInput";
import { AuthContext } from "../../Context/AuthContext";
import {

  COMPANY_COLL_NAME,
  ADMIN_NUMBER,
  USER_NOTIF_COLL_NAME,
  NOTIF_COLL_NAME,
  NOTIF_LIMIT,
} from "../../constants";
import { addBatchedData, addData } from "../../API/createDoc";
import { getAllDocs, getDocs, getUserByNumber } from "../../API/readDoc";
import { editData } from "../../API/editDoc";
import { addDownloadUrlToDocuments, getAuthFilter } from "../utilities";
import { showLoading } from "react-global-loading";
import { getFileUrl } from "../../API/uploadFiles";

const NEW_DIRECTOR = {
  name: "",
  address: "",
  mobilenumber: "",
  email: "",
  documents: [],
};

const INITIAL_DASHBOARD_DETAILS = {
  companyDetails: {
    name: "",
    address: "",
    mobilenumber: { value: "", canEdit: true },
    email: { value: "", canEdit: true },
    dinNumber: "",
    cinNumber: "",
    summary: "",
    documents: [],
  },
  directors: [],
  fileInputs: [
    { name: "ROC", documents: [] },
    { name: "Income Tax", documents: [] },
    { name: "Form 16", documents: [] },
  ],
};

export default function Dashboard() {
  const { auth, getIdentifier } = useContext(AuthContext);

  const [companyDetails, setCompanyDetails] = useState(
    INITIAL_DASHBOARD_DETAILS.companyDetails
  );

  const [directors, setDirectors] = useState(
    INITIAL_DASHBOARD_DETAILS.directors
  );
  const [fileInputs, setFileInputs] = useState(
    INITIAL_DASHBOARD_DETAILS.fileInputs
  );

  const [saving, setSaving] = useState(false);
  const [docExist, setDocExist] = useState(false);
  const [user, setUser] = useState({});
  const [to, setTo] = useState(null);
  const [from, setFrom] = useState(null);
  const [docsToShow, setDocsToShow] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchItem,setSearchItem] = useState([])
  const [searchDoc,setSearchDoc] = useState([])

  useEffect(() => {
    getUserByNumber(parseInt(localStorage.getItem("phone")), (data) => {
      setUser(data);
    })
  }, [])

  useEffect(() => {
    (async () => {
      if (auth) {
        showLoading(true);
        const [dashboardDoc] = await getDocs(
          COMPANY_COLL_NAME,
          getAuthFilter(auth)
        );
        if (dashboardDoc) {
          setDocExist(true);
          setCompanyDetails({
            ...dashboardDoc,
            directors: undefined,
            fileInputs: undefined,
          });
          setDirectors(dashboardDoc.directors);
          setFileInputs(dashboardDoc.fileInputs);
          showLoading(false);
        } else {
          if (auth.email && companyDetails.email.value === "") {
            setCompanyDetails({
              ...companyDetails,
              email: { value: auth.email, canEdit: false },
            });
          } else if (
            auth.phoneNumber &&
            companyDetails.mobilenumber.value === ""
          ) {
            setCompanyDetails({
              ...companyDetails,
              mobilenumber: { value: auth.phoneNumber, canEdit: false },
            });
          }
          showLoading(false);
        }
      }
    })();
  }, [auth]);

  const saveHandler = async () => {
    setSaving(true);
    console.log("Uploading Company Details Documents");
    if (companyDetails.documents.length) {
      companyDetails.documents = await addDownloadUrlToDocuments(
        companyDetails.documents
      );
    }

    console.log("Uploading Directors Documents");
    await Promise.all(
      directors.map(async (director, index) => {
        if (director.documents.length) {
          directors[index].documents = await addDownloadUrlToDocuments(
            director.documents
          );
        }
      })
    );

    console.log("Uploading File Inputs Documents");
    await Promise.all(
      fileInputs.map(async (fileInput, index) => {
        if (fileInputs[index].documents.length) {
          fileInputs[index].documents = await addDownloadUrlToDocuments(
            fileInput.documents
          );
        }
      })
    );

    const filter = getAuthFilter(auth);

    if (docExist) {
      await editData(COMPANY_COLL_NAME, filter, {
        ...companyDetails,
        directors: directors,
        fileInputs: fileInputs,
      });
    } else {
      await addData(COMPANY_COLL_NAME, {
        ...companyDetails,
        directors: directors,
        fileInputs: fileInputs,
      });
      setDocExist(true);
    }
    setSaving(false);
    alert("Save Complete");
  };

  if (!auth || (auth && ADMIN_NUMBER.includes(parseInt(localStorage.getItem("phone"))))) {
    return (
      <div className="dashboard_container">
        <h1>Dashboard</h1>
        <h1>Please login with a non admin account to view this page.</h1>
      </div>
    );
  }

  const getDocsByDate = () => {
    if (from === null || to === null) {
      alert("Please select a proper date range to find docs");
      return;
    }
    console.log(user.userDoc, to, from);
    let docsToSh = [];
    if (user.userDoc) {
      user.userDoc.forEach(docs => {
        if (docs.date >= from && docs.date <= to) {
          docsToSh.push(docs);
        }
      });
    }
    console.log("Date logs",docsToSh)
    setDocsToShow(docsToSh);
    setSearchItem(docsToSh)
  }

  console.log("search items", searchItem);

  const handleSearch = () => {
    const filteredDocs = searchItem.filter((doc) =>
    doc.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchDoc(filteredDocs);
    console.log("Filter docs",filteredDocs);
    setSearchTerm('');
  };

  console.log("Searched Docs", searchDoc);
  console.log("one document", searchDoc[0]?.title);

  const getFileExtension = (contentType) => {
    const mimeTypeMap = {
      'application/pdf': 'pdf',
      'image/jpeg': 'jpg',
      'image/png': 'png',
      // Add more mappings for other file types as needed
    };
    const defaultExtension = 'file';
    return mimeTypeMap[contentType] || defaultExtension;
  };

  const getDownload = (doc) => {
    console.log(doc);
    getFileUrl(doc.imageRef, (data) => {
      if (data) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', data, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
          if (xhr.status === 200) {
            const contentType = xhr.getResponseHeader('content-type');
            const blob = new Blob([xhr.response], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "file" + getFileExtension(contentType);
            link.click();
            window.URL.revokeObjectURL(url);
          }
        };
        xhr.send();
      }
    });
  }
 



  return (
    <div>
      <div className="admin-container">
        <div className="dashboard-color">
          <div className="flex-item-left">Company Details</div>
        </div>
      </div>
      <div style={{ backgroundColor: "white", width: "100%", padding: 30 }}>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 20 }}>{"Name:"}</div>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "black", marginRight: 50 }}>{user.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 20 }}>{"Phone:"}</div>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "black", marginRight: 50 }}>{user.phone}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 20 }}>{"Email:"}</div>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "black", marginRight: 50 }}>{user.email}</div>
        </div>
      </div>
      <div className="admin-container">
        <div className="dashboard-color">
          <div className="flex-item-left">Get Your Uploaded Documents</div>
        </div>
      </div>
      <div>
        
      <div>
        {docsToShow?.length > 0 &&
        <div style={{marginLeft:"10px"}}>
      <input
        style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
        type="text"
        placeholder="Search your document"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button 
      style={{ padding: 10, color: "white", backgroundColor: "#072f5f", borderRadius: 12, marginTop: 20 ,borderStyle:"none",marginLeft:5,cursor:"pointer"}} 
      onClick={handleSearch}>Search</button>
      </div>
        }
      </div>
       <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
           {searchDoc?.map(doc => (
          <div style={{ marginLeft: 20, marginBottom: 20 }}>
            <img style={{ width: 100, height: 100 }} alt={"file"} src={"./assets/images/fileImage.png"} />
            <div>{doc.title}</div>
            <div style={{ padding: 10, color: "white", backgroundColor: "#072f5f", borderRadius: 12, marginTop: 10, width: "fit-content",cursor:"pointer" }} onClick={() => { getDownload(doc) }}>Download Doc</div>
          </div>))}
      </div>
    </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: 30, padding: 30, maxWidth: 700, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 20 }}>From:</div>
          <input
            style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
            type="date"
            onChange={(e) => { setFrom(e.target.valueAsNumber) }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginRight: 20 }}>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginLeft: 50, marginRight: 20 }}>To:</div>
          <input
            style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
            type="date"
            onChange={(e) => { setTo(e.target.valueAsNumber) }}
          />
        </div>
        <div style={{ padding: 10, color: "white", backgroundColor: "#072f5f", borderRadius: 12, marginTop: 20,cursor:"pointer" }} onClick={() => { getDocsByDate() }}>Search Docs</div>
      </div>
      <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
        {docsToShow.map(doc => (
          <div style={{ marginLeft: 20, marginBottom: 20 }}>
            <img style={{ width: 100, height: 100 }} alt={"file"} src={"./assets/images/fileImage.png"} />
            <div>{doc.title}</div>
            <div style={{ padding: 10, color: "white", backgroundColor: "#072f5f", borderRadius: 12, marginTop: 10, width: "fit-content" }} onClick={() => { getDownload(doc) }}>Download Doc</div>
          </div>))}
      </div>

    </div>
  );
}
