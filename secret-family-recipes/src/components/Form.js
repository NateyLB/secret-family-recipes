import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { connect } from 'react-redux';
import Nav from "./Nav.js"



import SignUp from "./SignUp"

import { postRegister} from '../actions/registerActions.js'

const initialFormValues={
    username: '',
    password: '',
    confirmPassword: '',

}

const initialFormErrors={
    username: '',
    password: '',
    confirmPassword: '',
}

const formSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is Required!')
      .min(5, 'Username must be more than 4 characters'),
    password: yup
      .string()
      .required('Password is Required!')
      .min(5, 'Password must be more than 4 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], null)
      .required('Please confirm your password')
      

  })



const Form =props =>{
    const [formValues, setFormValues]=useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [formDisabled, setFormDisabled] = useState(true)  //disables submit button if input isn't valid
    useEffect(function(){
        formSchema.isValid(formValues)
            .then(valid => { // either true or false
            setFormDisabled(!valid)
            })
    }, [formValues])

    const onSubmit = function(event){
        event.preventDefault()
        const createUser={
            username: formValues.username,
            password: formValues.password,
        }
        console.log(createUser)
        props.postRegister(createUser)
        setFormValues(initialFormValues)
    }
    const changeHandler = function(event){
        const name = event.target.name
        const value= event.target.value
        yup
            .reach(formSchema, name)
            .validate(value)
            .then(valid => {
                // CLEAR ERROR
                setFormErrors({
                ...formErrors,
                [name]: '',
                })
            })
            .catch(error => {
                setFormErrors({
                    ...formErrors,
                    [name]: error.errors[0]
                })
            })

        setFormValues({
            ...formValues,
            [name]: value,
        })
        console.log(formValues)
    }
    
    return(
        <>
            <Nav title='Sign Up'/>
            <SignUp
                values={formValues}
                changeHandler={changeHandler}
                onSubmit={onSubmit}
                disabled={formDisabled}
                errors={formErrors}
            />
        </>
    )
}

//data from reducer
const mapStateToProps = state => {
    return {

      registerData: state.registerReducer
    };
  };
  
  export default connect(
  mapStateToProps,
  {postRegister}
  )(Form)

