import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken, setToken } from "../redux/authSlice";
import { motion } from "framer-motion";
import "./Login.css";  

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Clear token on login page visit
    dispatch(clearToken());
    localStorage.removeItem("token");

  }, [dispatch]);

  
  // useEffect(() => {
  //   // Retrieve the token from the URL and store it in localStorage
  //   const urlToken = new URLSearchParams(window.location.search).get("token");
  //   if (urlToken) {
  //     dispatch(setToken(urlToken));
  //     localStorage.setItem("token", urlToken);
      
  //   }
  // }, [dispatch]);
  
const handleGoogleAuth = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleGitHubAuth = () => {
    window.location.href = "http://localhost:3000/auth/github";
  };

   

  return (
    <motion.div className="login-page">

    <motion.div  
      initial={{ opacity: 0 }}  
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="login-container"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="login-title"
      >
        Hey There!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="login-subtitle"
      >
        Choose a method to sign in
      </motion.p>
      <div className="button-container">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="google-button"
          onClick={handleGoogleAuth}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="Google Icon"
            className="button-icon"
          />
          Sign in with Google
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="github-button"
          onClick={handleGitHubAuth}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
            alt="GitHub Icon"
            className="button-icon"
          />
          Sign in with GitHub
        </motion.button>
      </div>
    </motion.div>
    </motion.div>

  );
};

export default Login;
