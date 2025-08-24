const express = require("express");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/page2page");

const app = express();
// to parse into json
app.use(express.json());

app.use("/employees", employeeRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
