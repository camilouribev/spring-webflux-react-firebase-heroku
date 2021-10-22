import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { login } from "../actions/authActions";

const auth = firebase.auth();

function RegisterPage({ dispatch }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const registerUser = (event) => {
    event.preventDefault();
    return auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );
  };

  const [user] = useAuthState(auth);

  if (user) {
    dispatch(login(user.email, user.uid));
  }

  return (
    <div className="form_container">
      <form className="login-register__form" onSubmit={registerUser}>
        <h1>Register</h1>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            name="email"
            type="text"
            className="form-control"
            id="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={userData.email}
            minLength={6}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            onChange={handleInputChange}
            value={userData.password}
            minLength={6}
            required
          />
        </div>

        <button type="submit" className="btn-btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
