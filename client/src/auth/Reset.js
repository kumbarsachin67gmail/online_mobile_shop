import React, {useState,useEffect} from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../cors/Layout';
import axios from 'axios';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({match}) => {
    const [values, setValues] = useState({
        name:'',
        token:'',
        newPassword:'',
        cpassword:'',
        buttonText:'Reset password'
    });

    useEffect(()=>{
        let token = match.params.token
        let {name} = jwt.decode(token)
        if(token){
            setValues({...values, name, token})
        }
    },[])

    const {name,token, newPassword,cpassword, buttonText} = values;
    const handleChange  = (name)=>(event) =>
    {
        //
        setValues({...values, [name]:event.target.value});
    }
    
    //from sign in for referance
    // const handleChange = (name) =>(event) =>
    // {
    //     //
    //     setValues({...values,[name]: event.target.value});
    // }


    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, buttonText:'Submitting'})
        axios({
            method: 'PUT',
            url: '/reset-password',
            data:{newPassword,cpassword,resetPasswordLink:token}
        })
        .then(response => {
            console.log('RESET PASSWORD SUCESS', response);
            //save the response {user, token} localStorage/cookie
            
            toast.success(response.data.message);
            setValues({...values, buttonText:'Done'}); 
            
        }).catch(error => {
            console.log('FORGOT PASSWORD  ERROR',error.response.data);
            toast.error(error.response.data.error );
            setValues({...values, buttonText:'Reset Password'});
            
        });
    };

    const passwordResetForm = () => (
        <form>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('newPassword')} type="password" value={newPassword} className="form-control" placeholder="Type new password" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Confirm Password</label>
                <input onChange={handleChange('cpassword')} type="password" value={cpassword} className="form-control" placeholder="Confirm the password" required/>
            </div>
 {/* from sign for referance
             <div className="form-group">
                <label className="text-muted">Confirm Password</label>
                <input onChange={handleChange('cpassword')} type="password" value={cpassword}  className="form-control"/>
            </div>
 */}

            <div>
                  <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )
    return (
    <Layout>
        
        <div className = "col-md-6 offset-md-3">
            <ToastContainer/>
            <h1 className="p-5">Hey {name}, Type your new passowrd   </h1>
            {passwordResetForm()}
        </div>
    </Layout>
    );
};

export default Reset;

 
 