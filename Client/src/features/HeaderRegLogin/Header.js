import Logo from "../../shared/Logo.png";
import "./Header.css";

const Header = ({
  title,
  buttonText,
  nearButtonText,
  buttonClass,
  onButtonClick,
}) => {
  return (
    <header className="header">
      <div className="image">
        <img src={Logo} alt="" />
      </div>
      <div className="header-text">
        <h1>{title}</h1>
      </div>

      <div className="header-login">
        <p>{nearButtonText}</p>

        <button
          type="submit"
          className={`header-login_button ${buttonClass}`}
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </header>
  );
};

export default Header;
