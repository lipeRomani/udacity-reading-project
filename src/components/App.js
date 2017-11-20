import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import PostListContainer from './PostListContainer';
import HeaderMenu from './HeaderMenu';
import PostFormContainer from './PostFormContainer';
import PostDetailContainer from './PostDetailContainer'
import NotFound404 from './NotFound404';

class App extends Component {
  
  render() {
    return (
      <div>
        <HeaderMenu />
        <Switch>
          <Route path="/" exact component={PostListContainer} />
          <Route path="/new/post" render={(props => {
            return <PostFormContainer {...props} />
          })} />
          <Route path="/post/edit/:id" render={(props) => {
            const {id} = props.match.params;
            return <PostFormContainer {...props} id={id} />
          }} />
          <Route path="/:category/:id" exact component={PostDetailContainer} />
          <Route path="/:category" exatc component={PostListContainer} />
          <Route render={() => <NotFound404 message="Page not found!" />} />
        </Switch>

      </div>
    );
  }
}

export default App;
