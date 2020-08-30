import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import Layout from '../cors/Layout';

export default class Details extends Component {
  render() {
    return (
      <Layout>
      <ProductConsumer>
        {(value) => {
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart,
          } = value.detailProduct;
          return (
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title} </h1>
                </div>
              </div>
              {/* end of the title */}
              {/* product info */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="product" />
                </div>
                {/* product text */}
                <div className="col-10 mx-10 col-md-6 my-3 text-capitalize">
                  <h1>model: {title}</h1>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    made by: <span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      Price: <span>$</span>
                      {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-1">
                    some info about products
                  </p>
                  <p className="text-muted lead">{info}</p>
                  <div>
                    <Link to="/product">
                      <ButtonContainer>back to the products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "inCart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
      </Layout>
    );
  }
}
