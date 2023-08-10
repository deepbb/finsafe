import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import shortid from "shortid";
import "./Dropdown.css";

import { getShortForm } from "../../utility";
import { useCallback, useMemo, useState } from "react";

export const addMobileShow = (classString) => {
  return classString + " mobile_show";
};

export default function Dropdown({
  isActive,
  setIsActive,
  headerName,
  headerLink,
  subHeaders,
  resetMenu,
  isNested = false,
}) {
  const x = useCallback(getShortForm, []);
  const initialNavbarState = useMemo(
    () =>
      subHeaders.reduce((init, subHeader) => {
        if (subHeader.subHeaders) {
          const key = x(subHeader.title); // could be a collision
          init[key] = false;
          return init;
        } else {
          return init;
        }
      }, {}),
    [subHeaders, x]
  );
  const [menu, setMenu] = useState(initialNavbarState);
  const count = useMemo(
    () =>
      subHeaders.reduce((c, subHeader) => {
        if (subHeader.subHeaders) {
          c += 1;
        }
        return c;
      }, 0),
    [subHeaders]
  );
  return (
    <div className="dropdown_text navbar_text_mobile">
      <div onClick={setIsActive} className="dropdown_link">
        <Link to={headerLink} className="navbar_link">
          {headerName}
        </Link>
        <MdArrowDropDown className="icon" />
      </div>

      <div
        className={
          isNested
            ? isActive
              ? addMobileShow("dropdown_nested")
              : "dropdown_nested"
            : isActive
            ? addMobileShow("dropdown")
            : "dropdown"
        }
      >
        <ul className={`${count > 1 ? "dropdown_list_flex" : "dropdown_list"}`}>
          {subHeaders.map((subHeader) => {
            if (subHeader.subHeaders) {
              return (
                <Dropdown
                  key={shortid.generate()}
                  isActive={menu[x(subHeader.title)]}
                  setIsActive={() => {
                    setMenu({
                      ...initialNavbarState,
                      [x(subHeader.title)]: !menu[x(subHeader.title)],
                    });
                  }}
                  resetMenu={() => {
                    setMenu({ ...initialNavbarState });
                    resetMenu();
                  }}
                  headerName={subHeader.title}
                  headerLink={subHeader.link}
                  subHeaders={subHeader.subHeaders}
                  isNested={true}
                />
              );
            } else {
              return (
                <li key={shortid.generate()} className="sub_heading_text">
                  <Link
                    to={subHeader.link}
                    onClick={() => resetMenu()}
                    className="navbar_link"
                  >
                    {subHeader.title}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
