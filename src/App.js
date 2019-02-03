import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeContainer from "./containers/HomeContainer";
import CustomersContainer from "./containers/CustomersContainer";
import CustomerContainer from "./containers/CustomerContainer";
import NewCustomerContainer from "./containers/NewCustomerContainer";

class App extends Component {
  
  renderHome = () => <HomeContainer />;
  
  renderCustomerNewContainer = () => <h1>Customer New Container</h1>
  
  render() {
    return (
      <Router>
        <div>
          
            <Route exact path="/" component={this.renderHome} />
            <Route exact path="/customers" component={CustomersContainer} />
  
            <Switch>
              <Route path="/customers/new" component={NewCustomerContainer} />
              {/*<Route path="/customers/:dni" component={CustomerContainer} />*/}
              <Route path="/customers/:dni"
                      render={props => <CustomerContainer dni={props.match.params.dni}/> } />
  
              {/* con {...props} ademas de pasarle el dni, tmb le pasas match, history, location, pero siempre
                  tratar de pasar lo que vamos a usar.
              <Route path="/customers/:dni"
                     render={props => <CustomerContainer {...props} dni={props.match.params.dni}/> } />*/}
              
              
            </Switch>
          {/*to hacia donde se va a redirigir
            <Link to="/customers">Customers</Link><br />
            <Link to="/customers/30000000">Customers 30.000.000</Link>
          */}
        </div>
      </Router>
    );
  }
}

export default App;
