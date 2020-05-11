import React from "react";
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



function App() {
  return (
    <div>
      <Router>
        <StoreProvider>
          <Switch>
            <Route path='/List/:codename'>
              <ListPage />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </StoreProvider>
      </Router>
    </div>
  );
}

export default App;
