module.exports = function () {

    var cartModule = require('./module')();

    require('./service/api')(cartModule);
    require('./service/cart')(cartModule);
    require('./controller')(cartModule);

};