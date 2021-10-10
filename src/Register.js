import React from "react";
import { useState } from "react";

function Register() {
  const [userRegister, setuserRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserRegister((prev) => ({ ...prev, [name]: value }));
  };

  //post request to register user
  const hanldeSubmit = async (e) => {
    e.preventDefault();

    const deployedUrl = "https://password-reset123.herokuapp.com/register";

    const response = await fetch(deployedUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegister),
    });

    const data = await response.json();
    setMessage(data.message);

    //after 2 secs it will disappear
    setTimeout(() => {
      setMessage("");
    }, 2000);

    // now do whatever you want with the data
    //console.log(data);
    setuserRegister({ name: "", email: "", password: "" });
  };

  return (
    <div>
      <form onSubmit={hanldeSubmit}>
        <h3> Register</h3>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Name
          </label>
          <div class="col-sm-10">
            <input
              type="name"
              class="form-control"
              onChange={handleChange}
              name="name"
              value={userRegister.name}
            />
          </div>
        </div>
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
              value={userRegister.email}
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword3" class="col-sm-2 col-form-label">
            Password
          </label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              onChange={handleChange}
              name="password"
              value={userRegister.password}
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="message">{message}</div>
    </div>
  );
}

export default Register;
