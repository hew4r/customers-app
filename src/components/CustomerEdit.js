import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form'; //es un HOC
import { connect } from 'react-redux';
import {setPropsAsInitial} from "../helpers/setPropsAsInitial";
import CustomersActions from "./CustomersActions";

//(3) - REDUX-FORM - Componente Field genera distintas acciones
//      por medio de actionCreator que tiene internamente redux form y
//      de esta manera va a funcionar nuestro formulario

/*
const isRequired = value => (
  !value && "Este campo es requerido"
); */

const isNumber = value => (
  isNaN(Number(value)) && "El campo debe ser un numero"
);

const validate = values => {

  const error = {};
  
  if (!values.name) {
    error.name = "El campo nombre es requerido";
  }
  
  if (!values.dni) {
    error.dni = "El DNI es un campo obligatorio";
  }

  return error;
};


const MyField = ({input, meta, type, label, name}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input {...input} type={!type ? "text" : type}/>
    {
        meta.touched && meta.error && <span>{meta.error}</span>
    }
  </div>
);

const CustomerEdit = ({ name, dni, age, handleSubmit, submitting, onBack }) => {
  
  //submitting = propiedad de redux form
  
  return (
    
    <div>
      <h2>Edicion del cliente</h2>
      <form onSubmit={handleSubmit}>
        
          <Field
            name="name"
            component={MyField}
            type="text"
            label="Nombre" />
   
          <Field
            name="dni"
            component={MyField}
            type="text"
            //validate={[isRequired, isNumber]} //varias validaciones
            label="DNI" />
    
          <Field
            name="age"
            component={MyField}
            type="number"
            validate={isNumber}
            label="Edad" />
        
        <CustomersActions>
          <button type="submit" disabled={submitting}>Aceptar</button>
          <button onClick={onBack}>Cancelar</button>
        </CustomersActions>
      
      </form>
    </div>
    
  );
};

CustomerEdit.propTypes = {
  name: PropTypes.string,
  dni: PropTypes.string,
  age: PropTypes.number,
  onBack: PropTypes.func.isRequired,
};

//(2) - REDUX-FORM - Decoramos el formulario con HOC redux Form.
//      Le pasamos un objeto con un deter minado nombre.

const CustomerEditForm = reduxForm(
  {
    form: 'CustomerEdit',
    validate
  })(CustomerEdit);

export default setPropsAsInitial(CustomerEditForm);

/*
export default connect(
  (state, props) => (
        { initialValues: props }
      ))(CustomerEditForm);
*/