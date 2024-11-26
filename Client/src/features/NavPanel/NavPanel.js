import "./NavPanel.css";
import Avatar from "../../shared/NavPanel/avatar.svg";
import Search from "../../shared/NavPanel/search.svg";
import Logout from "../../shared/NavPanel/logout.svg";
import { useNavigate } from "react-router-dom";

const NavPanel = ({ routes }) => {
  const navigate = useNavigate();

  return (
    <div className="navPanel">
      <div className="navPanel-content">
        <div className="NavPanel-content-topIcons">
          <div
            className="NavPanel-icon"
            onClick={() => {
              navigate(routes.person);
            }}
          >
            <img src={Avatar} alt="Doctor" className="NavPanel_img" />
          </div>
          <div
            className="NavPanel-icon search"
            onClick={() => {
              navigate(routes.search);
            }}
          >
            <img src={Search} alt="Search" className="NavPanel_img" />
          </div>
        </div>
        <div className="NavPanel-content-bottonIcon">
          <div
            className="NavPanel_logout"
            onClick={() => {
              navigate(routes.logout);
            }}
          >
            <img src={Logout} alt="Logout" className="NavPanel-logout-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavPanel;

{
  /*
Чтобы использовать панель у вас в коде надо прописать такую структуру 
  const routes = {
    doctor: "/doctor",
    search: "/search",
    logout: "/login",
  };
и заменить данные пути на те которые надо в вашем коде

    */
}
