import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Header from './header';
import Home from '../components/home';
import Feature from '../components/feature';
import Signin from '../components/auth/signin';
import Signup from '../components/auth/signup';
import Signout from '../components/auth/signout';
import RequireAuth from '../components/auth/require_auth';

import history from '../utils/history';

export default class App extends Component {

  componentWillMount () {
    document.body.style.backgroundColor = "#FFFDE7";

  }
  componentWillUnmount () {
    document.body.style.backgroundColor = null;
  }

  render() {
    return (
        <Router history={history}>
          <div>
            <Header/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/feature' component={RequireAuth(Feature)}/>
              <Route path='/signin' component={Signin}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/signout' component={Signout}/>
            </Switch>
          </div>
        </Router>
    );
  }
}
