import React, { Component } from 'react';
import { connect } from 'react-redux';

export const accessControl = permissionRequired => WrappedComponent => {

  const SecuredControl = class extends Component {
    render() {
      const { permissions } = this.props.user;
      
      //por cada uno de los items de este array se verifica que dentro de permissions exista un indice que contenga este permiso.
      const isAllow = permissionRequired.every(p => permissions.indexOf(p) >= 0);
      
      if (!isAllow) {
          return (<div><i>No tiene permisos de acceso</i></div>);
      }
      
      //Si tiene permisos visualiza la siguiente vista
      return <WrappedComponent {...this.props}/>;
    
    }
  }
  
  //PARA SABER SI EL USUARIO TIENE PERMISOS O NO,
  //AL USUARIO LO VOY A ESTAR OBTENIENDO DE EL STORE DE REDUX,
  
  //Obtengo los datos desde el reducer "user"
  return connect(state => ({ user: state.user }))(SecuredControl)
}