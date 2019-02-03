import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import AppFrame from "../components/AppFrame";
import {getCustomerByDni} from "../selectors/customers";
import { Route, withRouter } from 'react-router-dom';
import CustomerData from "../components/CustomerData";
import CustomerEdit from "../components/CustomerEdit";
import { fetchCustomers } from "../actions/fetchCustomers";
import { updateCustomer } from "../actions/updateCustomer";
import { deleteCustomer } from "../actions/deleteCustomer";

class CustomerContainer extends Component {
  
  componentDidMount() {
    if (!this.props.customer) {
      this.props.fetchCustomers();
    }
  }
  
  handleSubmit = values => {
    console.log(JSON.stringify(values));
    const { id } = values;
    //this.props.updateCustomer(id, values);
    return this.props.updateCustomer(id, values).then(r => {
        if (r.error) {
          throw new SubmissionError(r.payload);
        }
    }).catch(e => {
      throw new SubmissionError(e);
    });
    //Retorna una promise entonces el submitting esta true y el
    // boton Aceptar queda deshabilitado
  }
  
  handleOnBack = () =>  {
    this.props.history.goBack();
  }
  
  handleOnSubmitSuccess = () => {
    this.props.history.goBack();
  }
  
  handleOnDelete = id => {
    this.props.deleteCustomer(id).then(v => {
      this.props.history.goBack();
    });
  }
  
  renderCustomerControl = (idEdit, isDelete) => {
    if (this.props.customer) { //2da OPCION - RE INICIALIZACION
      const CustomerControl = idEdit ? CustomerEdit : CustomerData;
      //return <CustomerControl initialValues={this.props.customer} />
      return <CustomerControl {...this.props.customer}
                              onSubmit={this.handleSubmit}
                              onSubmitSuccess={this.handleOnSubmitSuccess}
                              onBack={this.handleOnBack}
                              isDeleteAllow={!!isDelete}
                              onDelete={this.handleOnDelete}/>
    }
  
    return null;
    
  }
  
  renderBody = () => (
    <Route path="/customers/:dni/edit" children={
      //{ match: isEdit } es un alias el isEdit
      ( { match: isEdit } ) => (
          <Route path="/customers/:dni/del" children={
            ({match: isDelete}) => (
              this.renderCustomerControl(isEdit, isDelete))
          } />
      )
    } />
  )
  
  //body={<p>Datos del cliente "{this.props.customer.name}"</p>}
  render() {
    return (
      <div>
        <AppFrame
          header={`Cliente: ${this.props.dni}`}
          body={this.renderBody()}
          />
      </div>
    );
  }
  
}

CustomerContainer.propTypes = {
  dni: PropTypes.string.isRequired,
  customer: PropTypes.object,
  fetchCustomers: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
};

//Tambien podemos pasarle props, en este caso ya tiene cargado el dni
const mapStateToProps = (state, props) => ({
  customer: getCustomerByDni(state, props)
});

export default withRouter(connect(mapStateToProps, {
  fetchCustomers, updateCustomer, deleteCustomer })(CustomerContainer));