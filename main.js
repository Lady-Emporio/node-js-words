
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

const l = (x) => { console.log(x); }

const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver(Login.host(), neo4j.auth.basic(Login.username(), Login.password()));

const session = driver.session();

const run = (session, query,...fields) => {
    var fields=fields;
    session
        .run(query)
        .subscribe({
            onNext: function (record) {
                for(let field of fields){
                    let value=record.get(field);
                    l(value);
                }

            },
            onCompleted: function () {
                l("close session");
                session.close();
            },
            onError: function (error) {
                l(error);
            }
        });

}
run(session, "MATCH (n) RETURN n","n");

l("End");
