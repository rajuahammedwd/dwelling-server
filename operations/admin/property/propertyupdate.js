const { ObjectId } = require("mongodb");
const { propertyDB, roomsDB, usersDB } = require("../../../db/mongodb");

const propertyUpdate = async (req, res) => {
  try {
    const { id, decision } = req.query;
    const { uid } = req.uid;
    const user = await usersDB.findOne({ _id: new ObjectId(uid) });
    const { name } = user;
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { status: decision, checkedBy: name } };
    const updateProperty = await propertyDB.updateOne(filter, update);
    const findProperty = await propertyDB.findOne(filter);
    if (findProperty === null)
      return res.status(404).send({ msg: "Property not found" });
    if (decision === "approved") await roomsDB.insertOne(findProperty);
    if (decision === "declined") await roomsDB.deleteOne(filter);
    return res.status(200).send({ msg: "Success", data: updateProperty });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  propertyUpdate,
};
