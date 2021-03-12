import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Carrusel } from "../component/carrusel";
import "../../styles/home.scss";
import { ComponenteInf } from "../component/ComponentInf";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container" style={{ width: "75%" }}>
			<Carrusel />
			<ComponenteInf />
		</div>
	);
};
