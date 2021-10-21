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
    <div>
      <form onSubmit={registerUser}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            name="email"
            type="text"
            class="form-control"
            id="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={userData.email}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            name="password"
            type="text"
            class="form-control"
            id="password"
            placeholder="password"
            onChange={handleInputChange}
            value={userData.password}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
