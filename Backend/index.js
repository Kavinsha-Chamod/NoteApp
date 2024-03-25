const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connection} = require('./db');
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const e = require('express');
const port = process.env.PORT;
const app = express();

app.use(cors(
  {
    origin: "https://note-app-client-wine.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
  }
));
app.use(express.json());
app.use("/users",userRouter);
app.use("/notes",noteRouter);

app.get("/",(req,res)=>{
  res.send({message:"Api is working" })
})


app.listen(port,async()=>{
  try {
    await connection
    console.log("Database connected")
  } catch (error) {
    console.log(error) 
  }
  console.log(`App is running on port ${port}`);
});

module.exports = app;