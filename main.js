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


instance.model('Word', {
    word_id: {
        primary: true,
        type: 'uuid',
        required: true, // Creates an Exists Constraint in Enterprise mode
    },
    // payroll: {
    //     type: 'number',
    //     unique: 'true', // Creates a Unique Constraint
    // },
    eng: {
        type: 'string',
        index: true, 
    },
    ru: {
        type: 'string',
        index: true,
    },
    env_value: {
        type: 'string',
    },
});
var createWord=(eng,ru,env_value)=>{
    instance.create('Word', {
        eng       : eng,
        ru        : ru,
        env_value : env_value
    })
}
var seeAllWords=()=>{
    instance.all('Word')
    .then(collection => {
        l(collection);
        //console.log(collection.get(0).get('name')); // 'Adam'
    })
}
// var app = express()
// app.set('views', __dirname + '/templates');
// app.set('view engine', 'ejs');



// app.get('/', function (req, res) {
//     res.render("index", {});
// })


// var listener=app.listen(ENV.get("express_port"),ENV.get("express_host"),
// ()=>{
//     let address=listener.address();
//     l(`Server on ${address.address}:${address.port} ${address.family}`);}
//     )
createWord("test eng","test ru","test eng value");
l("end");