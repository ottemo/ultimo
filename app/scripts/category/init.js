module.exports = function () {

    var categoryModule = require('./module')();

    require('./service/api')(categoryModule);
    require('./service/category')(categoryModule);
    require('./controller')(categoryModule);

};
