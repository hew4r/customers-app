import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppFrame from "../components/AppFrame";
import CustomerEdit from "../components/CustomerEdit";
import { insertCustomer } from "./../actions/insertCustomer"
import {SubmissionError} from "redux-form";

function mapStateToProps(state) {
  return {};
}

class NewCustomerContainer extends Component {
  
  handleSubmit = values => {
      return this.props.insertCustomer(values).then(r => {
        if (r.error) {
          throw new SubmissionError(r.payload);
        }
      }).catch(e => {
        throw new SubmissionError(e);
      });;
  }
  
  handleOnSubmitSuccess = () => {
      this.props.history.goBack();
  }
  
  handleOnBack = () => {
      this.props.history.goBack();
  }
  
  renderBody = () => {
    const newCustomer = {
      "id": "",
      "dni": "",
      "name": "-",
      "age": 0
    };
    debugger;
    return <CustomerEdit
        onSubmit={this.handleSubmit}
        onSubmitSuccess={this.handleOnSubmitSuccess}
        onBack={this.handleOnBack}/>
  }
  
  render() {
    return (
      <div>
          <AppFrame header={`Creacion del cliente`}
                    body={this.renderBody()} />p
      </div>
    );
  }
}

NewCustomerContainer.propTypes = {
    insertCustomer: PropTypes.func.isRequired,
};

export default withRouter(connect(
  mapStateToProps,
  { insertCustomer }
)(NewCustomerContainer));