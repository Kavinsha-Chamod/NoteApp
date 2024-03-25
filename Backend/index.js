const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connection} = require('./db');
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const port = process.env.PORT;
const app = express();
const corsConfig = {
  origin: "*",
  methods: ["GET","PATCH","POST","DELETE"],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.options("",cors(corsConfig));
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