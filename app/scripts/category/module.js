module.exports = function () {

    var categoryModule = require('./init')();

    require('./service/api')(categoryModule);
    require('./service/category')(categoryModule);
    require('./controller')(categoryModule);

};
