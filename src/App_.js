import './css/App.css';
import Header from './components/Header';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';





class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    )
  }
}
class About extends Component {
  render() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
}
class Posts extends Component {
  render() {
    return (
      <div></div>
    );
  }
}
class Post extends Component {
  render() {
    return (
      <div></div>
    );
  }
}



class ProjectExample extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
​
          <hr />
​
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/posts" component={Posts} />
          <Route path="/posts/:postId" component={Post} />
        </div>
      </Router>
    );
  }
}

function App(){
    return(
      <ProjectExample />
    )
}
export default App;


