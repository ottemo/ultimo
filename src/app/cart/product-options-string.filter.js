angular.module('cartModule')

.filter('productOptionString', function(){
    return function(val) {
        return val instanceof Array ? val.join(", ") : val;
    };
});