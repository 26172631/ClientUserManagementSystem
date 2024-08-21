const express = require("express")
const { createUser, getAllUser, getSingleUser, updateUser, deleteUser } = require("../controller/user")
const router = express.Router()

router.post("/create",createUser)
router.get("/getAllUser",getAllUser)
router.get("/getSingleUser/:id",getSingleUser)
router.put("/updateUser/:id",updateUser)
router.delete("/deleteUser/:id",deleteUser)
module.exports = router