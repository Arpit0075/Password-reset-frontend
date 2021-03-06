import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [userLogin, setuserLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserLogin((prev) => ({ ...prev, [name]: value }));
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    try {
      const deployedUrl = "https://password-reset123.herokuapp.com/login";

      //const localUrl= "http://localhost:3001/login";

      const response = await fetch(deployedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });

      const data = await response.json();

      // now do whatever you want with the data
      // console.log(data);
      //if we get authToken in response then we store it in local storage and redirect user to private route
      if (data.authToken) {
        localStorage.setItem("authToken", data.authToken);
        history.push("/private");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Welcome to our Home Page</h3>
      <form onSubmit={hanldeSubmit}>
        <h3>Login</h3>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Email
          </label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              onChange={handleChange}
              name="email"
              value={userLogin.email}
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Password
          </label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              onChange={handleChange}
              name="password"
              value={userLogin.password}
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <Link to="/forgotPassword">
        <button class="btn btn-primary my-3">Forgot Password</button>
      </Link>
      <div className="message"></div>
    </div>
  );
}

export default Login;
