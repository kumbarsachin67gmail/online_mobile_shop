import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../cors/Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({match}) => {
    const [values, setValues] = useState({
        name:'',
        token:'',
        buttonText:'Activate Account',
        show:true,
    });

    useEffect(()=>{
        let token = match.params.token;
        let {name} = jwt.decode(token);
        if(token){
            setValues({...values, name,token});
        }
    },[])

    const {name, token, show,buttonText} = values;
    axios.defaults.baseURL=process.env.REACT_APP_API;

    const clickSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: '/account-activation',
            data:{token}
        })
        .then(response => {
            console.log('ACCOUNT ACTIVATION', response);
            setValues({...values,show:false,buttonText:'Account Activated'});
            toast.success(response.data.message );
        }).catch(error => {
            console.log('ACCOUNT ACTIVATION ERROR',error.response.error);
            toast.error(error.response.data.error );
        });
    };

    const activationLink=()=>(
    <div className="text-center"><h1 className="p-5">Hey {name}, Ready to activate your account</h1>
    <button className="btn btn-outline-primary" onClick={clickSubmit}>{buttonText}</button>
    </div>
    )

    return (
    <Layout>
        <div className = "col-md-6 offset-md-3">
            <ToastContainer/>


            {activationLink()}
        </div>
    </Layout>
    );
};

export default Activate;

 
 