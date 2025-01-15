import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
					 <div className="d-flex justify-content-end mb-3"><Link to="/contacts" className="btn btn-success"> Contact List</Link></div>
	);
};
