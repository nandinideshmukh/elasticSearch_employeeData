const client = require("../utils/clientConnect");

async function getAllEmployees(req, res) {
    try {
        const { indName } = req.query;

        if (!indName) {
            return res.status(400).json({ error: "Index name (indName) is required" });
        }

        const response = await client.search({
            index: indName,
            size: 1000, // number of documents to fetch; increase if needed
            query: {
                match_all: {}
            }
        });

        const employees = response.hits.hits.map(hit => ({
            id: hit._id,
            ...hit._source
        }));

        return res.json({
            total: response.hits.total.value,
            employees: employees
        });

    } catch (err) {
        console.error("Error fetching employees:", err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { getAllEmployees };
