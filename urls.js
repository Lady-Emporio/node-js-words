
var views = require('./views');
// 1 arg=path
// 2 arg=views
// 3 arg=type
var urls=[
    ["/",views.index,"GET"],
    ["/qw/",views.NotKnowAsSay1,"POST"],
    ["/2",views.NotKnowAsSay2,"ALL"],
]

class Urls{
    constructor(app){
        this.urls=urls;
        for (let url of this.urls){
            let path=url[0];
            let view=url[1];
            let typeRequest=url[2];
            switch(typeRequest){
                case "GET":
                    app.get(path,view);
                    break;
                case "POST":
                    app.post(path,view);
                    break;
                case "ALL":
                    app.all(path,view);
                    break;
            }
        }
    }
};
module.exports = Urls;