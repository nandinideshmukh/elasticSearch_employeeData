const express = require("express");
const router = express.Router();

const getall = require("../controllers/getWholedata");
const insert = require("../controllers/insertData");
const update = require("../controllers/updateEmp");
const delet = require("../controllers/deleteEmp");
const search = require("../controllers/searchEmployee");

router.get('/getAll',getall.getAllEmployees);
router.post('/insert',insert.insert);
router.get('/search',search.search);
router.put('/update',update.update);
router.delete('/del',delet.deleteEmployee);

module.exports = router;

