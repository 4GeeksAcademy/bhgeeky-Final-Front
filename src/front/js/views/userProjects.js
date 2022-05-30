import React, {useEffect, useContext, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'

export const UserProjects = () => {

  const { id } = useParams();
  const {store, actions} = useContext(Context)
  const [postulacion, setPostulacion] = useState([]);

  useEffect(() =>{
    console.log(store.currentUser)
  }, [])
  useEffect(() =>{
    
    actions.getPostulacionesByUser(store.currentUser?.id)
    console.log(store.userPostulaciones)
  }, [store.currentUser])

	useEffect(() => {
		const obtenerPostulacion = async () => {
			const data = await fetch(
				`https://3001-xetnal-finalproject-kainuymmez4.ws-us46.gitpod.io/api/postulaciones/${id}`
			);
			const postulacion = await data.json();
			console.log(data);
			setPostulacion(postulacion);
		};
		obtenerPostulacion(); 
	}, [id]);

  useEffect(()=>{

  }, [postulacion])

  const deletePostulacion = (postulacion)=>{
		actions.deletePostulacion(postulacion.id)
		Swal.fire(
			'Postulacion Eliminada!',
			'success'
		  )

      
	} 


  return (

  <div className="container">
    <h2 className="mt-4 mb-4">Mis Postulaciones</h2>
    <div className="row row-cols-1 row-cols-md-3 g-4">
    {!!store.userPostulaciones && store.userPostulaciones.map((postulacion, index) => {
      return <div className="col" key={index}>
        <div className="card">
          <img src={store.userPostulaciones[index].projects?.pictures} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{store.userPostulaciones[index].projects?.title}</h5>
            <p className="card-text">Desde {store.userPostulaciones[index].projects?.size} m2</p>
            <p className="card-text">Desde {store.userPostulaciones[index].projects?.minimum_value} UF</p>
            <p className="card-text">Habitaciones desde: {store.userPostulaciones[index].projects?.rooms}</p>
            <p className="card-text">Baños desde {store.userPostulaciones[index].projects?.bathrooms}</p>
            <Link to={`/project/${store.userPostulaciones[index].projects?.id}`}>
                <button type="button" className="btn btn-primary">
                    Ir al Proyecto
                </button>
            </Link>
            <button type="button mx-auto" className="btn btn-primary" onClick={()=>deletePostulacion(postulacion)}>
					    Eliminar
				    </button>
          </div>
        </div>
      </div>
      })}
    </div>
    <div className="container p-0 mt-4 d-flex justify-content-center">
    <Link to={"/user_home"}>
        <button type="button" className="btn btn-primary">
            Volver
        </button>
    </Link>
    </div>
  </div>

  );
};
