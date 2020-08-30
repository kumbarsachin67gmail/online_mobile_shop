import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";
import "../App.css";
import logo from "../logo.svg";
import { ButtonContainer } from "../components/Button";

const Layout = ({ children, match, history }) => {
  const isActive = (path) => {
    if (match.path === path) {
      return { color: "#000" };
    } else {
      return { color: "#fff" };
    }
  };
  const nav = () => (
    <ul className="nav bg-secondary p-3">
      <li className="nav-item">
        <Link to="/" className="nav-link text-title" style={isActive("/")}>
          <img src={logo} alt="store" className="navbar-brand" />
        </Link>
      </li>
      {!isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link
              to="/signin"
              className="nav-link text-title"
              style={isActive("/signin")}
            >
              Signin
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/signup"
              className="nav-link text-title"
              style={isActive("/signup")}
            >
              Signup
            </Link>
          </li>
        </Fragment>
      )}
      {isAuth() && isAuth().role === "admin" && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link text-title2"
              style={isActive("/admin")}
              to="/admin"
            >
              {isAuth().name}
            </Link>
          </li>
          <li className="nav-item text-title2">
            <Link
              className="nav-link text-title2"
              style={isActive("/product")}
              to="/product"
            >
              Products
            </Link>
          </li>

          <Link to="/cart" className="ml-auto ">
            <ButtonContainer>
              <span className="mr-2" style={{ cursor: "pointer" }}>
                <i className="fas fa-cart-plus" />
              </span>
              <span className="text-title2" style={{ cursor: "pointer" }}>
                {" "}
                my cart
              </span>
            </ButtonContainer>
          </Link>
        </Fragment>
      )}

      {isAuth() && isAuth().role === "subscriber" && (
        <Fragment>
          <li className="nav-item text-title2">
            <Link
              className="nav-link text-title2"
              style={isActive("/product")}
              to="/product"
            >
              Products
            </Link>
          </li>

          <Link to="/cart">
            <ButtonContainer>
              <span className="mr-2" style={{ cursor: "pointer" }}>
                <i className="fas fa-cart-plus" />
              </span>
              <span className="text-title2" style={{ cursor: "pointer" }}>
                {" "}
                my cart
              </span>
            </ButtonContainer>
          </Link>
          <li className="nav-item ml-auto">
            <Link
              className="nav-link text-title2"
              style={
                (isActive("/private"),
                {
                  background: "#f1f3f8",
                  color: "black",
                  marginRight: 10,
                  borderRadius: 15,
                })
              }
              to="/private"
            >
              <span>
                <i class="fas fa-user-circle"></i>{" "}
                {isAuth().name}
              </span>
            </Link>
          </li>
        </Fragment>
      )}

      {isAuth() && (
        <li className="nav-item text-title2 ">
          <span
            className="nav-link"
            style={{
              cursor: "pointer",
              color: "#fff",
              background: "#ffc93c",
              paddingtop: 20,
              borderRadius: 10,
            }}
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            <i class="fas fa-sign-out-alt" />
          </span>
        </li>
      )}
    </ul>
  );
  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
