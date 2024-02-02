import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getConf, setConf] = useState("");

  const [getErr, setErr] = useState(false);

  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/user/register", {
        email: getEmail,
        password: getPassword,
        confPassword: getConf,
      });

      console.log(response);
      nav("/login");
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div>
      {getErr ? <p>email atau password tidak valid</p> : console.log("yes")}
      <form onSubmit={(e) => submit(e)}>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
        <input type="text" onChange={(e) => setConf(e.target.value)} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Register;
