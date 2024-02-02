import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");

  const [getErr, setErr] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        {
          email: getEmail,
          password: getPassword,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      nav("/dash");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
