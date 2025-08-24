const { Client } = require("@elastic/elasticsearch");
require('dotenv').config()
// console.log("ENV:", process.env.cloud_id, process.env.user);

const client = new Client({
    // node: "http://localhost:9200"
    cloud:{id: process.env.cloud_id},
    
    auth: {
        username:process.env.user,
        password:process.env.pass,
    },
    serverMode: 'serverless',
});

//  async function test() {
//   try {
//     const info = await client.info();
//     console.log("Connected yoo!", info);
//   } catch (err) {
//     console.error("Connection failed :(", err);
//   }
// }

// test();
module.exports = client;

