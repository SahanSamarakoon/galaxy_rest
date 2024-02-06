import {useRef, useState} from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  const submitHandler = (event) => {
    event.preventDefault();

    if (isLogin) {
      // send login request
    } else {
      fetch("http://localhost:8080//api/v1/auth/register",{
        method: 'POST',
            headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailInputRef,
          password: passwordInputRef
        })
      }
      ).then(response => {
        console.log(response)
        if (response.ok || response.status===201) {
          console.log("Success")
        }else{
          throw new Error('Request failed!');
        }
      })
    }
  }
  ;
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
