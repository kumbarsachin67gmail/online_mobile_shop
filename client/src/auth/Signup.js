import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../cors/Layout';
import axios from 'axios';
import {isAuth} from './helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../App.css';

const Signup = () => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        cpassword:'',
        buttonText:'Submit'
    });

    const {name, email, password,cpassword, buttonText} = values;
    const handleChange = (name) =>(event) =>
    {
        //
        setValues({...values,[name]: event.target.value});
    }
    // axios.defaults.baseURL=process.env.REACT_APP_API;
    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, buttonText:'Submitting'})
        axios({
            method: 'POST',
            url: '/signup',
            data:{name, email, password,cpassword}
        })
        .then(response => {
            console.log('SIGNUP SUCESS', response);
            setValues({...values, name:'',email:'',password:'',cpassword:'',buttonText:'Submitted'});
                toast.success(response.data.message );
        }).catch(error => {
            console.log('SIGNUP ERROR',error.response.data);
            setValues({...values, buttonText:'Submit'});
            toast.error(error.response.data.error);
        });
    };

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control letterspace"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control letterspace"/>
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
        <div className = "col-md-6 offset-md-3">
            <ToastContainer/>
            {isAuth()?<Redirect to='/'/>:null}
            
            <h1 className="p-5 text-title">SignUp</h1>
            {signupForm()}
        </div>
    </Layout>
    );
};

export default Signup;

 
 