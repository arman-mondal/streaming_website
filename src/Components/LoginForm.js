// client/src/components/LoginForm.js
import React, { useState } from 'react';
import Axios from 'axios';
import "../App.css"
import {useNavigate} from "react-router-dom"


const LoginSuccessAlert=()=>{
    return(<div className="alert alert-success">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Loging Successfull</span>
  </div>)
}

const LoginErrorAlert=()=>{
    return(<div className="alert alert-error">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Wrong Credentials</span>
  </div>)
}

const NoEmailPassword=()=>{
    return(<div className="alert alert-error mt-5 ">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Enter Your Credentials</span>
  </div>)
}


const LoginForm = () => {
    const[loginsuccessfull,setloginsuccessfull]=useState(false);
    const[loginunsuccessfull,setloginunsuccessfull]=useState(false);
    const[NoCredentials,setNoCredentials]=useState(false);
    
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate(); // Initialize history for redirection
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if(!formData.username || !formData.password){
            setNoCredentials(true)
            return
        }

      // Send a POST request to your backend API for user login
      const response = await Axios.post('https://api.dcvip.one/api/auth/login', formData);

      if (response.status === 200) {
        // Login successful, you can store the user token in a secure way (e.g., localStorage)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username',formData.username)
 setloginsuccessfull(true)
       
        navigate('/dashboard');
        console.log('Login successful');
      } else {
        setloginunsuccessfull(true)
        // Handle login failure, show an error message or take appropriate action
        console.error('Login failed');
      }
    } catch (error) {
      // Handle any network or server errors here
      console.error('Error during login:', error);
    }
  };

  return (<div>
    
{NoCredentials && <NoEmailPassword/>}
            {loginsuccessfull && <LoginSuccessAlert/>}
            {loginunsuccessfull && <LoginErrorAlert/>}
   <div className='flex justify-center items-center w-full h-screen'>

<div className="card w-96 bg-base-100 shadow-xl">
<figure className="h-max pb-10 pt-10 w-full flex justify-center ">
  <a className="btn btn-ghost cursor-text hover:bg-none normal-case text-4xl"><img src="https://img.icons8.com/3d-fluency/94/youtube-play.png"/> Streamzz</a>

  </figure>
    <form onSubmit={handleSubmit}>

  <div className="card-body items-center text-center">
  <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">What is your username?</span>
  </label>
  <input   type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
         className="input input-bordered w-full max-w-xs" />
  <label className="label">

  </label>
</div>
<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">What is your username?</span>
  </label>
  <input  type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
         className="input input-bordered w-full max-w-xs" />
  <label className="label">

  </label>
</div>
     
    <div className="card-actions">
      <button type='submit' className="btn btn-primary">Login</button>
    </div>

  </div>
  </form>

</div>
    
   </div>
  </div>
  );
};

export default LoginForm;
