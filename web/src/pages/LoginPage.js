import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import swal from "sweetalert";
import { useAuthState } from "react-firebase-hooks/auth";
import { login } from "../actions/authActions";

firebase.initializeApp({
  apiKey: "AIzaSyDby867sj16ySaOzZYn0FhjnEiPrAtXXLE",
  authDomain: "webflux-react-demo.firebaseapp.com",
  projectId: "webflux-react-demo",
  storageBucket: "webflux-react-demo.appspot.com",
  messagingSenderId: "741287798619",
  appId: "1:741287798619:web:9779324e1aa84d104ddc7e",
});
const auth = firebase.auth();

function LoginPage({ dispatch }) {
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

  const loginUser = (event) => {
    event.preventDefault();
    return auth
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        swal("Welcome");
      })
      .catch(() => {
        swal({
          icon: "error",
          title: "Oops...",
          text: "Invalid password",
        });
      });
  };

  return (
    <div>
      <form onSubmit={loginUser}>
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

export default LoginPage;
