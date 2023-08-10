import { useEffect, useState, useContext } from "react";
import { ADMIN_NUMBER } from "../../constants";
import { AuthContext } from "../../Context/AuthContext";
import "./Enquiries.css";
import { getAllDocs } from "../../API/readDoc";
import { sortDateList } from "../utilities";
import { showLoading } from "react-global-loading";
import * as XLSX from 'xlsx';

export default function Enquiries() {
  const { auth } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (auth) {
      (async () => {
        showLoading(true);
        const documents = await getAllDocs("user_enquiry");
        setServices(documents);
        showLoading(false);
      })();
    }
  }, [auth]);

  if (!auth || (auth && !ADMIN_NUMBER.includes(parseInt(localStorage.getItem("phone"))))) {
    return (
      <div className="dashboard_container">
        <h1>Admin Services</h1>
        <h1>Please login with a admin account to view this page.</h1>
      </div>
    );
  }
  const convertToExcel = (jsonData) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = "User_Enquiries" + '.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const getNewData = () => {
    let data = [];
    services.forEach(service => {
      data.push({
        "Date": new Date(service.date).toLocaleDateString(),
        "Name": service.name,
        "Organisation name": service.org,
        "Email ID": service.email,
        "Phone Number": service.phone,
        "User City": service.city,
        "User State": service.state,
        "Enquiry Detail": service.detail,
      })
    })
    convertToExcel(data);
  }
  return (
    <div>
      <div style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", display: "flex" }}>
        <div style={{ fontSize: 30, fontWeight: "bold", color: "#072f5f", margin: 10, marginRight: 100 }}>All User Enquiries</div>
        <div style={{ padding: 10, width: "fit-content", backgroundColor: "#072f5f", margin: 10, fontWeight: "bold", fontSize: 16, borderRadius: 10, color: "white" }} onClick={() => { getNewData() }}>Download As Excel Sheet </div>
      </div>
      <div className="adminservice-container">
        <table>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Organisation Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>User City</th>
            <th>User State</th>
            <th>Enquiry detail</th>
          </tr>
          {services.map((doc) => {
            return (
              <tr>
                <td>{new Date(doc.date).toLocaleDateString()}</td>
                <td>{doc.name}</td>
                <td>{doc.org}</td>
                <td>{doc.email}</td>
                <td>{doc.phone}</td>
                <td>{doc.city}</td>
                <td>{doc.state}</td>
                <td>{doc.detail}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
