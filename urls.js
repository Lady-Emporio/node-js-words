
const views = require('./views');
const ReqType={GET:"GET",POST:"POST",ALL:"ALL"}
// 1 arg=path
// 2 arg=views
// 3 arg=type
const urls=[
    ["/",views.index,ReqType.ALL],
    ["/word/:wordId([0-9]{1,})/",views.Word_FormObject,ReqType.GET],
    ["/word/save/",views.Word_Save,ReqType.POST],
    ["/word/",views.Word_List,ReqType.GET],
    ["/group/",views.Group_list,ReqType.GET],
    ["/group/:groupId([0-9]{1,})/",views.Group_FormObject,ReqType.ALL],
    ["/ajax_w/:wordStart([0-9]{1,})/",views.getNextWords,ReqType.ALL],
    ["*",views.e404,ReqType.ALL]
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