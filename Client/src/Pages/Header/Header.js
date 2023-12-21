import { useEffect } from "react";
import { useUserContext } from "../../Context/UserContext";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [userData, setUserData] = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user) navigate("/login");
    else if (userData.user) navigate("/")
  }, [userData.user]);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    //resetting localStorage
    localStorage.setItem("auth-token", "");
  };

  return (
    <div className="header flex align-center justify-space-evenly">
      <img
        src="/evangadi-logo.png"
        alt="Evangadi logo"
        className="header__logo"
      />
      <div className="header__link flex align-center ">
        <Link to="/" className="col-4 transition clear_link link-1">
          Home
        </Link>
        <Link to="/" className="col-4 transition clear_link link-1">
          How it Works
        </Link>
        {userData.user ? (
          <Link className="col-4 transition clear_link link-1 bold" onClick={logout}>
            Log out
          </Link>
        ) : (
          <button
            className="btn col-5 bg-1 btn-1 transition"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SIGN IN
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
