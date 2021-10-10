import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Private() {
  let history = useHistory();

  const [message, setMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const deployedUrl = "https://password-reset123.herokuapp.com/private";

        const res = await fetch(deployedUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
          },
        });
        const data = await res.json();
        //console.log(data);
        setMessage(data.message);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Welcome user!</h1>
      <p>{message}</p>
      <button
        onClick={() => {
          localStorage.removeItem("authToken");
          history.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Private;
