const l=(...x)=>{console.log(...x);}
let prototypeWord={
    word_id: {
        primary: true,
        type: 'uuid',
        required: true, // Creates an Exists Constraint in Enterprise mode
    },
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
    example: {
        type: 'string',
    },
    date_create:{
        type:"datetime",
        default: () => new Date(),
        index: true,
    }
};
class Orm{
    constructor(instance){
        //https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/stuff_1
        this.stuff=instance;

        this.stuff.model('Word',prototypeWord);
        console.log("Model not drop.");
    };

    async createWord(eng,ru,env_value,example){
        let some=await this.stuff.create('Word', {
            eng: eng,
            ru: ru,
            env_value : env_value,
            example:example
            })
        let id=some.id();
        return id;
    };
    
    async getALlWords(){
        let promise =this.stuff.all('Word')
        let result=await promise;
        return result;
    };
}
module.exports=Orm;