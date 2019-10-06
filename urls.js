
const views = require('./views');
const ReqType={GET:"GET",POST:"POST",ALL:"ALL"}
// 1 arg=path
// 2 arg=views
// 3 arg=type
const urls=[
    ["/",views.index,ReqType.ALL],
    ["/word/:wordId([0-9]{1,})/",views.Word_FormObject,ReqType.ALL],
    ["/group/:groupId([0-9]{1,})/",views.Group_FormObject,ReqType.ALL],
    ["*",views.e404,"ALL"]
]

class Urls{
    constructor(app){
        this.urls=urls;
        for (let url of this.urls){
            let path=url[0];
            let view=url[1];
            let typeRequest=url[2];
            switch(typeRequest){
                case ReqType.GET:
                    app.get(path,view);
                    break;
                case ReqType.POST:
                    app.post(path,view);
                    break;
                case ReqType.ALL:
                    app.all(path,view);
                    break;
            }
        }
    }
};
module.exports = Urls;