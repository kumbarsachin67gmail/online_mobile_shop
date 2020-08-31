import React from "react";
import Layout from "./cors/Layout";
import { isAuth } from "./auth/helpers";
import "./App";
import {ButtonContainer} from './components/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
axios.defaults.baseURL=process.env.REACT_APP_API;
const App = () => {
  return (
    
    <div className="from-home">
      <Layout>
        <div className="">
          {isAuth() && (
            <div>
            <h1 className="front mt-3">
              <span>Welcome {isAuth().name}!!</span>
            </h1>
            <h1 className="front1 mt-3 col-md-6 mx-auto text-center">
              <span><i>TECHNOLOGY</i></span>
            </h1>
            <h4 className="front1 mt-3 col-md-6 mx-auto text-center"style={{fontSize:"30px"}}>
              <span>FOR YOU AT EVERY STEP</span>
            </h4>
            <Link to="./product" className="mx-auto">
            {/* <ButtonContainer> */}
            <h4   className="front1 mt-3 col-md-6 mx-auto text-center" style={{fontSize:"30px",letterSpacing:"0.05rem"}}>
              <span className="buttonshop">SHOP NOW</span>
            </h4>
            {/* </ButtonContainer> */}
            </Link>
            </div>
            
          )}
        </div>
        <div>
          {!isAuth() && (
            <div className="col-md-6 text-center">
              <h1 className="p-5 front"> Welcome to Tech Store</h1>
              <h2 className="front">Online Mobile Shop</h2>
              <hr />
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default App;
