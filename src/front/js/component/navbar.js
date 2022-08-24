import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import logo from "../../img/dogger_logo.png";

import { auth } from "../pages/fire";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const home = "/";
  const login_page = "/login";
  const chatRoute = "/chat";
  let navigate = useNavigate();

  const logout = () => {
    let token = localStorage.getItem("token");
    localStorage.removeItem("token");

    auth.signOut();

    actions.handleLogOut();
    navigate(home);
  };

  const login = () => {
    navigate(login_page);
  };
  const chat = () => {
    navigate(chatRoute);
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link to={"/"} id="logoText">
            <img id="logo" src={logo} />
            ogger
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <button
                  onClick={store.isLogedIn === false ? login : logout}
                  id="btn1"
                  className="btn rounded-pill m-1 btn-lg"
                >
                  {store.log}
                </button>
              </li>
              {store.isLogedIn ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Perfil
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Edita tu perfil
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={chat}
                      >
                        mensajes <span className="badge bg-secondary">4</span>
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to={"/registrodueno"}>
                    <button
                      id="btn2"
                      className="btn rounded-pill m-1 btn-lg pr-1 pl-1"
                    >
                      Registrarse
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <hr className="light" />
    </div>
  );
};
