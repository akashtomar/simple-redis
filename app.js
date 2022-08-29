const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = require('./routes');
const {handleError} = require('./middleware');
app.use(bodyParser.json());

app.get('/healthcheck', (req, res)=>{
    res.status(200).json({"message": "ok"});
});

app.use('/redis', router);

app.use(handleError);

app.listen(3000, ()=>{
    console.log("listening at 3000");
});