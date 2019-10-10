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
async function Word_List(req,res){
    let id_start=0;
    let text=`
    MATCH (n:Word) RETURN n
    ORDER BY n.eng
    SKIP ${id_start} 
    LIMIT 3
    `
    words=await orm.stuff.cypher(text);

    let array=[]
    for(let i=0; i!=words.records.length;++i){
        wordObject=words.records[i].get("n").properties;
        array.push(wordObject);
    }
    res.render("word_list", {words:array,id_start:id_start});
}

async function Word_Save(req,res){
    if( undefined==req.body.eng ||
        undefined==req.body.ru,
        undefined==req.body.env_value,
        undefined==req.body.example
        ){ 
            res.status(452).json({ message: 'Bad form' });
            return;
        }
    let id=await orm.createWord(
        req.body.eng,
        req.body.ru,
        req.body.env_value,
        req.body.example);
    res.redirect(`../${id}`);
    // console.log(req.body)
    // res.json(req.body)
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
async function Group_list(req,res){
    let id_start=0;
    let text=`
    MATCH (n:Group) RETURN n
    ORDER BY n.name
    SKIP ${id_start} 
    LIMIT 3
    `
    res.render("group_list.ejs", {group:array,id_start:id_start});
}
async function getNextWords(req, res){
    let id_start=req.params.wordStart;
    if (id_start<=0){
        id_start=0;
    }
    let text=`
    MATCH (n:Word) RETURN n
    ORDER BY n.eng
    SKIP ${id_start} 
    LIMIT 3
    `
    words=await orm.stuff.cypher(text);

    let array=[]
    for(let i=0; i!=words.records.length;++i){
        wordObject=words.records[i].get("n").properties;
        array.push(wordObject);
    }
    res.render("word_list", {words:array,id_start:id_start});
} 
module.exports = {
    index: index,
    Word_FormObject:Word_FormObject,
    Group_FormObject:Group_FormObject,
    e404:e404,
    Word_Save:Word_Save,
    Word_List:Word_List,
    getNextWords:getNextWords,
    Group_list:Group_list,
};
    