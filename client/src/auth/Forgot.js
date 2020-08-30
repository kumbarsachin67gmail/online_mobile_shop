import React, {useState} from 'react';

import Layout from '../cors/Layout';
import axios from 'axios';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../App.css';

const Forgot = ({history}) => {
    const [values, setValues] = useState({
        email:'',
        buttonText:'Request password reset link '
    });

    const {email, buttonText} = values;
    const handleChange = (name) =>(event) =>
    {
        //
        setValues({...values,[name]: event.target.value});
    }
    axios.defaults.baseURL=process.env.REACT_APP_API;
    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, buttonText:'Submitting'})
        axios({
            method: 'PUT',
            url: '/forgot-password',
            data:{email}
        })
        .then(response => {
            console.log('FORGOT PASSWORD SUCESS', response);
            //save the response {user, token} localStorage/cookie
            
            toast.success(response.data.message);
            setValues({...values, buttonText:'Requested'}); 
            
        }).catch(error => {
            console.log('FORGOT PASSWORD  ERROR',error.response.data);
            toast.error(error.response.data.error );
            setValues({...values, buttonText:'Request password reset link'});
            
        });
    };

    const passwordForgotForm = () => (
        <form>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control"/>
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
            <h1 className="p-5 text-title">Forgot Password  </h1>
            {passwordForgotForm()}
        </div>
    </Layout>
    );
};

export default Forgot;

 
 