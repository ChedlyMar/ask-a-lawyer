import passport from "passport";
import passportJWT from "passport-jwt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Lawyer from "../models/Lawyer.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["auth-token"];
    console.log(token);
    if (!token) res.status(400).json({ msg: token });

    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decodedToken.id);

    if (!user) res.status(404).json({ msg: "not found" });

    if (user) req.user = user;

    next();
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
};

export const isAuthLawyer = async (req, res, next) => {
  try {
    const token = req.headers["auth-token"];

    if (!token) res.status(400).json({ msg: token });

    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    const lawyer = await Lawyer.findById(decodedToken.id);

    if (!lawyer) res.status(404).json({ msg: "lawyer not found" });

    req.lawyer = lawyer;
    next();
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
};

// const JwtStrategy = passportJWT.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;

// dotenv.config();

// var opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.SECRET_KEY,
// };

// passport.use(
//   new JwtStrategy(opts, async (jwt_payload, done) => {
//     try {
//       const user = await User.findOne({ id: jwt_payload.id }).select(
//         "-password"
//       );
//       user ? done(null, user) : done(null, false);
//     } catch (error) {
//       console.log(error);
//     }
//   })
// );

// export const isAuth = () => passport.authenticate("jwt", { session: false });
