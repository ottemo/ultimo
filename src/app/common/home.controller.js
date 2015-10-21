(function() {
    angular
        .module("commonModule")
        .controller("HomeController", ["$scope", HomeController]);

    function HomeController($scope) {

        $scope.sliderContent = [{
            img: 'common/home/slide1.jpg',
            link: ''
        }, {
            img: 'common/home/slide2.jpg',
            link: ''
        }, {
            img: 'common/home/slide3.jpg',
            link: ''
        }];
    }

})();

