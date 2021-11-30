import * as types from "./actionType";
import  axios from "axios";
import emailjs from 'emailjs-com'

const API = "http://localhost:5000"

const getAgendas = (agendas) => ({
    type: types.GET_AGENDAS,
    payload: agendas
});

const getAgenda = (agenda) => ({
    type: types.GET_SINGLE_AGENDA,
    payload: agenda
}); 

const agendaAdded = (msg) => ({
    type: types.ADD_AGENDA,
    payload: msg
})

const agendaDeleted = (msg) => ({
    type: types.DELETE_AGENDA,
    payload: msg,
})


export const loadAgendas = () => {
    return function(dispatch){
        axios.get(`${API}/agendas`)
        .then((resp) => dispatch(getAgendas(resp.data)))
        .catch((err) => console.log(err))
    }
}
export const addAgenda = (agenda) => {
    return function(dispatch){
        axios
        .post(`${API}/agendas`,agenda)
        .then((resp) => {
            dispatch(agendaAdded(resp.data.msg));
            dispatch(loadAgendas());
        })
        .catch((err) => console.log(err))
    } 
}

export const deleteAgenda = (id) => {
    return function(dispatch){
        axios
        .delete(`${API}/agenda/${id}`)
        .then((resp) => {
            dispatch(agendaDeleted(resp.data.msg));
            dispatch(loadAgendas());
        })
        .catch((err) => console.log(err))
    } 
}

export const loadSingleAgenda = (id) => {
    return function(dispatch){
        axios
        .get(`${API}/agenda/${id}`)
        .then((resp) => {
            dispatch(getAgenda(resp.data));
        })
        .catch((err) => console.log(err))
    } 
}

export const sendEmail = (agenda) => {
    return function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('service_mjhvkxj','template_83ut40p', e.target,'user_UVYWTDu7geoDwIzNoyawU').then(res=>{
            console.log(res);
        }).catch(err=> console.log(err));
    }
}