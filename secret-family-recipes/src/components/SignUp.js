import React from "react"

function SignUp(props) {
    const {
      values,
      changeHandler,
      onSubmit,
      disabled,
      errors,
    } = props

    return(
        <form className="signUpContainer">
            <h2>Save your Secret Recipes Online</h2>
            <div className="signUpInputs"> 
                <br /><label htmlFor='username'>
                    Username:
                    <input
                        value={values.username}
                        onChange={changeHandler}
                        name='username'
                        type='text'
                        placeholder='Create your Username'
                    />
                    {errors.username? <p>{errors.username}</p>: <div></div>}
                    </label>
                <br/>
                <label htmlFor='password'>
                Password:
                    <input
                        value={values.password}
                        onChange={changeHandler}
                        name='password'
                        type='password'
                        placeholder='Create your Password'
                    />
                    {errors.password? <p>{errors.password}</p>: <div></div>}
                    </label>
                <br/>
                <label htmlFor='confirmPassword'>Confirm Password:
                    <input
                        value={values.confirmPassword}
                        placeholder='Confirm password'
                        onChange={changeHandler}
                        name='confirmPassword'
                        type='password'
                    />
                    {errors.confirmPassword? <p>{errors.confirmPassword}</p>: <div></div>}
                </label>
            </div>
            <br/>
            <button onClick={onSubmit} disabled={disabled}>Sign Up</button>

        </form>
    )
}

export default SignUp