const l=(...x)=>{console.log(...x);}
class CONSTS {
    constructor() {
        this.__params={
            "neo4j_host":"bolt://localhost:7687",
            "neo4j_username":"neo4j",
            "neo4j_password":"12345",
            "express_port":7899,
            "express_host":"localhost",
        };
    }
    get(name){
        let value=this.__params[name];
        if(undefined==value){
            throw new Error(`Env not have: "${name}" .`);
        }
        return value;
    }
}
const ENV=new CONSTS();

var Neode = require('neode')
var express = require('express')
var ejs = require('ejs')
const instance = new Neode(ENV.get("neo4j_host"),ENV.get("neo4j_username"),ENV.get("neo4j_password"));
var app = express()
// app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render("index", {});
})


app.listen(ENV.get("express_port"),ENV.get("express_host"),()=>{l(`app in: ${ENV.get("express_host")}:${ENV.get("express_port")}`);})