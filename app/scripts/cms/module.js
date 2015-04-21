module.exports = function () {

    var cmsModule = require('./init')();

    require('./controller/page')(cmsModule);
    require('./service/api')(cmsModule);
    require('./service/page/')(cmsModule);

};