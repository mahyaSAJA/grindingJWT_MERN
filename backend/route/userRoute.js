import express from "express";
import {
  registerControl,
  loginControl,
  tes,
  logOut,
  getUsers,
} from "../controller/userController.js";
import { verifyLogin } from "../middleware/userMiddleware.js";
import { refreshTokenn } from "../controller/refreshToken.js";

const route = express.Router();

route.post("/register", registerControl);
route.post("/login", loginControl);
route.get("/", verifyLogin, tes);
route.get("/tokenn", refreshTokenn);
route.delete("/logOut", logOut);
route.get("/users", verifyLogin, getUsers);

export default route;
