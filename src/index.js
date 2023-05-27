const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

var bodyParser = require('body-parser')
const app = express();
const port = 3000;
const userRouter =  require("./routes/userRoutes");
const { default: mongoose } = require('mongoose');
const { noteRouter } = require('./routes/noteRoutes');

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());



app.use("/user" , userRouter);
app.use("/notes" , noteRouter);
app.get("/" , (res,req)=>
{
  res.send("NotesKeeper API with link to drives");
})


mongoose.connect(process.env.MONGO_URL)
.then(()=>
{
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })
}).catch((error)=>{
  console.log(error);
})





