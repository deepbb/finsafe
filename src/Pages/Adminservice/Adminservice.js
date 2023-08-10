import { useEffect, useState, useContext } from "react";
import { SERVICE_COLL_NAME, ADMIN_EMAILS, ADMIN_NUMBER } from "../../constants";
import { AuthContext } from "../../Context/AuthContext";
import "./Adminservice.css";
import { getAllDocs } from "../../API/readDoc";
import { sortDateList } from "../utilities";
import { showLoading } from "react-global-loading";
import * as XLSX from 'xlsx';

export default function AdminService() {
  const { auth } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (auth) {
      (async () => {
        showLoading(true);
        const documents = await getAllDocs(SERVICE_COLL_NAME);
        documents.sort(sortDateList("dateCreated"));
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
    link.download = "Admin_Service" + '.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const getNewData = () => {
    let data = [];
    services.forEach(service => {
      data.push({
        "User ID": service.indentifier,
        "User Registred Service": service.serviceName,
        "Name": service.name,
        "Email ID": service.email,
        "Phone Number": service.contact_number,
        "Organisation Name": service.organisation,
        "Services": service.services,
        "User State": service.state,
        "User City": service.city,
        "Date Created": service.dateCreated.toDate().toString(),
      })
    })
    convertToExcel(data);
  }
  return (
    <div>
      <div style={{ padding: 10, width: "fit-content", backgroundColor: "#072f5f", margin: 10, fontWeight: "bold", fontSize: 16, borderRadius: 10, color: "white" }} onClick={() => { getNewData() }}>Download As Excel Sheet </div>
      <div className="adminservice-container">
        <table>
          <tr>
            <th>User ID</th>
            <th>User Registred Service</th>
            <th>Name</th>
            <th>Email ID</th>
            <th>Phone Number</th>
            <th>Organisation Name</th>
            <th>Services</th>
            <th>User City</th>
            <th>User State</th>
            <th>Date Created</th>
          </tr>
          {services.map((doc) => {
            return (
              <tr>
                <td>{doc.indentifier}</td>
                <td>{doc.serviceName}</td>
                <td>{doc.name}</td>
                <td>{doc.email}</td>
                <td>{doc.contact_number}</td>
                <td>{doc.organisation}</td>
                <td>{doc.services}</td>
                <td>{doc.city}</td>
                <td>{doc.state}</td>
                <td>{doc.dateCreated.toDate().toString()}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
