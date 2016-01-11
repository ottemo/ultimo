angular.module("filtersModule")

.filter('htmlToText', function(){
    return function(html) {
        return  html ? String(html).replace(/<[^>]+>/gm, '') : '';
    }
});
