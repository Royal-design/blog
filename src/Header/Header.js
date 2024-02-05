import "./header.style.scss";
import { FaLaptop, FaMobileAlt, FaTabletAlt } from "react-icons/fa";

export const Header = ({ width }) => {
  return (
    <header>
      <h2>React Blog Site</h2>
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
};
