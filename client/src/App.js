import React, { Component } from 'react';
import Axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import UsersList from './components/userComponents/UsersList';
import LoginForm from './components/forms/LoginForm'
import RegisterForm from './components/forms/RegisterForm';


const url = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor() {
    super();
    // this.handleInputChange = this.handleInputChange.bind(this); Don't need this since reformatting to ES6 functions 
    this.state = {
      jokes:[],
      username:'',
      password:'',
      loggedIn: false,
      message: ''
    }
  }
  handleLogin = e => {
    e.preventDefault();
    Axios
      .post(`${url}/api/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if(response.status === 200 && response.data){
          localStorage.setItem('BANK CODE', response.data)
          this.setState({ loggedIn: true });
          this.fetchJokes();
        }
      })
      .catch(error => console.log(error));
    this.setState({
      username: '',
      password: ''
    });
    this.props.history.push('/users')
  }
  handleLogout = e => {
    e.preventDefault();
    if (this.state.loggedIn){
      localStorage.removeItem('BANK CODE');
      this.props.history.push('/login');
      this.setState({ loggedIn: false });
    } 
  }
  handleRegister = e => {
    e.preventDefault();
    if(this.state.username && this.state.password){
      Axios
        .post(`${url}/api/register`, {
          username: this.state.username,
          password: this.state.password
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
      this.setState({
        username: '',
        password: ''
      });
      this.props.history.push('/login')
    }
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  fetchJokes = () => {
    const token = localStorage.getItem('BANK CODE');
    const options = {
      headers: {
        authentication: token
      },
    }
    if (this.state.loggedIn && token){
      Axios
      .get(`${url}/api/jokes`, options)
      .then(response => this.setState({ jokes: response.data }))
      .catch(err => err);
    } else {
      this.setState({ message: 'please log in as a manager to view users'})
    }    
  }
  componentDidMount() {
    const token = localStorage.getItem('BANK CODE');
    if(token){
      this.setState({ loggedIn: true });
    }    
  }  
  render() {
    if(!this.state.loggedIn){
      return (
        <div className='container'> 
          <div className='nav-bar'>
            <NavLink to='/' >HOME</NavLink>
            <NavLink to='/login' >LOGIN</NavLink>
            <NavLink to='/register' >REGISTER</NavLink>
          <NavLink to='/users' >USERS</NavLink>
          </div>
          <Route path='/login' render={() => 
            <LoginForm 
            className='login-form'
              username={this.state.username} 
              password={this.state.password}         
              handleChange={this.handleInputChange}
              login={this.handleLogin} 
            />
          }/>
          
          <Route path='/register' render={(props) => 
            <RegisterForm 
              className='register-form'
              username={this.state.username} 
              password={this.state.password}
              department={this.state.department}         
              handleChange={this.handleInputChange}
              register={this.handleRegister}  
            />
          }/>
        </div> 
      )
    }
    return (
      <div className="App">
        <div className='nav-bar'>
          <NavLink to='/' >HOME</NavLink>
          <NavLink to='/login' >LOGIN</NavLink>
          <NavLink to='/register' >REGISTER</NavLink>
          <NavLink to='/users' >USERS</NavLink>
        </div>
        <Route path='/users' render={() => 
          <UsersList 
            jokes={this.state.jokes}
            message={this.state.message}
            fetchJokes={this.fetchJokes} 
            logout={this.handleLogout}
        /> 
        }/>
      </div>
    )
  }
}

export default App;
