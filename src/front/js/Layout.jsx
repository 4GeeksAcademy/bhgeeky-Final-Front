import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
//Custom componente
import { BackendURL } from "./component/BackendURL.jsx";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
//Custom Pages
import { HomePage } from "./pages/HomePage.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Error404 } from "./pages/Error404.jsx";
import { NewContact } from "./component/NewContact.jsx";
import { Contactlist } from "./pages/ContactList.jsx";
import { Updatecontact } from "./component/UpdateContact.jsx";
import { CharacterList } from "./pages/CharacterList.jsx";
import { CharacterDetails } from "./pages/CharacterDetails.jsx";
import { PlanetDetails } from "./pages/PlanetDetails.jsx";
import { StarshipDetails } from "./pages/StarshipDetails.jsx";
import { PlanetList } from "./pages/PlanetList.jsx";
import { StarshipList } from "./pages/StarshipList.jsx";





//create your first component
const Layout = () => {
    //The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<HomePage/>} path="/" />
                        <Route element={<Updatecontact/>} path="/updatecontact" />
                        <Route element={<Contactlist/>} path="/contacts" />
                        <Route element={<NewContact/>} path="/newcontact"/>
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Error404/>} path="*" />
                        <Route element={<CharacterList/>} path="/characters" />
                        <Route element={<CharacterDetails/>} path="/characters/:uid" />
                        <Route element={<PlanetList />} path="/planets" />
                        <Route element={<PlanetDetails />} path="/planets/:uid" />
                        <Route element={<StarshipList />} path="/starships" />
                        <Route element={<StarshipDetails />} path="/starships/:uid" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
