require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routes");
const cors=require("cors")


app.use(cors("*"))
app.use(express.json());

app.use(userRouter);



app.get("/users",(req,res,next)=>{
  // set cache control
  res.header("Cache-Control","public,max-age=60")
  
  console.log("hit")


  res.json({message:"ok"})
})


app.use((error, req, res, next) => {
  const errorObj = {
    message: error?.message || "Something went wrong",
    status: error?.status || 500,
  };
  res.status(errorObj.status).json(errorObj);
});

app.listen(4000, () => {
  console.log("http://localhost:4000"); 
});
