import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
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
      if(error.response.status === 403){
        const conflictError = error.response.data.message;
        handleError(conflictError);
      }
      else if(error.response){
        const errDetails = error.response.data.error.details[0].message;
        handleError(errDetails);
      }
      else{
        handleError(error);
      }
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form className="signup-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={loginInfo.email}
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={loginInfo.password}
          />
        </div>
        <button type="submit" className="signup-btn">
          Login
        </button>
        <span>
          Already have an account?
          <Link to="/signup">Signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
