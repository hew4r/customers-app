import { /*handleAction, */handleActions } from 'redux-actions';
import {FETCH_CUSTOMERS} from "../constants";


//QUINTO(5) - ESTA TOMANDO ESE ARRAY customers, HACEMOS UNA COPIA DEL ARRAY Y
//GENERAR UN NUEVO VALOR
export const customers = handleActions({
  [FETCH_CUSTOMERS]: (state, action) => [ ...action.payload],
}, []/*valor inicial del state*/);




//* [...action.payload] genera copia con el spread operator
//handleAction = una sola accion
