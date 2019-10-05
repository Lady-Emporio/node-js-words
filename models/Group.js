const model_Group={
    group_id: {
        primary: true,
        type: 'uuid',
        required: true, // Creates an Exists Constraint in Enterprise mode
    },
    name: {
        type: 'string'
    },
    date_create:{
        type:"datetime",
        default: () => new Date(),
        index: true,
    }
};
module.exports=model_Group