import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeContainer from "./containers/HomeContainer";
import CustomersContainer from "./containers/CustomersContainer";

class App extends Component {
  
  renderHome = () => <HomeContainer />;
  
  renderCustomerContainer = () => <h1>Customer Container</h1>
  
  renderCustomerListContainer = () => <h1>Customers List Container</h1>
  
  renderCustomerNewContainer = () => <h1>Customer New Container</h1>
  
  render() {
    return (
      <Router>
        <div>
          
            <Route exact path="/" component={this.renderHome} />
            <Route exact path="/customers" component={CustomersContainer} />
  
            <Switch>
              <Route path="/customers/new" component={this.renderCustomerNewContainer} />
              <Route path="/customers/:dni" component={this.renderCustomerContainer} />
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
