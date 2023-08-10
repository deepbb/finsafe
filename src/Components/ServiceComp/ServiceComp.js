/* eslint-disable jsx-a11y/img-redundant-alt */
import "./ServiceComp.css";
import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { addData } from "../../API/createDoc";
import { SERVICE_COLL_NAME } from "../../constants";

export default function ServiceComp({
  title,
  description,
  bulletPoints,
  inputList,
  imageSource,
}) {
  const [inputs, setInputs] = useState(
    inputList.reduce((initialState, input) => {
      initialState[input.name] = "";
      return initialState;
    }, {})
  );

  const [submitting, setSubmitting] = useState(false);

  const formRef = useRef(null);

  const { auth, getIdentifier } = useContext(AuthContext);

  const onSubmit = async (e) => {
    if (
      Object.values(formRef.current.elements)
        .map((input) => input.validity.valid)
        .every(Boolean)
    ) {
      setSubmitting(true);
      await addData(
        SERVICE_COLL_NAME,
        {
          indentifier: getIdentifier(),
          serviceName: title,
          ...inputs,
        },
        () => {
          alert("Form submitted");
          setInputs((inputs) => {
            Object.keys(inputs).forEach((key) => {
              inputs[key] = "";
            });
            return { ...inputs };
          });
          setSubmitting(false);
        }
      );
    } else {
      alert("Form invalid");
    }

  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <div className="flex-container">
        <div className="flex-child">
          <h1 className="color_white" style={{ fontWeight: "600" }}>
            <center>
              <b className="servicepage-header">{title}</b>
            </center>
          </h1>

          <p className="color_white">{description}</p>
          <img
            className="image_source"
            src={imageSource}
            alt="No image found."
          />

          <p className="color_white">
            <ul className="service_list">
              {bulletPoints.map((point, index) => {
                return (
                  <li key={index}>
                    <i className="fa-solid fa-circle-check"></i> &nbsp;{" "}
                    {point.text}
                  </li>
                );
              })}
            </ul>
          </p>
        </div>

        <div className="flex-child1">
          <center>
            <h1>{title}</h1>
          </center>
          <form ref={formRef}>
            {inputList.map((inputObj, index) => {
              if (inputObj.elementType === "select") {
                return (
                  <select
                    className="service_input"
                    key={index}
                    type={inputObj.type}
                    id={inputObj.id}
                    name={inputObj.name}
                    placeholder={inputObj.placeholder}
                    value={inputs[inputObj.name]}
                    onChange={(e) => {
                      setInputs((inputs) => {
                        return { ...inputs, [inputObj.name]: e.target.value };
                      });
                    }}
                  >
                    <option value={inputObj.placeholder}>
                      {inputObj.placeholder}
                    </option>
                    {inputObj.optionList.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                );
              } else {
                return (
                  <input
                    className="service_input"
                    type={inputObj.type}
                    id={inputObj.id}
                    name={inputObj.name}
                    placeholder={inputObj.placeholder}
                    value={inputs[inputObj.name]}
                    onChange={(e) => {
                      setInputs((inputs) => {
                        return { ...inputs, [inputObj.name]: e.target.value };
                      });
                    }}
                  ></input>
                );
              }
            })}
            <label className="service_label">
              <input type="checkbox" className="checkbox" required />I authorize
              Finsafe and its representative to contact me with updates and
              notifications via Email, SMS, WhatsApp,and call.
            </label>
            <center>
              <input
                className="service_submit"
                type="button"
                value={submitting ? "Submitting..." : "Submit"}
                disabled={submitting}
                onClick={onSubmit}
              ></input>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}
