module.exports = function() {

    var commonModule = require('./init')();

    require('./service/api')(commonModule);
    require('./service/breadcrumbs')(commonModule);
    require('./service/header')(commonModule);
    require('./service/page')(commonModule);
    require('./service/rewrite')(commonModule);
    require('./service/sidebar')(commonModule);
    require('./service/utils')(commonModule);
    require('./controllers')(commonModule);

};

