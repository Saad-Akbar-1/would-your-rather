import './App.css';
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';


import Nav from './Nav';
import Dashboard from './Dashboard';
import Login from './Login';
import NewQuestion from './NewQuestion';
import Question from './Question';


class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props
    return (
      <Router>
        <div className="App">
          {authedUser === null ? (
            <Route 
            render={() => (
              
              <Login />
              
            )}
          />
          ) : (
            <Fragment>
              <Nav />
                <Route exact path="/" component={Dashboard} />
                <Route path ='/question/:id' component={Question}/>
                <Route path ='/new' component={NewQuestion}/>
              
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}




function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(App);
