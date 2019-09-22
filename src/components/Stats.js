import React, { Component } from 'react'

// retrived github language stats repositories
window.API = {
  fetchPopulaRepos(language) {
    // language can be "Javascript", "Python", "Go", "Rust" or "all"
    const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
      
    return fetch(encodedURI)
      .then((data) => data.json())
      .then((repos) => repos.items)
      .catch((error) => {
        return null
      });
  }  
}

// component to store the loading animation state
class Loading extends Component{

  constructor(props){
    super(props);

    this.state = {
      text: "Loading"
    }
  }

  // animate the Loading text
  componentDidMount(){
    const animationResetString = this.state.text + '.........'  // state of the text string, when we reset the animation
    this.interval = setInterval(() => {
      // ternary to reset the text string 
      this.state.text === animationResetString 
      ? this.setState({ text: 'Loading'})
      : this.setState((currentState) => ({text: currentState.text + '.'}))
    }, 30);// set the animation timer to 30ms
  }

  // stop the reset animation, to avoid memory leaks
  componentWillUnmount(){
    clearInterval(this.interval)
  }
  
  render(){
    return <p>{this.state.text}</p>
  }
}

// create the Nav bar
function Nav(props){

  // create array of languages to track
  const languages = ["all", "javascript", "python", "go", "rust"]

  return(
    <nav>
      <ul>
        {languages.map((lang) => (
          <li key={lang} onClick={() => props.onSelectLanguage(lang)}>
            {lang}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function RepositoryGrid(props){
  return (
    <ul style = {{display: 'flex', flexWrap: 'wrap'}}>
        {props.repos.map(({name, owner, stargazers_count, html_url}) => (
          <li key={name} style={{margin: 30}}>
            <ul>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count}</li>
            </ul>
          </li>
        ))}
    </ul>
  )
}

class Stats extends Component {
  constructor(props){
    super(props)

    this.state = {
      repos: [],
      activelanguage: 'all',
      loading: true,
    }

    this.handleSelectedLanguage = this.handleSelectedLanguage.bind(this)
    this.fetchRepos = this.fetchRepos.bind(this)
  }

  // fetch the data [for the current active language] when the component mounts
  componentDidMount(){
    this.fetchRepos(this.state.activelanguage)
  }

  // fetch the data [when we update the active language] after the component mounts
  componentDidUpdate(prevProps, prevState){
    if (prevState.activelanguage !== this.state.activelanguage) {// check if selection has changed
      this.fetchRepos(this.state.activelanguage)
    }
  }

  // fetchRepos() gets the repositories associated with selected language
  fetchRepos(lang){
    this.setState({
      loading: true  // ensures the loading animation remains active when we are clicking through languages [at which point, loading had become false]
    })

    window.API.fetchPopulaRepos(lang)
      .then((repos) => {
        this.setState({
          loading: false,
          repos,
        })
      })
  }

  // handleSelectedLanguage() makes the selected language to be the active language
  handleSelectedLanguage(lang){
    this.setState({
      activelanguage: lang
    })
  }

  render(){
    return (
      <div>
        <h2>GitHub Repository Stats</h2>
        <Nav onSelectLanguage = {this.handleSelectedLanguage}/>
        {
          this.state.loading === true 
          ? <Loading />
          : <div>
              <h2 style={{textAlign: 'center'}}>{this.state.activelanguage}</h2>
              <RepositoryGrid repos={this.state.repos}/>
            </div> 
        }
      </div>
    ) 
  }
}

export default Stats;