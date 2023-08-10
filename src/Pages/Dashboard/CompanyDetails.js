import { MdOutlineDownloadForOffline, MdCancel } from "react-icons/md";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { DEFAULT_DOCUMENT_LIST } from "../../constants";

export default function CompanyDetails({ setCompanyDetails, companyDetails }) {
  const [documentOptions, setDocumentOptions] = useState(DEFAULT_DOCUMENT_LIST);
  const docRef = useRef([]);
  const [selectVal, setSelectVal] = useState("");
  const { getIdentifier } = useContext(AuthContext);

  // extract file upload component

  useEffect(() => {
    setDocumentOptions([
      ...documentOptions.filter(
        (option) =>
          !companyDetails.documents.map((doc) => doc.name).includes(option)
      ),
    ]);
  }, [companyDetails.documents]);

  return (
    <>
      <div className="admin-container">
        <div className="dashboard-color">
          <div className="flex-item-left">Company Details</div>
        </div>
      </div>
      <div style={{ backgroundColor: "white", width: "100%", padding: 30 }}>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 20 }}>{"Name:"}</div>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "black", marginRight: 50 }}>{"sjvjhsvdj"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 20 }}>{"Phone:"}</div>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "black", marginRight: 50 }}>{"987654321"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 20 }}>{"Email:"}</div>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "black", marginRight: 50 }}>{"sjvjhsvdj"}</div>
        </div>
      </div>
    </>
  );
}
