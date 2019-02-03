import { combineReducers } from 'redux';
import { customers } from './customers';
import { reducer as reduxForm } from 'redux-form';
import {CUSTOMER_LIST, CUSTOMER_VIEW} from "../constants/permissions";

//PERMISOS PRE CARGADOS
const user = (state, action) => (
    {
        permissions: [CUSTOMER_LIST, CUSTOMER_VIEW]
    }
);

export default combineReducers({
  customers,
  form: reduxForm,
  user
  //(1) - REDUX-FORM - Generamos un reducer donde se contiene el estado
  // para todos los formularios que vayamos creando.
})
