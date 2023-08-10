import "./Admin.css";
import { MdDownloadForOffline, MdCancel } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect, useContext, useState, useRef } from "react";
import { deleteUser, getAllDocs, getUserByNumber, insertNewDoc, updateUserDB, updateUserDoc } from "../../API/readDoc";
import { ADMIN_NUMBER, COMPANY_COLL_NAME } from "../../constants";
import { AuthContext } from "../../Context/AuthContext";
import { ADMIN_EMAILS } from "../../constants";
import { showLoading } from "react-global-loading";
import { DEFAULT_DOCUMENT_LIST } from "../../constants";
import { editData } from "../../API/editDoc";
import { addDownloadUrlToDocuments } from "../utilities";
import { uploadFile } from "../../API/uploadFiles";

export default function Admin() {
  const [userNum, setNumber] = useState("");
  const [currentTab, setCurrentTab] = useState("add");
  const [dataToSend, setData] = useState({});
  const [userData, setEditData] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [date, setDate] = useState(null);
  const { auth } = useContext(AuthContext);
  const [files, setFile] = useState([]);
  const [url, setUrl] = useState("");



  useEffect(() => {
    (async () => {
      showLoading(true);
      const companies = await getAllDocs(COMPANY_COLL_NAME);
      setCompanies(companies);
      showLoading(false);
    })();
  }, []);




  if (!auth || (auth && !ADMIN_NUMBER.includes(parseInt(localStorage.getItem("phone"))))) {
    return (
      <div className="dashboard_container">
        <h1>Admin</h1>
        <h1>Please login with a admin account to view this page</h1>
      </div>
    );
  }




  const handleUserSubmit = async () => {
    if (!dataToSend.email || dataToSend.email === "") {
      alert("enter a valid email address");
      return;
    } else if (!dataToSend.phone) {
      alert("enter a valid 10 digit phone number");
      return;
    } else if (!dataToSend.name || dataToSend.name === "") {
      alert("enter your full name")
      return;
    }
    let userDoc = [];
    if (files.length) {
      files.forEach(file => {
        let imageRef = dataToSend.email + "_" + dataToSend.phone + "_" + file.name
        userDoc.push({ date: date ? date : Date.now(), imageRef: imageRef, type: file.type, title: file.name });
      })
      dataToSend.userDoc = userDoc;
      setData({ ...dataToSend, userDoc: userDoc });
    }
    await userDoc.forEach(async (doc) => {
      await uploadFile(doc)
    })
    insertNewDoc("user_data", dataToSend)
  }

  const fetchUserDetails = () => {
    console.log(userNum)
    getUserByNumber(userNum, (data) => {
      console.log("===============>", data)
      setEditData(data);
    });
  }

  const deleteImage = (ref) => {
    let newDoc = userData.userDoc.filter(doc => doc.imageRef !== ref);
    updateUserDoc({ email: userData.email, userDoc: newDoc }, () => {
      fetchUserDetails();
    })
  }

  const handleUserEdit = async () => {


    if (!userData.name || userData.name === "") {
      alert("enter your full name")
      return;
    }
    let userDoc = [];
    if (files.length) {
      files.forEach(file => {
        let imageRef = userData.email + "_" + userData.phone + "_" + file.name
        userDoc.push({ date: date ? date : Date.now(), imageRef: imageRef, type: file.type, title: file.name, file: file });
      })
      userData.userDoc = [...userData.userDoc, ...userDoc];
      setData({ ...userData, userDoc: [...userData.userDoc, ...userDoc] });
    }
    await userDoc.forEach(async (doc) => {
      await uploadFile(doc)
    })
    updateUserDB(userData);
    setFile([]);
  }
  return (
    <div>
      <p className="title-text">Super Admin Panel</p>
      <div className="company-container">
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap", width: "100%" }}>
          <div onClick={() => { setCurrentTab("add") }} style={{ padding: 10, color: "white", backgroundColor: currentTab === "add" ? "orange" : "#072f5f", borderRadius: 12 }}>Add New Customer</div>
          <div onClick={() => { setCurrentTab("edit") }} style={{ padding: 10, color: "white", backgroundColor: currentTab === "edit" ? "orange" : "#072f5f", borderRadius: 12 }}>Edit Existing Customer</div>
        </div>
        {currentTab === "add" && (
          <div style={{ alignItems: "center", width: "100%", justifyContent: "center", display: "flex", flexDirection: "column" }}>
            <form style={{ display: "flex", flexDirection: "column", width: window.innerWidth > 600 ? "30%" : "100%" }}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, flexWrap: "wrap" }}>
                <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 50 }}>Name:</div>
                <input
                  style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
                  type="text"

                  onChange={(e) => { setData({ ...dataToSend, name: e.target.value }) }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, flexWrap: "wrap" }}>
                <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 50 }}>Phone:</div>
                <input
                  style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
                  type="number"

                  onChange={(e) => { setData({ ...dataToSend, phone: parseInt(e.target.value) }) }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, flexWrap: "wrap" }}>
                <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 50 }}>Email:</div>
                <input
                  style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
                  type="text"

                  onChange={(e) => { setData({ ...dataToSend, email: e.target.value }) }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30, flexWrap: "wrap" }}>
                <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 50 }}>Date Of Upload:</div>
                <input
                  style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
                  type="date"
                  onChange={(e) => { setDate(e.target.valueAsNumber) }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, flexWrap: "wrap" }}>
                <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 50 }}>File Upload:</div>
                <input
                  style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
                  type="file"
                  multiple
                  onChange={(e) => { setFile(Object.values(e.target.files)) }}
                />
              </div>
            </form>

            <div style={{ padding: 10, color: "white", backgroundColor: "#072f5f", borderRadius: 12, marginTop: 60 }} onClick={() => { handleUserSubmit() }}>Create User </div>
          </div>
        )
        }
        {
          currentTab === "edit" && (
            <>
              <div style={{ display: "flex", width: "100%", flexDirection: "column", marginTop: 30 }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: "100%", maxWidth: 400, flexWrap: "wrap" }}>
                  <input style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }} type="number" placeholder="Search with number" onChange={(e) => setNumber(e.target.value)} ></input>
                  <div style={{ padding: 10, color: "white", backgroundColor: "#072f5f", borderRadius: 12, marginLeft: 20 }} onClick={() => { fetchUserDetails() }}>Search now</div>
                </div>

                {userData && (
                  <div style={{ width: window.innerWidth > 600 ? "30%" : "100%", alignSelf: "center" }}>
                    <div style={{ padding: 10, color: "white", backgroundColor: "#072f5f", borderRadius: 12, marginTop: 60, width: "fit-content" }} onClick={() => { deleteUser(userData.email); setNumber(null); setEditData(null) }}>Delete this user</div>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: 10, flexWrap: "wrap" }}>
                      <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 20 }}>{"Phone:"}</div>
                      <div style={{ fontSize: 25, fontWeight: "bold", color: "black", marginRight: 50 }}>{userData.phone}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: 10, flexWrap: "wrap" }}>
                      <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 20 }}>{"Email:"}</div>
                      <div style={{ fontSize: 25, fontWeight: "bold", color: "black", marginRight: 50 }}>{userData.email}</div>
                    </div>



                    <form style={{ display: "flex", flexDirection: "column", maxWidth: 500 }}>
                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, flexWrap: "wrap" }}>
                        <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 50 }}>Name:</div>
                        <input
                          defaultValue={userData.name}
                          style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
                          type="text"
                          onChange={(e) => { userData.name = e.target.value }}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30, flexWrap: "wrap" }}>
                        <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 50 }}>Date Of Upload:</div>
                        <input
                          style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
                          type="date"
                          onChange={(e) => { setDate(e.target.valueAsNumber) }}
                        />
                      </div>

                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, flexWrap: "wrap" }}>
                        <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 50 }}>File Upload:</div>
                        <input
                          style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
                          type="file"
                          multiple
                          onChange={(e) => { setFile(Object.values(e.target.files)) }}
                        />
                      </div>
                    </form>
                    <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                      {userData.userDoc && userData.userDoc.map(doc => (
                        <div style={{ marginLeft: 20, marginBottom: 20 }}>
                          <img style={{ width: 100, height: 100 }} src={"./assets/images/fileImage.png"} />
                          <div>{doc.title}</div>
                          <div style={{ padding: 10, color: "white", backgroundColor: "#072f5f", borderRadius: 12, marginTop: 10 }} onClick={() => { deleteImage(doc.imageRef) }}>Delete</div>
                        </div>))}
                    </div>

                    <div style={{ padding: 10, color: "white", backgroundColor: "#072f5f", borderRadius: 12, marginTop: 50, width: "fit-content" }} onClick={() => { handleUserEdit() }}>Save Changes </div>
                  </div>
                )}
              </div>
            </>)
        }
      </div>
    </div>
  );
}
