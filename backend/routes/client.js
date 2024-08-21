const express = require("express")
const { createClient, getAllClient, getSingleClient, updateClient, deleteClient } = require("../controller/client")
const router = express.Router()

router.post("/create",createClient)
router.get("/getAllClient",getAllClient)
router.get("/getSingleClient/:id",getSingleClient)
router.put("/updateClient/:id",updateClient)
router.delete("/deleteClient/:id",deleteClient)
module.exports = router