import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../cors/Layout';
import axios from 'axios';
import {authenticate,isAuth} from './helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../App.css';
require('dotenv').config();

const Signin = ({history}) => {
    const [values, setValues] = useState({
        email:'kumbarsachin67@gmail.com',
        password:'Sachin1@',
        cpassword:'Sachin1@',
        buttonText:'Submit'
    });

    const {email, password,cpassword,buttonText} = values;
    const handleChange = (name) =>(event) =>
    {
        //
        setValues({...values,[name]: event.target.value});
    }

    

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, buttonText:'Submitting'})

          

        axios({
            method: 'POST',
            // url: 'http://localhost:8000/api/signin',
            url: "/signin",
            data:{email, password, cpassword}
        })
        .then(response => {
            console.log('SIGNIN SUCESS', response);
            //save the response {user, token} lo    calStorage/cookie
            authenticate(response,()=>{
            setValues({...values, name:'',email:'',password:'',cpassword:'',buttonText:'Submitted'});
            //toast.success(`Hey ${response.data.user.name}, Welcome Back`);
        isAuth() && isAuth().role ==='admin' ? history.push('/'):history.push('/');    
        })
            
        }).catch(error => {
            // console.log('SIGNIN ERROR',error.response.data);
            setValues({...values, buttonText:'Submit'});
            toast.error(error.response.data.error );
        });
    };

    const signinForm = () => (
        <form >
{/* className="letterspace" */}
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input  onChange={handleChange('email')} type="email" value={email} className="form-control letterspace"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" value={password}  className="form-control letterspace"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Confirm Password</label>
                <input onChange={handleChange('cpassword')} type="password" value={cpassword}  className="form-control letterspace"/>
            </div>

            <div>
                  <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )
    return (
    <Layout>
        {JSON.stringify(isAuth())}
        <div className = "col-md-6 offset-md-3">
            <ToastContainer/>
            {isAuth()?<Redirect to='/'/>:null}
            <h1 className="p-5 text-title">Signin</h1>
            {signinForm()}
            <br/> 
            <Link to ="/auth/password/forgot" className="btn btn-sm btn-outline-danger ">Forgot Password</Link>
        </div>
    </Layout>
    );
};

export default Signin;

 
 