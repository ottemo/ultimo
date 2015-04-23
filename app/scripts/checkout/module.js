module.exports = function () {

    var checkoutModule = require('./init')();

    require('./service/api')(checkoutModule);
    require('./service/checkout')(checkoutModule);
    require('./controller/accordion')(checkoutModule);
    require('./controller/onepage')(checkoutModule);

};

