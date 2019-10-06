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
module.exports=new CONSTS();