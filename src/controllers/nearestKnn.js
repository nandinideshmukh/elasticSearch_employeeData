const client = require("../utils/clientConnect");

async function findNear(indexName, employeeData, distance = "200km") {
    try {
        const checkExists = await client.indices.exists({ index: indexName });
        if (!checkExists) {
            console.log(`Index "${indexName}" does not exist.`);
            return [];
        }

        const response = await client.search({
            index: indexName,
            query: {
                bool: {
                    must: [
                        // { match: { department: employeeData.department } }, // same dept
                        { match: { skills: { query: employeeData.skills, operator: "or" } } } // partial skills match
                    ],
                    filter: [
                        {
                            geo_distance: {
                                distance: distance,
                                location: employeeData.location
                            }
                        }
                    ]
                }
            },
            sort: [
                {
                    _geo_distance: {
                        location: employeeData.location,
                        order: "asc",
                        unit: "km"
                    }
                },
                { rating: { order: "desc" } }
            ]
        });
        console.log(response.hits.hits);
        return response.hits.hits.map(hit => hit._source);
    } catch (err) {
        console.error("Error finding similar employee:", err);
        return [];
    }
}
// search("employeev3", "Amit Sharma", "1991-08-30","2021-06-15");
employeeData = {
    // name: "Amit Sharma",
    department: "IT",
    skills: "Node.js, Express.js, Machine Learning",
    location: { lat: 28.6139, lon: 77.2090 }
};

// (findNear("employeev3", employeeData))
module.exports = {findNear};
