const l=(...x)=>{console.log(...x);}


const model_Word = require("./Word");
const model_Group = require("./Group");
class Orm{
    constructor(instance){
        this.nameGroup="Group";
        this.nameWord="Word";
        this.parentRelateName="Parent";
        //https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/stuff_1
        this.stuff=instance;

        this.stuff.model(this.nameWord,model_Word);
        this.stuff.model(this.nameGroup,model_Group);
        console.log("Model not drop.");
    };

    async createWord(eng,ru,env_value,example){
        let some=await this.stuff.create(this.nameWord, {
            eng: eng,
            ru: ru,
            env_value : env_value,
            example:example
            })
        let id=some.id();
        return id;
    };
    async createGroup(name){
        let some=await this.stuff.create(this.nameGroup, {
            name: name,
            })
        let id=some.id();
        return id;
    };
    async getALlWords(){
        let promise =this.stuff.all(this.nameWord)
        let result=await promise;
        return result;
    };
}
module.exports=Orm;