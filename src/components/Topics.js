import React from 'react'
import {
  Link,
  Route,
} from 'react-router-dom'

function Post (props){  // we could have used {match} here to destructure the props to what we really need i.e. `React` automatically passes {match} via context obtained from the `Browser Router`
  return <h2>Why did the chicken cross the road</h2>
}

export default function Topic ({match}) {
  return (
    <div> 
      <h2> Topics </h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props vs State</Link>
        </li>
      </ul>

      <hr/>

      <Route path={`${match.path}/:topicId`} component={Post}/>
      <Route exact path={match.url} render={() => {
        return <h3> choose a topic </h3>
      }}/>
    </div>
  ) 
}