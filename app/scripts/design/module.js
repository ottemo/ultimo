module.exports = function(){

    var designModule = require('./init')();

    require('./service/design')(designModule);
    require('./service/api')(designModule);
    require('./service/image')(designModule);
    require('./service/states')(designModule);

    require('./directives/design')(designModule);
    require('./directives/guiBlock')(designModule);
    require('./directives/guiListBar')(designModule);
    require('./directives/guiMessageManager')(designModule);
    require('./directives/guiPaginator')(designModule);
    require('./directives/validator/between')(designModule);
    require('./directives/validator/date')(designModule);
    require('./directives/validator/email')(designModule);
    require('./directives/validator/len')(designModule);
    require('./directives/validator/number')(designModule);
    require('./directives/validator/password')(designModule);
    require('./directives/validator/positive')(designModule);
    require('./directives/validator/price')(designModule);
    require('./directives/validator/regexp')(designModule);
    require('./directives/validator/sku')(designModule);

}