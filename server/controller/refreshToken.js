import jwt from "jsonwebtoken";
import { getByRefreshToken } from "../models/modelUser.js";

export const refreshTokenn = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; //ambil refresh token yg ada pada cookie re.cookie.namaCookie
    if (!refreshToken) return res.status(401); //cek apakah cookie memilki value
    const [user] = await getByRefreshToken(refreshToken); //jika ada ambil semua berdasarkan refreshToken yg ada pada cookie
    if (user.length === 0) return res.status(403); //cek apakah di database ada atau tidak

    jwt.verify(
      //jika ada verify token
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err) return res.status(403);
        const userId = user[0].id;
        const email = user[0].email;
        const accessToken = jwt.sign(
          // jika tidak ada eror maka buat akses tuken baru
          { userId, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "20s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
