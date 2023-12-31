// jwt middleware
const jwt = require("jsonwebtoken");
const { getUser } = require("../../utils/user/user");
require("dotenv").config();

const jwtSign = async (req, res) => {
  try {
    const email = req.headers.authorization.split(" ")[1];
    const user = await getUser(email);
    const uid = user?._id;
    const auid = await jwt.sign({ uid }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    await res.cookie("accessToken", auid);
    return res.status(200).send({ msg: "Cookie has been set.", token: auid });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  jwtSign,
};
