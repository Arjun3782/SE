import React, { useState } from "react";
import "./Css/LoginSignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  // const Signup = () => {}
  // TODO:
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  // const navigate = useNavigate();
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  // console.log("Logging info--> ",signupInfo);
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Please fill all the fields");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await axios.post(url, signupInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.data;
      const { message, success, error } = result;
      if (success) {
        console.log(result);
        console.log("Signup form submitted");
        handleSuccess(message);
        // setTimeout(() => {
        //   navigate("/login");
        // }, 3000);
      } else if (error) {
        const errDetails = response.data.details.message;
        return handleError(errDetails);
      } else {
        return handleError(message);
      }
    } catch (error) {
      if (error.response.status === 409) {
        const conflictError = error.response.data.message;
        handleError(conflictError);
      } else if (error.response) {
        const errDetails = error.response.data.error.details[0].message;
        handleError(errDetails);
      } else {
        handleError(error);
      }
    }
  };

  //FIXME:
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  // console.log("Logging info--> ",signupInfo);
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Please fill all the fields");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await axios.post(url, loginInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.data;
      const { message, success, error } = result;
      if (success) {
        console.log(result);
        console.log("Login completed");
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } else if (error) {
        const errDetails = response.data.details.message;
        return handleError(errDetails);
      } else {
        return handleError(message);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        const conflictError = error.response.data.message;
        handleError(conflictError);
      } else if (error.response) {
        const errDetails = error.response.data.error.details[0].message;
        handleError(errDetails);
      } else {
        handleError(error);
      }
    }
  };
  //FIXME:
  //TODO:

  return (
    <div className="container">
      <div className={`form-container ${isLogin ? "" : "right-panel-active"}`}>
        {/* Login Form */}
        <div className="form-box login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-field">
              <input
                type="email"
                name="email"
                id="login-email"
                placeholder="Enter your email"
                value={loginInfo.email}
                onChange={handleLoginChange}
                autoFocus
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                name="password"
                id="login-password"
                placeholder="Enter your password"
                value={loginInfo.password}
                onChange={handleLoginChange}
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <p>
              Don't have an account? <span onClick={toggleForm}>Sign up</span>
            </p>
          </form>
        </div>

        {/* Signup Form */}
        <div className="form-box signup-box">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className="input-field">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Username"
                value={signupInfo.name}
                onChange={handleSignupChange}
              />
            </div>
            <div className="input-field">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={signupInfo.email}
                onChange={handleSignupChange}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={signupInfo.password}
                onChange={handleSignupChange}
              />
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
            <p>
              Already have an account? <span onClick={toggleForm}>Login</span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
