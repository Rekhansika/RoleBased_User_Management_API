const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

// ROUTES
const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")

app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected")
})
.catch((err) => {
    console.log(err)
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})