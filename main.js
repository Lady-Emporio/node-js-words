const l=(...x)=>{console.log(...x);}

const ENV=require(__dirname+"/const");
const Urls = require('./urls');
const express = require('express')
const ejs = require('ejs')



// const Neode = require('neode')
// const instance = new Neode(ENV.get("neo4j_host"),ENV.get("neo4j_username"),ENV.get("neo4j_password"));
// const Orm=require('./models');
// const orm=new Orm(instance);

// for(let i=0;i!=30;++i){
//     //orm.createWord(`eng${i}`,`ru${i}`," "," ");
//     l(orm.createGroup(`group${i}`))
// }







var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var consoleLog = async function (req, res, next) {
    let log=new Date().toString()+" | "+req.path;
    l(log)
    next()
}
var basicAuth = async function (req, res, next) {
    if(!req.path.startsWith("/admin")){
        next();
        return;
    }

    res.set('WWW-Authenticate','Basic realm="Restricted"');
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if ( ENV.get("admin_name")==username && ENV.get("admin_password")== password){
        next()
        return;
    }
    console.log(`Authorization Error: ${username} ${password}`)
    return res.status(401).json({ message: `Authorization Error` });
}

app.use(consoleLog)
app.use(basicAuth)

const url=new Urls(app);

app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');


var listener=app.listen(ENV.get("express_port"),ENV.get("express_host"),
()=>{
    let address=listener.address();
    l(`Server on ${address.address}:${address.port} ${address.family}`);}
    )
l("end");

