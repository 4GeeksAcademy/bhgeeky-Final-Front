import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
//Custom componente
import { BackendURL } from "./component/BackendURL.jsx";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
//Custom Pages
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Error404 } from "./pages/Error404.jsx";
import { NewContact } from "./component/NewContact.jsx";
import { Contactlist } from "./pages/ContactList.jsx";
import { Updatecontact } from "./component/UpdateContact.jsx";





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
                        <Route element={<Updatecontact/>} path="/updatecontact" />
                        <Route element={<Contactlist/>} path="/contacts" />
                        <Route element={<NewContact/>} path="/newcontact"/>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Error404/>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
