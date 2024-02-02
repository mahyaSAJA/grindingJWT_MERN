import {
  register,
  insertRefreshToken,
  getByEmail,
  getByRefreshToken,
  getAllUser,
} from "../models/modelUser.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const registerControl = async (req, res) => {
  const { email, password, confPassword } = req.body;
  //cek apakah ada email yang sama
  const [cekEmailControl] = await getByEmail(email);

  if (cekEmailControl.length > 0)
    return res.status(400).json({ message: "email telah dipakai" });

  //   //cek password
  if (password !== confPassword)
    return res.status(400).json({ message: "password tidak valid" });
  //   //hash password
  const hashPassword = await argon2.hash(password);
  //   //masukkan ke database
  try {
    const response = await register(email, hashPassword);
    res.status(201).json({ message: "created", data: response });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginControl = async (req, res) => {
  const { email, password } = req.body;
  //cek apakah di database ada email
  const [coba] = await getByEmail(email);
  const userid = coba[0].id;
  const emaill = coba[0].email;
  const passwordd = coba[0].password;

  if (coba.length > 0) {
    //cek password
    const verifPass = await argon2.verify(passwordd, password);
    if (verifPass) {
      //set  jwt akses token
      const accessToken = jwt.sign(
        { userid, emaill },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "20s",
        }
      );
      //set refresh token
      const refreshToken = jwt.sign(
        { userid, emaill },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      //insert refresh token ke db
      await insertRefreshToken(userid, emaill, passwordd, refreshToken);
      //   buat cookie
      res.cookie("refreshToken", refreshToken, {
        //res.cookie("nama cookie", value, {option})
        origin: "http://localhost:5173 ",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } else {
      res.status(400).json({ message: "password salag" });
    }
  } else {
    res.status(400).json({ message: "email tidak ditemukan" });
  }
};

export const tes = async (req, res) => {
  //buat ngefetch data setelah login (rencana  data buat profile)
  const refreshToken = req.cookies.refreshToken;
  try {
    if (!refreshToken) return res.status(403).json("belum login");
    const [response] = await getByRefreshToken(refreshToken);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const logOut = async (req, res) => {
  const refreshToken = req.cookies.refreshToken; //ambil token yg ada pada cookie

  try {
    const [user] = await getByRefreshToken(refreshToken); //ambil semua di database berdasarkan refresh token cookie
    // res.json({ user });
    if (user.length === 0) return res.status(204); //cek ada atau tidak
    const userId = user[0].id;
    const email = user[0].email;
    const password = user[0].password;
    await insertRefreshToken(userId, email, password, null); //jika ada maka set refresh token menjadi null
    res.clearCookie("refreshToken"); //hapus cookie
    return res.status(200).json({ message: "logout" });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const [response] = await getAllUser();
    res.status(200).json({ response });
  } catch (error) {
    res.status(403).json({ message: error });
  }
};
