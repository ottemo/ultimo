module.exports = function () {

    var pdpModule = require('./module')();

    require('./controller')(pdpModule);
    require('./service/api')(pdpModule);
    require('./service/options')(pdpModule);
    require('./service/product')(pdpModule);
    require('./directive/guiCustomOptions')(pdpModule);

};

