const client = require("../utils/clientConnect");
const { searchEmployeeInES } = require("./searchEmployee");

async function deleteEmployee(req, res) {
    try {
        const { indName, name, dob, joind } = req.query;
        const hits = await searchEmployeeInES(indName, name, dob, joind);

        if (hits && hits.length > 0) {
            const docId = hits[0]._id;
            const response = await client.delete({
                index: indName,
                id: docId
            });

            return res.json({
                message: `Employee deleted successfully with ID: ${docId}`,
                result: response
            });
        } else {
            return res.status(404).json({ message: "Employee not found to delete." });
        }
    } catch (err) {
        console.error("Error deleting employee:", err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { deleteEmployee };
