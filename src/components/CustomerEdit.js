import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form'; //es un HOC
import { Prompt } from 'react-router-dom';
import {setPropsAsInitial} from "../helpers/setPropsAsInitial";
import CustomersActions from "./CustomersActions";
import {accessControl} from "../helpers/accessControl";
import {CUSTOMER_EDIT} from "../constants/permissions";

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

const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previuosValue, values) =>
  value && (!previuosValue ? value : (value > previuosValue ? value : previuosValue));


class CustomerEdit extends Component {
  
  componentDidMount() {
    if (this.txt) {
      this.txt.focus();
    }
  }
  
  renderField = ({input, meta, type, label, name, withFocus}) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...input}
             type={!type ? "text" : type}
        //txt seria el <input>
             ref={withFocus && (txt => this.txt = txt) }/>
      {
        meta.touched && meta.error && <span>{meta.error}</span>
      }
    </div>
  );
  
  render() {
  
    const { handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props;
    
    return (
    
      <div>
        <h2>Edicion del cliente</h2>
      
        <form onSubmit={handleSubmit}>
        
          <Field
            withFocus
            name="name"
            label="Nombre"
            type="text"
            component={this.renderField}
            format={toLower}
            parse={toUpper}/>
        
          <Field
            name="dni"
            label="DNI"
            type="text"
            component={this.renderField}
            //validate={[isRequired, isNumber]} //varias validaciones
          />
        
          <Field
            name="age"
            label="Edad"
            type="number"
            component={this.renderField}
            validate={isNumber}
            parse={toNumber}
            normalize={onlyGrow}/>
        
          <CustomersActions>
            <button type="submit" disabled={pristine || submitting}>Aceptar</button>
            //si no colocas el type siempre espera que sea un submit
            <button type="button" disabled={submitting} onClick={onBack}>Cancelar</button>
          </CustomersActions>
          <Prompt
            when={!pristine && !submitSucceeded}
            message="Se perderan los datos si continua">
        
          </Prompt>
      
        </form>
      </div>
  
    );
  }
}



{/*
const CustomerEdit = ({name, dni, age, handleSubmit, submitting, onBack, pristine, submitSucceeded }) => {
  
  //submitting = propiedad de redux form
  
  return (
    
    <div>
      <h2>Edicion del cliente</h2>
      Nuevo cuandro de texto: <input ref={txt => this.txt = txt} type="text"/>
      <form onSubmit={handleSubmit}>
        
          <Field
            name="name"
            label="Nombre"
            type="text"
            component={MyField}
            format={toLower}
            parse={toUpper}/>
   
          <Field
            name="dni"
            label="DNI"
            type="text"
            component={MyField}
            //validate={[isRequired, isNumber]} //varias validaciones
            />
    
          <Field
            name="age"
            label="Edad"
            type="number"
            component={MyField}
            validate={isNumber}
            parse={toNumber}
            normalize={onlyGrow}/>
        
        <CustomersActions>
          <button type="submit" disabled={pristine || submitting}>Aceptar</button>
          //si no colocas el type siempre espera que sea un submit
          <button type="button" disabled={submitting} onClick={onBack}>Cancelar</button>
        </CustomersActions>
        <Prompt
            when={!pristine && !submitSucceeded}
            message="Se perderan los datos si continua">
        
        </Prompt>
      
      </form>
    </div>
    
  );
};
*/}
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

export default accessControl([CUSTOMER_EDIT])(setPropsAsInitial(CustomerEditForm));

/*
export default connect(
  (state, props) => (
        { initialValues: props }
      ))(CustomerEditForm);
*/