import React, { Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import Pannel from './components/pages/Pannel'
import Home from './components/pages/Home'
import About from './components/pages/About'

import Vendor from './components/pages/Vendor'
import Admin from './components/pages/Admin'


function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>

          <Switch>

            <Route exact path="/pannel" component={Pannel} />
            <Route exact path="/pannel/admin" component={Admin} />
            <Route exact path="/pannel/vendor" component={Vendor} />

            <Route exact path="/" >
              <Home />
            </Route>

            <Route exact path="/home" >
              <Home />
            </Route>

            <Route exact path="/about" >
              <About />
            </Route>

          </Switch>

        </Fragment>
      </Router>

    </div>
  );
}

export default App;