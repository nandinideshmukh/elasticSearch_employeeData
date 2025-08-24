// import { client } from './app.js'
const client = require("./utils/clientConnect.js");

const Mappings = {
    mappings: {
        properties: {
            name: {
                type: "keyword",
            },
            email: {
                type: "keyword",
            },
            contact: {
                type: "keyword"
            },
            dob: {
                type: "date", format: "yyyy-MM-dd"
            },
            skills: {
                type: "text"
            },
            salary: {
                type: "float"
            },
            location: {
                type: "geo_point"
            },
            joining_date: {
                type: "date", format: "yyyy-MM-dd"
            },
            experience: {
                type: "integer"
            },
            department: {
                type: "keyword"
            },
            rating: {
                type: "float",
            },
        }
    }
};

async function createInd() {
    const indName = "employeev3";
    const checkExists = await client.indices.exists({ index: indName });

    try {
        if (!checkExists) {
            await client.indices.create({
                index: indName,
                body: Mappings,
            });
            console.log(`Index "${indName}"" created!`);
        }
        else {
            console.log("Index with name employee already exists");
        }
    }
    catch (err) {
        console.error("Error creating index!", err);
    }
    finally{
        console.log("Completed testing..");
    }
}
module.exports  = createInd;
// createInd()