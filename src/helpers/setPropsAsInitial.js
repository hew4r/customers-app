import React, { Component } from 'react';

export const setPropsAsInitial = WrappedComponent => (
//como resultado de la funcion, retornanos otro componente 
  class extends Component {
    render() {
      return (
        <WrappedComponent {...this.props}
                          initialValues={this.props}
                          enableReinitialize /> //1ra OPCION - REINICIALIZACION
      );
    }
  }
);