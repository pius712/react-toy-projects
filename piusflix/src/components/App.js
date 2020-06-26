import React, {Component} from 'react';
import Router from 'components/Router';
import Header from 'components/Header.js'
import GlobalStyles from './GlobalStyles';
class App extends Component {
  render() {
    return (
      <>
        <Router></Router>
        <GlobalStyles></GlobalStyles>
      </>
    )
  }
}

export default App;