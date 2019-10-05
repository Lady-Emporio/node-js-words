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

const Neode = require('neode')
const Urls = require('./urls');
const express = require('express')
const ejs = require('ejs')
const instance = new Neode(ENV.get("neo4j_host"),ENV.get("neo4j_username"),ENV.get("neo4j_password"));
const Orm=require('./models');
const orm=new Orm(instance);



async function mainTest(){
    //let collection= await orm.getALlWords();
    l("my start")

    //let id= await orm.createGroup("First group");
    //l(id)
    let collection=await instance.findById(orm.nameGroup, 97);
    l(collection.name)
    l(collection)
    
    l("my end")
}
mainTest();

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

