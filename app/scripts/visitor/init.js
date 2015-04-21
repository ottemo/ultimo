module.exports = function () {

    var fb = require('./service/facebook')();
    var gl = require('./service/google')();

    var visitorModule = require('./module')(fb, gl);

    require('./service/api')(visitorModule);
    require('./service/login')(visitorModule, fb, gl);
    require('./controller/account')(visitorModule);
    require('./controller/address')(visitorModule);
    require('./controller/login')(visitorModule, gl);
    require('./controller/logout')(visitorModule);
    require('./controller/order')(visitorModule);

};
