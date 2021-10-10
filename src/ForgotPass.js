import React, { useState } from "react";

function ForgotPass() {
  const [email, setEmail] = useState("");

  //state for forgot email div confirmation
  const [div, setDiv] = useState({
    err: false,
    form: false,
  });

  //state for reset password field
  const [res, setRes] = useState({
    email: "",
    tempPass: "",
    newPassword: "",
  });

  //state for reset password confirmation
  const [confirm, setConfirm] = useState({
    err: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRes((prev) => ({ ...prev, [name]: value }));
  };

  //handle submit email for the first part-- for submitting email
  const handleSubmit1 = async (e) => {
    e.preventDefault();

    const deployedUrl = "https://password-reset123.herokuapp.com/forgotPass";

    const response = await fetch(deployedUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    // now do whatever you want with the data
    //console.log(data);

    if (data.error) {
      setDiv((prev) => ({ ...prev, err: true, form: false }));
      setTimeout(() => {
        setDiv((prev) => ({ ...prev, err: false, form: false }));
      }, 3000);
    } else {
      // in case there is no error
      setDiv((prev) => ({ ...prev, form: true, err: false }));
    }

    localStorage.setItem("authToken", data.authToken);
  };

  //function to reset the password put request
  const resetPassword = async (e) => {
    //console.log(res);
    e.preventDefault();

    const deployedUrl = "https://password-reset123.herokuapp.com/resetPass";

    const response = await fetch(deployedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify(res),
    });

    const data = await response.json();

    // now do whatever you want with the data
    //console.log(data);
    setDiv((prev) => ({ ...prev, form: false, err: false }));
    setEmail("");
    setConfirm({ ...confirm, err: data.err, message: data.message });
    setTimeout(() => {
      setConfirm({ ...confirm, err: "", message: "" });
    }, 3000);
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      <h2>Please submit your registered email to reset your password</h2>
      <div class="row mb-3">
        <label for="inputEmail3" class="col-sm-2 col-form-label">
          Email
        </label>
        <div class="col-sm-10">
          <input
            type="email"
            class="form-control"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
      </div>
      <button onClick={handleSubmit1} class="btn btn-primary">
        Submit email
      </button>
      {/* div to display error message */}
      {div.err ? <p>"Error sending email"</p> : " "}
      {/* form to reset password */}
      {div.form ? (
        <div className="reset-passwpord my-3">
          <p>
            Please check your email and enter the details below, reset password
            within 15 minutes
          </p>
          <h3>Form to Reset password </h3>
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
                value={res.email}
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Temporary Password(sent on email)
            </label>
            <div class="col-sm-10">
              <input
                type="password"
                class="form-control"
                onChange={handleChange}
                name="tempPass"
                value={res.tempPass}
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              New Password
            </label>
            <div class="col-sm-10">
              <input
                type="password"
                class="form-control"
                onChange={handleChange}
                name="newPassword"
                value={res.newPassword}
              />
            </div>
          </div>
          <button onClick={resetPassword} class="btn btn-primary">
            Reset Password
          </button>
        </div>
      ) : (
        ""
      )}

      {/* displaying the password- reset confirmation */}
      <p> {confirm.message} </p>
      <p> {confirm.err}</p>
    </div>
  );
}

export default ForgotPass;
