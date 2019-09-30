
class Login {
    constructor() {
        throw new Error("Only static. Not create object. For left value. This is namespace");
    }
    static host() {
        return "bolt://localhost:7687";
    }
    static username() {
        return "neo4j";
    }
    static password() {
        return "12345";
    }
}

var TypeUrlVariable = {"int":1, "str":2};
Object.freeze(TypeUrlVariable);


const l = (x) => { console.log(x); }

// const neo4j = require('neo4j-driver').v1;
// const driver = neo4j.driver(Login.host(), neo4j.auth.basic(Login.username(), Login.password()));

// const session = driver.session();

// const run = (session, query,...fields) => {
//     var fields=fields;
//     session
//         .run(query)
//         .subscribe({
//             onNext: function (record) {
//                 for(let field of fields){
//                     let value=record.get(field);
//                     l(value);
//                 }

//             },
//             onCompleted: function () {
//                 l("close session");
//                 session.close();
//             },
//             onError: function (error) {
//                 l(error);
//             }
//         });

// }
// run(session, "MATCH (n) RETURN n","n");

class UrlPattern{
    constructor(url,callback) {
        this.url=url;
        this.callback=callback;
        this.reg = new RegExp(url);
        this.Variable={};
        this.__init();
    }
    isMatch(string){
        return this.reg .test(string);
    }
    __init(){
        var give_back={"end":-1,"values":[]};
        for(let i=0;i<this.url.length;){
            this.__getValue(i,give_back);
            i=give_back.end;
        }
        l(give_back.values);
    }
    __getValue(start,return_back){
        let isNotFound=false;
        for(let i=start;i!=this.url.length;++i){
            let str=this.url[i];
            var end=-1;
            var isGood=false;
            if("<"==str){
                start=i;
                for(let i2=i+1;i2!=this.url.length;++i2){
                    let str=this.url[i2];
                    if("<"==str){
                        throw new Error(`Error: << in url: ${this.url}.`);
                    }else if (">"==str){
                        end=i2;
                        isGood=true;
                        break;
                    }
                };
            }
            if(isGood){
                break;
            }
            if(i==this.url.length-1){
                isNotFound=true;
            }
        }
        if (isNotFound){
            return;
        }
        let value=this.url.slice(start+1, end);
        return_back.values.push(value)
        return_back.end=end+1;
        return;
    }
    
}

const urlPatterns=[
    new UrlPattern(`/words/<${TypeUrlVariable.int}:id>/<${TypeUrlVariable.str}:book>/test/<${TypeUrlVariable.int}:puppy>`),
];
//l(urlPatterns[0].url);
l("End");
