import React from 'react';

const RegisterForm = props => {
  return (
    <form className='register-form'>
      <label htmlFor='username'>Username</label>
      <input
        onChange={props.handleChange}
        placeholder="Username"
        value={props.username}
        name="username"
      />
      <label htmlFor='password'>Password</label>
      <input
        onChange={props.handleChange}
        placeholder="password"
        value={props.password}
        name="password"
        type="password"
      />
      <button onClick={props.register}>Register</button>
    </form>
  )
}

RegisterForm.propTypes = {

}

export default RegisterForm;
