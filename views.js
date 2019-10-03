
function index(req, res) {
    res.render("index", {});
}
function NotKnowAsSay1(req, res) {
    res.end("Test function1");
}
function NotKnowAsSay2(req, res) {
    res.end("Test function2");
}
module.exports = {
    index: index,
    NotKnowAsSay1:NotKnowAsSay1,
    NotKnowAsSay2:NotKnowAsSay2,
};
    