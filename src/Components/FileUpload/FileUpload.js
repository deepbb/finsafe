import { useRef } from "react";
import { FileDrop } from "react-file-drop";
import "./FileUpload.css";
import shortid from "shortid";
import { AiOutlineLoading } from "react-icons/ai";

export default function FileUpload({
  onDrop,
  onUpload,
  filePreviews,
  loading,
}) {
  const fileInputRef = useRef(null);
  const onFileInputChange = (event) => {
    const { files } = event.target;
    onDrop(files, event);
  };
  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="file_drop_box">
      <input
        onChange={onFileInputChange}
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        multiple
      />
      <FileDrop onDrop={onDrop} onTargetClick={onTargetClick}>
        {!filePreviews.length
          ? "Upload documents here"
          : "Check list before uploading docs."}
        <ul>
          {Boolean(filePreviews.length) ? (
            filePreviews.map((filePrev) => (
              <li key={shortid.generate()}>
                Name - {filePrev.name}, Size -{" "}
                {Math.round(filePrev.size / 1024)} KB
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </FileDrop>
      <button className="upload_button" onClick={onUpload}>
        <b>{loading ? <AiOutlineLoading className="loading" /> : "Upload"}</b>{" "}
      </button>
    </div>
  );
}
