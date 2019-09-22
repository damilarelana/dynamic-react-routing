import React, { Component } from 'react';
import Home from './Home'
import About from './About'
import Topic from './Topics'
import Stats from './Stats'
import {
  BrowserRouter,
  Route,
  Link,
} from 'react-router-dom'

class App extends Component{

  render(){
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/topics'>Topics</Link></li>
            <li><Link to='/stats'>Statistics</Link></li>
          </ul>

          <hr/>

          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/topics' component={Topic}/>
          <Route path='/stats' component={Stats}/>

        </div>
      </BrowserRouter>
    )
  }
}

export default App;
