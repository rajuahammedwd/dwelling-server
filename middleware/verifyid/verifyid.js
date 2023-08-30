const { ObjectId } = require("mongodb");
const { usersDB } = require("../../db/mongodb");

const verifyId = async (req, res, next) => {
  try {
    const id = req.uid;
    const user = await usersDB.findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(401).send({ msg: "Unauthorized access" });
    next();
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  verifyId,
};
