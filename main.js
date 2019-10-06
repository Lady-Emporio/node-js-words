const l=(...x)=>{console.log(...x);}

const ENV=require(__dirname+"/const");
const Urls = require('./urls');
const express = require('express')
const ejs = require('ejs')




var app = express()
const url=new Urls(app);

app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

var listener=app.listen(ENV.get("express_port"),ENV.get("express_host"),
()=>{
    let address=listener.address();
    l(`Server on ${address.address}:${address.port} ${address.family}`);}
    )
l("end");

