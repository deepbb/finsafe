import { GrDownload } from "react-icons/gr";
import "./YearFileInput.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function YearFileInput({ initialFileInput, setFileInput }) {
  const docRef = useRef(null);
  const [date, setDate] = useState(null);
  const [file, setFile] = useState(null);
  const { getIdentifier } = useContext(AuthContext);

  const onUpload = async () => {
    initialFileInput.documents.push({
      documentDate: date,
      file: new File(
        [file],
        `year_file_input_${getIdentifier()}_${initialFileInput.name}.${
          file.name.split(".")[1]
        }`,
        { type: file.type }
      ),
    });
    setFileInput({
      ...initialFileInput,
      documents: [...initialFileInput.documents],
    });
  };

  return (
    <>
      <h4 className="year-file-heading">{initialFileInput.name} Files</h4>
      <div className="year-file-input-container">
        <div className="year-file-row">
          <label className="label-flex">Choose Date -</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className="year-file-row">
          <label className="label-flex">Upload File - </label>
          <input
            type="file"
            ref={docRef}
            onChange={() => {
              setFile(docRef.current.files[0]);
            }}
          />
        </div>
        {docRef.current && docRef.current.files.length && date ? (
          <div className="year-file-row year-upload">
            <button className="button-upload" onClick={onUpload}>
              Upload
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="table-container">
        <table>
          <tr>
            <th>Date of Document</th>
            <th>Download</th>
          </tr>
          {initialFileInput.documents.map((document, index) => (
            <tr key={index}>
              <td>
                {document.documentDate.toDate
                  ? document.documentDate.toDate().toString()
                  : document.documentDate.toString()}
              </td>
              <td>
                {document.fileDownloadUrl ? (
                  <a
                    href={document.fileDownloadUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GrDownload />
                  </a>
                ) : (
                  "Please Click Save"
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}
