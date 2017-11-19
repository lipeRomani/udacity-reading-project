import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import PostListContainer from './PostListContainer';
import HeaderMenu from './HeaderMenu';
import PostFormContainer from './PostFormContainer';
import PostDetailContainer from './PostDetailContainer'

class App extends Component {
  
  render() {
    return (
      <div>
        <HeaderMenu />
        <Route path="/" exact component={PostListContainer} />
        
        <Route path="/new/post" render={(props => {
          return <PostFormContainer {...props} />
        })} />
        
        <Route path="/post/edit/:id" exact render={(props) => {
          const {id} = props.match.params;
          return <PostFormContainer {...props} id={id} />
        }} />

        <Route path="/post/:id" exact component={PostDetailContainer} />
      </div>
    );
  }
}

export default App;
