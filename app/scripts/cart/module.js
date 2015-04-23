module.exports = function () {

    var cartModule = require('./init')();

    require('./service/api')(cartModule);
    require('./service/cart')(cartModule);
    require('./controller')(cartModule);

};