import React, { useState } from "react";
import { connect } from 'react-redux'; 
import { useHistory } from 'react-router'; 

import Nav from "./Nav.js"
import {postLogin} from '../actions/loginActions.js' 

const initialFormValues={
  username: '',
  password: '',
}

const Login =(props) => {
  const [formValues, setFormValues]=useState(initialFormValues)
  
  const match = useHistory();

  function validateForm() {
    return formValues.username.length > 0 && formValues.password.length > 0;
  }

   function onSubmit(event) {
    event.preventDefault();
    console.log(formValues)
    props.postLogin(formValues, match)
  }
  const changeHandler = function(event){
    const name = event.target.name
    const value= event.target.value
    setFormValues({
        ...formValues,
        [name]: value,
    })
  }
  
  return (
    <div style={{width: '100%'}}>
      <Nav title='Login'/>
      <form onSubmit={onSubmit}>
          <label>Username
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={changeHandler}
            />
          </label>
          <br />
          <label>Password
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={changeHandler}
            />
          </label>
          <br />
        <button disabled={!validateForm()} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

//data from reducer
const mapStateToProps = state => {
  return {

    loginData: state.loginReducer
  };
};

export default connect(
mapStateToProps,
{postLogin}
)(Login)