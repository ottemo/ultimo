angular.module("contactModule", [
	"ngRoute",
	"coreModule"
])
.config([
    "$routeProvider",
    function ($routeProvider) {
        $routeProvider
        .when('/contact', {
            title: "Contact Us",
            templateUrl: "/views/contact/view.html",
            controller: "contactController"
        });
    }
]);
