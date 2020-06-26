import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import { ListPage } from "./pages/ListPage"
import { Home } from "./pages/Home"
import 'font-awesome/css/font-awesome.min.css';
import { StoreProvider } from "./utils/GlobalState";
import SignInPage from "./pages/SignInPage"
import fire from "./config/fire";
import { Form, Button, Table } from 'react-bootstrap';
import AppBar from "./components/AppBar"
import { faHome } from '@fortawesome/free-solid-svg-icons';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        // localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        // localStorage.removeItem("user");
      }
    })
  }

  logout() {
    fire.auth().signOut()
  }

  render() {
    return (
      <div>
        <Router>
          <StoreProvider>
            {this.state.user ? (
              <Switch>
                <Route path='/List/:codename'>
                  <AppBar logout={this.logout} />
                  <ListPage user={this.state.user} />
                </Route>
                <Route path='/'>
                <AppBar logout={this.logout} />
                  <Home user={this.state.user} />
                </Route>
              </Switch>
            ) : (
                <Route path='/'>
                  <SignInPage />
                </Route>
              )}
          </StoreProvider>
        </Router>
      </div >
    );
  }
}

export default App;
