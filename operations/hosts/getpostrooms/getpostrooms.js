const { propertyDB } = require("../../../db/mongodb");

const getPostRooms = async (req, res) => {
  try {
    const { uid } = req.uid;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    const count = await propertyDB.countDocuments({ host: uid });
    const totalPages = Math.ceil(count / pageSize);

    const rooms = await propertyDB
      .find({ host: uid })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const startItem = skip + 1;
    const endItem = Math.min(skip + pageSize, count);

    return res.status(200).send({
      msg: "Success",
      data: rooms,
      currentPage: page,
      totalPages: totalPages,
      startView: `${startItem} - ${endItem}`,
      totalView: count,
    });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getPostRooms,
};
