const client = require("../utils/clientConnect");
const { searchEmployeeInES } = require("./searchEmployee");

async function update(req, res) {
    try {
        // const checkExists = await client.indices.exists({ index: indName });
        // if (!checkExists) {
        //     console.log(`Index "${indName}" does not exist on elastic cloud`);
        //     return null;
        // }

        const { indName, name, dob, joind } = req.query;
        const { data } = req.body; // fields to update
        // const firstStep = await searchEmployeeInES(indName, name, dob, joind);
        const firstStep = await client.search({
            index: indName,
            query: {
                bool: {
                    must: [
                        { term: { "name": name } },
                        { term: { "dob": dob } },              
                        { term: { "joining_date": joind } }    
                    ]
                }
            }
        });

        console.log(JSON.stringify(firstStep, null, 2));

        if (!indName || !name || !dob || !joind) {
            return res.status(400).json({ error: "indName, name, dob, and joind are required" });
        }
        if (!firstStep || !firstStep.hits || firstStep.hits.hits.length === 0) {
            return res.status(404).json({ error: "Employee not found to update" });
        }
        console.log(firstStep && firstStep.hits.hits.length > 0);
        if (firstStep) {

            const docId = firstStep.hits.hits[0]._id;
            console.log("DocID: ", docId);
            const response = await client.update({
                // index: indName,
                index: indName,
                id: docId,
                // can do by using hash function also
                // id: `${data.name}_${data.dob}_${data.joining_date}`,

                body: {
                    doc: data,
                    // doc_as_upsert: true   // update works even if doc missing
                }
            });

            return res.json({
                message: `Updated employee with ID: ${docId}`,
                response
            });
        } else {
            return res.status(404).json({ error: "Employee not found to update" });
            // return null;
        }
    } catch (err) {
        // console.error("Error updating data:", err);
        console.error("Error updating data:", err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { update };
// update("employeev3", "Amit Sharma", "1991-08-30", "2021-06-15",
//     { department: "Manager", salary: 80000 }

// );
