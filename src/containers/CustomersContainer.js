import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCustomers } from "../actions/fetchCustomers";
import AppFrame from "../components/AppFrame";
import CustomersList from "../components/CustomersList";
import CustomersActions from "../components/CustomersActions";
import {getCustomers} from "../selectors/customers";

class CustomersContainer extends Component {
  
  componentDidMount() {
    //TERCERO(3)
    this.props.fetchCustomers();
  }
  
  handleAddNew = () => {
    this.props.history.push('/customers/new');
  }
  
  renderBody = customers => (
    <div>
      <CustomersList
        customers={customers}
        urlPath={'customers/'}/>
    
      <CustomersActions>
        <button onClick={this.handleAddNew}>Nuevo Cliente</button>
      </CustomersActions>
    </div>
  )
  
  //PRIMERO(1)
  render() {
    return (
      <div>
        <AppFrame
          header={'Listado de clientes'}
          body={this.renderBody(this.props.customers)}/>
        
      </div>
    );
  }
  
}

CustomersContainer.propTypes = {
  fetchCustomers: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired,
};

//SEGUNDO(2)
CustomersContainer.defaultProps = {
  customers: []
}

const mapStateToProps = state => ({
  customers: getCustomers(state)
});




/*version 1 del mapDispatchToProps
const mapDispatchToProps = dispatch => (
  {
    fetchCustomers: () => dispatch(fetchCustomers())
  }
)*/

//version 2 del mapDispatchToProps
//const mapDispatchToProps = { fetchCustomers };


//version 3 del mapDispatchToProps
export default withRouter(connect(mapStateToProps, /*mapDispatchToProps*/ { fetchCustomers })(CustomersContainer));
