const express = require('express');
const path = require('path')
const bodyParser = require("body-parser");
const router = require('./router')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/data', router);

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next)=>{
  res.status(500).send(JSON.stringify({
    err : err.message
  }))
})

const PORT = process.env.port || 3000;

app.listen(PORT, ()=>{
  console.log(`server is listening on port ${PORT}`);
})




