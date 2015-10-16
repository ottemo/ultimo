(function() {
    angular
        .module("commonModule")
        .controller("HomeController", ["$scope", HomeController]);

    function HomeController($scope) {

        $scope.sliderContent = [{
            img: 'common/home/slide1.jpeg',
            link: ''
        }, {
            img: 'common/home/slide2.jpeg',
            link: ''
        }, {
            img: 'common/home/slide3.jpeg',
            link: ''
        }];
    }

})();

