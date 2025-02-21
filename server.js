const express = require("express");
const erroHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();

connectDb();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require("./routes/ContactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(erroHandler);

app.listen(port, ()=>{
    console.log(`server running on ${port}`);
})