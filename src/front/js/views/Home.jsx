import React, { useContext, useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from '../store/appContext.js';



const Home = () => {

	const { actions,store } = useContext(Context)
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	let navigate = useNavigate();

	useEffect(() => {
		const myToken = localStorage.getItem("myToken");
		const userLoggedIn = !!myToken;
		setIsLoggedIn(userLoggedIn);
		console.log(store.user);
	  }, []);
	
	  function handleLogout() {
		let isLogged = actions.logout();
		if (isLogged) {
		  localStorage.removeItem("myToken");
		  setIsLoggedIn(false)
		  navigate("/");
		}
	  }

	  function handleGoLogin() {
		navigate("/login")
		}

		function handleCart() {
			navigate("/cart")
			}

			function handleSettings() {
				navigate("/settings")
				}
	  

	  
	
	  return (
        isLoggedIn ? (

            <div className="text-center mx-auto">
				<h1> Soy home</h1>
				<h2>Hola: {store.user.firstName}</h2>
                <button className="btn btn-danger m-3" onClick={handleLogout}>
                    Log Out
                </button>
				<button className="btn btn-success m-3" onClick={handleCart}>
                    Cart
                </button>
				<button className="btn btn-warning m-3" onClick={handleSettings}>
                    Config
                </button>
            </div>
        ) : (
            <div className="text-center mx-auto">
                <h1> Soy home</h1>
				<button className="btn btn-success" onClick={handleGoLogin}>
                    Login
                </button>
            </div>
        )
    );
};

export default Home;