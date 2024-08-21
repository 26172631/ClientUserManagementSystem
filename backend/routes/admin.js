const express = require("express")
const { adminSignup, adminLogin, checkToken } = require("../controller/admin")
const router = express.Router()

router.post("/signup", adminSignup);
router.post("/login", adminLogin); 
router.get('/protected-route', checkToken, (req, res) => {
    res.json({ success: true, message: "You have accessed a protected route!", adminData: req.admin });
});
module.exports = router