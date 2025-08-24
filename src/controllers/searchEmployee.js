// searchEmployee.js
const client = require("../utils/clientConnect");

// This function returns search results, not an HTTP response
async function searchEmployeeInES(indName, name, dob, joind) {
    const checkExists = await client.indices.exists({ index: indName });
    if (!checkExists) return null;

    const result = await client.search({
        index: indName,
        body: {
            query: {
                bool: {
                    must: [
                        { match: { name: name } },
                        { match: { dob: dob } },
                        { match: { joining_date: joind } },
                    ]
                }
            }
        }
    });

    return result.hits.hits; // return array of hits
}

// Existing Express search function
async function search(req, res) {
    try {
        const { indName, name, dob, joind } = req.query;
        const hits = await searchEmployeeInES(indName, name, dob, joind);

        if (!hits || hits.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const employees = hits.map((hit, index) => ({
            number: index + 1,
            id: hit._id,
            name: hit._source.name,
            salary: hit._source.salary,
            dob: hit._source.dob,
            joining_date: hit._source.joining_date
        }));

        return res.json({ message: "Employee found -> ", employees });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { search, searchEmployeeInES };
