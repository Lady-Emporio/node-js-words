const Word_model= {
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
module.exports=Word_model