import Logo from "../../shared/Logo.svg";
import "./Header.css";

const Header = ({
  title,
  buttonText,
  nearButtonText,
  buttonClass,
  onButtonClick,
}) => {
  return (
    <div className="header-body">
      <header className="header">
        <div className="image">
          <img src={Logo} alt="" />
        </div>
        <div className="header-text">
          <h1>{title}</h1>
        </div>

        <div className="header-login">
          <div className="header-login-text">
            <p>{nearButtonText}</p>
          </div>

          <button
            type="submit"
            className={`header-login_button ${buttonClass}`}
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
