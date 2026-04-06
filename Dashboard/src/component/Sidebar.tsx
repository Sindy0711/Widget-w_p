import logoUrl from "../assets/react.svg";
import { FaHome } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaKey } from "react-icons/fa6";
export default function SideBar() {
  return (
    <aside className="sidebar ">
      <img className="sidebar-logo" src={logoUrl} alt="Logo" />
      <div className="nav-section">
        <div className="nav-item flex active">
          <FaHome />
          <a href="">Home</a>
        </div>
        <div className="nav-item flex">
          <IoIosSettings />
          <a href="">Setting</a>
        </div>
        <div className="nav-item flex">
          <FaKey />
          <a href="">Api Keys</a>
        </div>
      </div>
    </aside>
  );
}
