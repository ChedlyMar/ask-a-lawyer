import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../constants/api";
import { IState } from "../../interfaces/state";
import "./Header.css";

const Header = () => {
  const [signIn, setsignIn] = useState(false);
  const [signUp, setsignUp] = useState(false);

  const user = useSelector((state: IState) => state.user.user);
  const lawyer = useSelector((state: IState) => state.lawyer.lawyer);

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    if (wrapperRef.current && !wrapperRef.current) {
      setsignIn(false);
    }
  };

  return (
    <header>
      <div className="container">
        <div>
          <img src="./logo.png" alt="" />
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link
                  to={
                    user
                      ? "/user/dashboard/profile"
                      : lawyer
                      ? "/lawyer/dashboard/profile"
                      : "/login/client"
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
            </ul>
          </nav>
        </div>
        {user ? (
          <div className="header-user">
            <div className="avatar-container">
              <img className="avatar" src={IMAGE_URL + user.image} alt="" />
            </div>
            <label htmlFor="">{user.name}</label>
          </div>
        ) : lawyer ? (
          <div className="header-user">
            <div className="avatar-container">
              <img className="avatar" src={IMAGE_URL + lawyer.image} alt="" />
            </div>
            <label htmlFor="">{lawyer.name}</label>
          </div>
        ) : (
          <div className="btn-container">
            <div className="account">
              <button
                className="link"
                ref={wrapperRef}
                onClick={() => setsignIn(!signIn)}
              >
                Login
              </button>
              {signIn ? (
                <div className="login-menu">
                  <Link to="/login/lawyer" onClick={() => setsignIn(false)}>
                    I am a <span>Lawyer</span>
                  </Link>
                  <Link to="/login/client" onClick={() => setsignIn(false)}>
                    I am a <span>Client</span>
                  </Link>
                </div>
              ) : null}
            </div>
            <div className="account">
              <button className="btn" onClick={() => setsignUp(!signUp)}>
                Sign Up
              </button>
              {signUp ? (
                <div className="login-menu" id="signup">
                  <Link to="/signup/lawyer" onClick={() => setsignUp(false)}>
                    I am a <span>Lawyer</span>
                  </Link>
                  <Link to="/signup/user" onClick={() => setsignUp(false)}>
                    I am a <span>Client</span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
