import "./ServiceCard.css";
import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";

export default function ServiceCard({
  title,
  ICON,
  link,
  image,
  color1,
  color2,
}) {
  return (
    <Link to={link}>
      <div
        className="card"
        style={
          image
            ? { backgroundImage: `url(${image})` }
            : { background: `linear-gradient(to right, ${color1}, ${color2})` }
        }
      >
        <h2>{title}</h2>
        <ICON className="middle_icon" />
        <div className="right_icon_box">
          <AiOutlineDoubleRight className="right_icon" />
        </div>
      </div>
    </Link>

  );
}
