import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import PostListContainer from './PostListContainer';
import HeaderMenu from './HeaderMenu';
import PostFormContainer from './PostFormContainer';

class App extends Component {
  
  render() {
    return (
      <div>
        <HeaderMenu />
        <Route path="/" exact render={() => (
          <PostListContainer />
        )} />

        <Route path="/new/reading" render={() => (
          <PostFormContainer />
        )} />
      </div>
    );
  }
}

export default App;
