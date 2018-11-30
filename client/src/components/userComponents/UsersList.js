import React, { Component } from 'react'

import User from './User';

class UsersList extends Component {
  componentWillMount(){
    this.props.fetchJokes();
  }
  render(){
    return (
      <div className='users'>
        <h2>Jokes</h2>
        <h3>{this.props.message}</h3>
        {this.props.jokes.map(joke => 
          <User key={joke.id} joke={joke} />
        )}
        <button onClick={this.props.logout} >Log Out</button>
      </div>
    )
  }
}
UsersList.propTypes = {

}

export default UsersList
