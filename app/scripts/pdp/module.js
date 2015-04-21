module.exports = function () {

    var pdpModule = require('./init')();

    require('./controller')(pdpModule);
    require('./service/api')(pdpModule);
    require('./service/options')(pdpModule);
    require('./service/product')(pdpModule);
    require('./directive/guiCustomOptions')(pdpModule);

};

