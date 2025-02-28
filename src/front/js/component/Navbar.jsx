import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	//Code JS
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="d-flex justify-content-end" ><Link to="/contacts" className="btn btn-success"> Contact List</Link></div>
				<div className="d-flex justify-content-end" ><Link to="/characters" className="btn btn-success"> Characters</Link></div>
				<div className="d-flex justify-content-end" ><Link to="/planets" className="btn btn-success"> Planets</Link></div>
				<div className="d-flex justify-content-end" ><Link to="/starships" className="btn btn-success"> Starships</Link></div>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
