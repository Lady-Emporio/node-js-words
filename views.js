const l=(...x)=>{console.log(...x);}
const Neode = require('neode')

const ENV=require(__dirname+"/const");
const instance = new Neode(ENV.get("neo4j_host"),ENV.get("neo4j_username"),ENV.get("neo4j_password"));
const Orm=require('./models');
const orm=new Orm(instance);


function index(req, res) {
    res.render("index", {});
}

async function Word_FormObject(req, res) {
    let wordId=req.params.wordId;
    let word= await orm.stuff.model(orm.nameWord).findById(wordId);
    var values={
        eng: (word) ? word.get("eng") : "",
        ru: (word) ? word.get("ru") : "",
        env_value: (word) ? word.get("env_value") : "",
        example: (word) ? word.get("example") : "",
        date_create: (word) ? word.get("date_create") : "",
    }
    res.render("word", {
        values:values,
        key:(word) ? wordId : null,
        submitText:(word) ? "Save": "Create",
    });
}

function Group_FormObject(req, res) {
    res.end("Group_FormObject");
}

function e404(req, res) {
    let params={
        path : req.path,
        method: req.method,
        protocol:req.protocol,  
        params:req.params,
        headers:req.headers,
        query:req.query,
    }
    jsonParams=JSON.stringify(params,null,"\t");
    let return_text="Page not found\n"+jsonParams;
    res.end(return_text);
}
module.exports = {
    index: index,
    Word_FormObject:Word_FormObject,
    Group_FormObject:Group_FormObject,
    e404:e404,
};
    