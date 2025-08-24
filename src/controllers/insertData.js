const client = require("../utils/clientConnect");
const crypto = require("crypto");

async function insert(req, res) {
  try {
    const { indName, data } = req.body; 

    if (!indName || !data) {
      return res.status(400).json({ error: "indName and data are required" });
    }

    const check = await client.indices.exists({ index: indName });
    if (!check) {
      return res.status(404).json({ message: `Index "${indName}" does not exist` });
    }

    const uniqueId = crypto
      .createHash("md5")
      .update(`${data.name}-${data.joining_date}-${data.dob}`)
      .digest("hex");

    const response = await client.index({
      index: indName,
      id: uniqueId,
      body: data,
      op_type: "create", 
    });

    return res.json({ message: "Employee inserted", response });
  } catch (err) {
    if (
      err.meta &&
      err.meta.body &&
      err.meta.body.error.type === "version_conflict_engine_exception"
    ) {
      return res.status(409).json({ message: "Duplicate entry found. Skipping insert." });
    } else {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = { insert };
