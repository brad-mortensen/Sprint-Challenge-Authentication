
import React from 'react'
// import PropTypes from 'prop-types';

const User = (props) => {
  console.log(props)
  return (
    <div>
      <h3>Joke:{props.joke.setup}</h3>
      <p>User ID: {props.joke.punchline}</p>
    </div>
  )
}

User.propTypes = {
}

export default User;
