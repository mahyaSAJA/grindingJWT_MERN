import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Dash = () => {
  const [getToken, setToken] = useState("");
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/tokenn");
      console.log(response);
    } catch (error) {
      console.log("error");
    }
  };

  return <div></div>;
};

export default Dash;
