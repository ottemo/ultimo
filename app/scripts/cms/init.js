module.exports = function () {

    var cmsModule = require('./module')();

    require('./controller/page')(cmsModule);
    require('./service/api')(cmsModule);
    require('./service/page/')(cmsModule);

};