import React, { useContext, useEffect } from "react";
import { ContactCard } from "../component/ContactCard.jsx";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Contactlist = () => {
    const {store,actions} = useContext(Context);

useEffect(() => {
    actions.getContacts()
},[])

    return(
        <div className="card-container shadow-sm rounded">
             <div className="d-flex justify-content-end mb-3"><Link to="/newcontact" className="btn btn-success"> Add new contact</Link></div>
            {store.contacts.map((data, index) => (<ContactCard key={index} data={data} />))}
        </div>
    )

}