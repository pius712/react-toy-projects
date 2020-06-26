import React from 'react';
import {BrowserRouter as Router, Route, Redirect,Switch} from 'react-router-dom';
import Header from './Header'
import Home from 'routes/Home/index.js'
import Detail from 'routes/Detail/index.js'
import Search from 'routes/Search/index.js'
import TV from 'routes/TV/index.js'

export default () => (
  <Router>
    <Header></Header>
    <Switch>
      <Route exact path='/'  component={Home}></Route>
      <Route exact path='/tv'  component={TV}></Route>
      <Route path='/search'  component={Search}></Route>
      <Route path='/movie/:id' component={Detail}></Route>
      <Route path='/tv/:id' component={Detail}></Route>
      <Redirect from='*' to='/'></Redirect> 
    </Switch>
  </Router>
)