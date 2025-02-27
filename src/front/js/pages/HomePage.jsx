import React from "react";

export const HomePage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light">
            <div className="text-center mb-5"> 
                <img
                    src="https://starwars.chocobar.net/star-wars-back0.jpg"
                    alt="Star Wars"
                    className="img-fluid"
                    style={{
                        maxWidth: "90%", 
                        height: "auto", 
                        margin: "20px 0", 
                    }}
                />
            </div>
        </div>
    );
};