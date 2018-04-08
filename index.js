const express = require('express');
const app = new express();
const path = require('path');
app.use("/", express.static(__dirname + "/"));

app.get('/', function(req, res){
    res.sendfile(path.join(__dirname + '/client.html'))
});

app.listen(8080);