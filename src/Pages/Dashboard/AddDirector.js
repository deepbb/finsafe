import { AiOutlinePlus } from "react-icons/ai";

export default function AddDirector({ clickHandler }) {
  return (
    <div className="director-addonbox" onClick={clickHandler}>
      <AiOutlinePlus className="director-icon" />
      <p className="director-icon-text">Add Director</p>
    </div>
  );
}
