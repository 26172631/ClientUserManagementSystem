require("dotenv").config();
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
app.use(cors({
    origin: "https://clientusermanagementsystem.netlify.app"
}));
app.use("/admin",require("./routes/admin"))
app.use("/client",require("./routes/client"))
app.use("/user",require("./routes/user"))
const port = 4000

mongoose.connect(process.env.DB_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`Server listening on ${port}`)
    })
})