module.exports = function () {

    var filtersModule = require('./init')();

    require('./trustedUrl')(filtersModule);

};
