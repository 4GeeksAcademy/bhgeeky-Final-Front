import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar">
      <div className="container my-4">
        <div className="d-flex align-items-center">
          <Link to="/">
            <img className="logo" src="https://i.imgur.com/zheDLvP.png" />
          </Link>
          <Link to="/">
            <h1 className="title">Bexplora</h1>
          </Link>
        </div>
        <div className="d-inline-flex ml-auto align-items-center">
          <Link to="/nosotros">
            <button className="button-regular mx-1">Nosotros</button>
          </Link>
          <Link to="/preguntas-frecuentes">
            <button className="button-regular mx-1">
              Preguntas Frecuentes
            </button>
          </Link>

          {/* en este apartado aseguramos que mis aplicaciones sea solamente visible para usuarios y funcional para usuarios registrados */}
          <Link to={(!store.isloged || store.insLoged) ? "/iniciarsesionEleccion" : "/tracker"}>
            {(!store.insLoged) && (
              <button className="button-regular mx-1" onClick={() => actions.getMyTracker()}>
                Mis Aplicaciones
              </button>
            )}
          </Link>

          {/* las siguientes dos condiciones funcionan para poner a disposición el tipo de perfil según el tipo de user */}

          <Link to="/perfil_institucional">
            {store.insLoged ? (
              <button className="button-regular mx-1" onClick={() => actions.changeMyInstitutionalProfileStatus()}>
                Mi Perfil Institucional
              </button>
            ) : null}
          </Link>

          <Link to="/perfil">
            {store.isloged ? (
              <button className="button-regular mx-1" onClick={() => actions.changeMyProfileStatus()}>Mi Perfil</button>
            ) : null}
          </Link>

          {/* las siguientes dos condiciones permiten hacer que aparezcan y desaparezcan los hyperlinks a conveniencia y utilidad */}

          <div className="buttons-right mx-2">
            <Link to="/iniciarsesionEleccion">
              {!store.isloged && !store.insLoged && (
                <button className="button-login" onClick={() => actions.changeLogInStatus()}>Iniciar sesión</button>
              )}
            </Link>


            <Link to="/registroEleccion">
              {!store.isloged && !store.insLoged && (

                <button className="button-signup" onClick={() => actions.changeSignUpStatus()}>Registrarse</button>
              )}
            </Link>

            <Link to="/">
              <button className="button-login" hidden={store.hiddenLogout} onClick={() => actions.logout()}>Cerrar sesión</button>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};
