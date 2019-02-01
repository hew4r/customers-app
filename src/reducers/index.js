import { combineReducers } from 'redux';
import { customers } from './customers';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  customers,
  form: reduxForm
  //(1) - REDUX-FORM - Generamos un reducer donde se contiene el estado
  // para todos los formularios que vayamos creando.
})
