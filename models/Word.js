const Word_model= {
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
module.exports=Word_model