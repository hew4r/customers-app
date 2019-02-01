import { FETCH_CUSTOMERS } from "../constants";
import { createAction } from 'redux-actions';
import {apiGet} from "../api";
import {urlCustomers} from "../api/urls";

//CUARTO(4) - ACTION CREATOR QUE EJECUTA EL createAction QUE ES PARTE DE LA LIBRERIA REDUX-ACTIONS
//Y TOMA COMO 2DO PARAMETRO EL PAYLOAD CREATOR HARDCODEADO CON ARRAY DE customers

/*
cuando el middleware redux-promise detecta que en nuestro payload estamos pasando
una promise entonces ejecuta la promise y una vez que obtiene el resultado genera
una accion que se termina de resolver y la toma rel reducer, es decir de alguna
manera detiene la accion hasta que obtiene el resultado del servidor y
luego con este continua e invoca al reducer */

export const fetchCustomers = createAction(FETCH_CUSTOMERS, () => apiGet(urlCustomers));


//SIN createAction
//export const fetchCustomers = () => ({ type: FETCH_CUSTOMERS, payload: null});

//CON createAction SIN Redux-Promise
//export const fetchCustomers = createAction(FETCH_CUSTOMERS, () => customers);
