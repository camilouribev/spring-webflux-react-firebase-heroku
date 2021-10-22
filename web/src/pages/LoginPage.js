import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import swal from "sweetalert";
import { useAuthState } from "react-firebase-hooks/auth";
import { login } from "../actions/authActions";
import { Link } from "react-router-dom";

firebase.initializeApp({
  apiKey: "AIzaSyDby867sj16ySaOzZYn0FhjnEiPrAtXXLE",
  authDomain: "webflux-react-demo.firebaseapp.com",
  projectId: "webflux-react-demo",
  storageBucket: "webflux-react-demo.appspot.com",
  messagingSenderId: "741287798619",
  appId: "1:741287798619:web:9779324e1aa84d104ddc7e",
});
const auth = firebase.auth();

function LoginPage({ dispatch, children }) {
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setuserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const [user] = useAuthState(auth);

  if (user) {
    dispatch(login(user.email, user.uid));
  }

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(userData.email, userData.password);
      swal("Welcome");
    } catch (e) {
      swal({
        icon: "error",
        title: "Oops...",
        text: "Invalid password",
      });
    }
  };

  return (
    <div className="form_container">
      <form className="login-register__form" onSubmit={loginUser}>
        <h1>Login</h1>
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
          />
        </div>
        <button type="submit" className="btn-btn-primary">
          Submit
        </button>
        <br></br>
        <div>{children}</div>
        <div className="mb-3">
          If you are not sign in, please redirect to:{" "}
          <Link to="/register"> Sign in </Link>{" "}
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
