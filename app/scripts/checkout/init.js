module.exports = function () {

    var checkoutModule = require('./module')();

    require('./service/api')(checkoutModule);
    require('./service/checkout')(checkoutModule);
    require('./controller/accordion')(checkoutModule);
    require('./controller/onepage')(checkoutModule);

};

