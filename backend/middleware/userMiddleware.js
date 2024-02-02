import jwt from "jsonwebtoken";

export const verifyLogin = (req, res, next) => {
  const authHeader = req.headers.authorization; //ambil value yang ada pada key headers

  if (authHeader) {
    //dicek apakah auth memiliki value?
    const token = authHeader.split(" ")[1]; //token tergabung dengan string bearer, displit dan diambil token saja
    //verify token jwt
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      //jwt.verify(token yang di cookie, secret token, callback (err, user))
      if (err) {
        return res.status(403).json("token invalid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("belum auth");
  }
};
