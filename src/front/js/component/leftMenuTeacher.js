import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/components.css";
import Swal from 'sweetalert2';

const FormCommon = ({ type }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        status: '',
        grade: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };



    const submitTestGradeCreation = (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        console.log('Form submitted', formDataToSend);
        Swal.fire({
            title: "Datos registrados correctamente",
            icon: "success"
        });

    };

    return (
        <div className="container ms-2">
            <h4 className="text-welcome">{`${type === 'crear' ? 'Crear' : 'Calificar'} evaluación`}</h4>
            <form onSubmit={submitTestGradeCreation}>
                {type === 'crear' && <div className="mb-3">
                    <label className="form-label text-welcome">Nombre:</label>
                    <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} />
                </div>}
                {type === 'crear' && (
                    <div className="mb-3">
                        <label className="form-label text-welcome">Descripción:</label>
                        <textarea type="text" name="description" className="form-control" required value={formData.description} onChange={handleChange}></textarea>

                    </div>
                )}
                {type === 'crear' && <div className="mb-3">
                    <label className="form-label text-welcome">Fecha de evaluación:</label> <br></br>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="yyyy/MM/dd" className="form-control" required />
                </div>}

                {type === 'crear' && (
                    <div className="mb-3">
                        <label className="form-label text-welcome">Estado:</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="active" value={formData.status} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="active">Pendiente</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="finished" value={formData.status} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="finished">Finalizada</label>
                        </div>
                    </div>
                )}
                {type === 'calificar' && (
                    <div className="mb-3">
                        <label className="form-label text-welcome">Selecciona una evaluación:</label> <br></br>
                        <div className="input-group" onChange={handleChange}>
                            <select className="custom-select" id="inputGroupSelect04">
                                <option selected>Pendientes...</option>
                                <option value="1">Evaluación preparatoria</option>
                                <option value="2">Evaluación Lenguaje</option>
                                <option value="3">Evaluación Matemáticas</option>
                            </select>
                        </div>
                    </div>
                )}
                {type === 'calificar' && (
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Calificación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John</td>
                                <td>Doe</td>
                                <td>
                                    <input type="number" name="grade" className="form-control" required value={formData.grade} onChange={(e) => handleChange(e)} />
                                </td>
                            </tr>
                            <tr>
                                <td>Mary</td>
                                <td>Moe</td>
                                <td>
                                    <input type="text" name="grade" className="form-control" required value={formData.grade} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>July</td>
                                <td>Dooley</td>
                                <td>
                                    <input type="text" name="grade" className="form-control" required value={formData.grade} onChange={handleChange} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}

                <button type="submit" className="btn btn-outline-register">Registrar</button>
            </form>
        </div>
    );
};

export const LeftMenuTeacher = () => {
    const [activeContent, setActiveContent] = useState(null);

    const handleCreateEvaluation = () => {
        setActiveContent("crear");
    };

    const handleGradeEvaluation = () => {
        setActiveContent("calificar");
    };

    const renderContent = () => {
        switch (activeContent) {
            case "crear":
                return <FormCommon type="crear" />;
            case "calificar":
                return <FormCommon type="calificar" />;
            default:
                return (
                    <div className="container-fluid ">
                        <div className="container py-5">
                            <h1 className="text-welcome display-4">¡Siempre es un gusto tenerte de vuelta!</h1>
                            <p className="lead text-welcome-content">Recuerda usar el menú de la izquierda para ingresar o editar la información de los estudiantes.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-info rounded-start">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline ">Menú</span>
                        </Link>
                        <ul className="nav nav-pills list-group flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li >
                                <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-card-checklist"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Evaluaciones</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="ms-2 d-none d-sm-inline list-menu-item" onClick={handleCreateEvaluation}>Crear</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="ms-2 d-none d-sm-inline list-menu-item" onClick={handleGradeEvaluation}>Calificar</span>
                                        </Link>
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <Link to="#submenuEditar" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-pen"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Editar</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-calendar2-date"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Eventos</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="ms-2 d-none d-sm-inline list-menu-item">Reuniones</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="ms-2 d-none d-sm-inline list-menu-item">Salidas</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-chat-left-text"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Comunicados</span>
                                </Link>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="render-content col py-3 ">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
