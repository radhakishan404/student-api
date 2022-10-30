import jwt from "jsonwebtoken";
import { responseSend } from "../helpers/responseSend.js";

const optionsJWT = { expiresIn: '365d' };

const authenticateUser = async (req, res, next) => {
  try {
    const temp_token = req.header("authorization");
    if (!temp_token) throw new Error("Token not found in Header");

    const token = temp_token.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_KEY,
      optionsJWT
    );

    req.session = { ...decoded };
    next();
  } catch (e) {
    responseSend(
      res,
      403,
      e.name === 'TokenExpiredError' ? "Your session has expired, Please Login." :
        "You are not authorised: " + e.message,
      null
    );
  }
};

const getUserPayload = async (req) => {
  const temp_token = req.header("authorization");
  let result;
  if (temp_token) {
    const token = temp_token.split(' ')[1]; // Bearer <token>
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_KEY,
        optionsJWT
      );
    } catch (err) {
      result = null;
    }
  } else {
    result = null;
  }
  return result;
}

export { authenticateUser, getUserPayload };
