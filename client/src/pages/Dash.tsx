import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

type Token = {
  accessToken: string;
}

const Dash = () => {
  const [accessToken, setAccessToken] = useState('');
  const [decodedAccessToken, setDecodedAccessToken] = useState<JwtPayload>();
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get<Token>("http://localhost:4000/user/tokenn");
      console.log(response);
      setAccessToken(response.data.accessToken)
      const decode = jwtDecode(response.data.accessToken);
      setDecodedAccessToken(decode)
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <p>{accessToken ?? 'Token tidak ditemukan'}</p>
      <p>{`aud: ${decodedAccessToken?.aud ?? '-'}`}</p>
      <p>{`exp: ${decodedAccessToken?.exp ?? '-'}`}</p>
      <p>{`iat: ${decodedAccessToken?.iat ?? '-'}`}</p>
      <p>{`iss: ${decodedAccessToken?.iss ?? '-'}`}</p>
      <p>{`jti: ${decodedAccessToken?.jti ?? '-'}`}</p>
      <p>{`nbf: ${decodedAccessToken?.nbf ?? '-'}`}</p>
      <p>{`sub: ${decodedAccessToken?.sub ?? '-'}`}</p>
    </div>
  );
};

export default Dash;
