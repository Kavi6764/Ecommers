import React, { useState } from 'react';
import './Css/LoginSignup.css';
const LoginSignup = () => {
  const [state, setstate] = useState('Sign up');
  const [formdata, setformdata] = useState({
    name: '',
    email: '',
    password: '',
  });

  const changehandler = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const Login =  async () => {
    console.log('Login Function Excuted', formdata);
    let responsedata ;
    await fetch ('http://localhost:9000/login',{
          method:'POST',
          headers:{
                    Accept:'application/form-data',
                   'Content-Type':'application/json'
                  },
          body   :JSON.stringify(formdata)        
            }).then((response)=> response.json()).then((data)=>{
              responsedata=data;
            })
            if(responsedata.success)
            {
              localStorage.setItem('auth-token',responsedata.token);
              window.location.replace('/');
            }
            else{
              alert(responsedata.error)
            }
       };

  const Signup = async () => {
    console.log('Sign up Function Excuted', formdata);
    let responsedata ;
    await fetch ('http://localhost:9000/signup',{
          method:'POST',
          headers:{
                    Accept:'application/form-data',
                   'Content-Type':'application/json'
                  },
          body   :JSON.stringify(formdata)        
            }).then((response)=> response.json()).then((data)=>{
              responsedata=data;
            })
            if(responsedata.success)
            {
              localStorage.setItem('auth-token',responsedata.token);
              window.location.replace('/');
            }
            else{
              alert(responsedata.errors)
            }

  };

  return (
    <div className='LoginSignup'>
      <div className='LoginSignup-Container'>
        <h1>{state}</h1>
        <div className='LoginSignup-fields'>
        {state === 'Sign up' ? (
          <input
            type='text'
            placeholder='Your Name'
            value={formdata.name}
            name='name'
            onChange={changehandler}
          />
          ) : (
            <></>
          )}
            <input
              type='email'
              placeholder='Email Address'
              value={formdata.email}
              name='email'
              onChange={changehandler}
            />
          <input
            type='password'
            placeholder='Password'
            value={formdata.password}
            name='password'
            onChange={changehandler}
          />
        </div>
        <button onClick={() => {
          state === 'Sign up' ? Signup() : Login();
        }}>
          Continue
        </button>
        {state === 'Sign up' ? (
          <p className='LoginSignup-Login'>
            Already Have an account?
            <span onClick={() => {
              setstate('Login');
            }}>
              Login Here
            </span>
          </p>
        ) : (
          <p className='LoginSignup-Login'>
            Create An Accout ?
            <span onClick={() => {
              setstate('Sign up');
            }}>
              Click Here
            </span>
          </p>
        )}
        <div className='LoginSignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>
            By Continuing ,i agree to the terms of -use & privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;