const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const port = 3000;
const userRouter =  require("./routes/userRoutes");
const { default: mongoose } = require('mongoose');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use("/user" , userRouter);


mongoose.connect("mongodb+srv://pgupta0049:g5h9TngSN3UEMKrM@webappnoter.bttokk7.mongodb.net/?retryWrites=true&w=majority")
.then(()=>
{
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch((error)=>{
  console.log(error);
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})




