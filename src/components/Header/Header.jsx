import { Link } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="h1">
        Text To Image
      </Link>
    </div>
  );
};

export default Header;
