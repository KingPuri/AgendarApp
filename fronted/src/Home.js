import React, {useEffect, useState} from 'react'
import {Navbar, Table, Container, Row, Col, Button, ButtonGroup, Form, NavbarBrand, FormSelect } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import { addAgenda, deleteAgenda, loadAgendas, loadSingleAgenda, sendEmail } from './redux/actions';
import emailjs from 'emailjs-com'
import{ init } from 'emailjs-com';

const initialState = {
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    rut: "",
    edad: "",
    sexo: "",
    nombre_medico: "",
    fecha: "",
    hora: "",
    correo: ""
}

export const Home = () => {
    const [state, setState] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const {agendas, msg, agenda } = useSelector(state => state.data)
    const {nombre, apellido_paterno, apellido_materno, rut, edad,sexo,nombre_medico,fecha,hora,correo} = state;
    useEffect(() => {
        dispatch(loadAgendas());
    }, [])
    useEffect(()=>{
        if(msg){
            toast.success(msg)
        }
    }, [msg] )
    useEffect(()=>{
        if(agenda){
            setState({...agenda});
        }
    },[agenda])
    const handleChange = (e) =>{
        let{name, value}=e.target;
        setState({...state, [name]: value});
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(addAgenda(state)); 
        sendEmail(state)
        setState({nombre:"",apellido_paterno:"",apellido_materno:"",rut:"",edad:"",sexo:"",nombre_medico:"",fecha:"",hora:"",correo:""})
        if(!nombre || !apellido_paterno || !apellido_materno || !rut || !edad || !sexo || !nombre_medico || !fecha || !hora || !correo){
            toast.error("Rellenar todos los campos")
        }
    };
    const handleUpdate = (id) => {
        dispatch(loadSingleAgenda(id));
        setEditMode(true);
    }
    const handleDelete = (id) => {
        if(window.confirm("Seguro de querer eliminar este registro?")){
            dispatch(deleteAgenda(id));
        }
    
    }
    

    return (
        <>
        <Navbar bg="primary" variant="dark" className="justify-content-center">
            <NavbarBrand>AgendarApp</NavbarBrand>
        </Navbar> 
        <Container style={{ marginTop: "70px" }}>
            <div class="card">
                <div class="card-body text-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                        type = "text"
                        placeholder="nombre"
                        name="nombre"
                        value={nombre || ""}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Apellido Paterno</Form.Label>
                        <Form.Control
                        type = "text"
                        placeholder="apellido paterno"
                        name="apellido_paterno"
                        value={apellido_paterno || ""}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Apellido Materno</Form.Label>
                        <Form.Control
                        type = "text"
                        placeholder="apellido materno"
                        name="apellido_materno"
                        value={apellido_materno || ""}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>RUT</Form.Label>
                        <Form.Control
                        type = "text"
                        placeholder="rut"
                        name="rut"
                        value={rut || ""}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Edad</Form.Label>
                        <Form.Control
                        type = "number"
                        placeholder="edad"
                        name="edad"
                        value={edad || ""}
                        min={18}
                        max={150}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sexo</Form.Label>
                        <Form.Control 
                        type = "text"
                        placeholder="sexo"
                        name="sexo"
                        value={sexo || ""}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nombre del medico</Form.Label>
                        <Form.Control
                        type = "text"
                        placeholder="nombre del medico"
                        name="nombre_medico"
                        value={nombre_medico || ""}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                        type = "date"
                        placeholder="fecha"
                        name="fecha"
                        value={fecha || ""}
                        onChange={handleChange}
                        />
                        <Form.Label>Hora</Form.Label>
                        <Form.Control
                        type = "time"
                        placeholder="hora"
                        name="hora"
                        value={hora || ""}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Correo electronico</Form.Label>
                        <Form.Control
                        type = "email"
                        placeholder="correo electronico"
                        name="correo"
                        value={correo || ""}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="d-grid gap-2 mt-2">
                        <Button type="submit" variant="primary" size="lg">Agregar</Button>
                    </div>
                </Form>
                </div>
            </div>
        </Container>
        <Container style={{ marginTop: "70px" }}>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>RUT</th>
                        <th>Edad</th>
                        <th>Sexo</th>
                        <th>Nombre del medico</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                {agendas && agendas.map((item, index) => (
                    <tbody key={index}>
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.nombre}</td>
                            <td>{item.apellido_paterno}</td>
                            <td>{item.apellido_materno}</td>
                            <td>{item.rut}</td>
                            <td>{item.edad}</td>
                            <td>{item.sexo}</td>
                            <td>{item.nombre_medico}</td>
                            <td>{item.fecha}</td>
                            <td>{item.hora}</td>
                            <td>{item.correo}</td>
                            <td>
                                <ButtonGroup>
                                    <Button style={{marginRight: "5px"}} variant="danger" onClick={()=> handleDelete(item._id)}>
                                        Delete
                                    </Button>
                                    {/*<Button variant="secondary" onClick={() => handleUpdate(item._id)}>
                                        Update
                                    </Button>*/}
                                </ButtonGroup>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </Container>
        </>
    )
}
