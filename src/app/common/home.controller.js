(function() {
    angular
        .module("commonModule")
        .controller("HomeController", ["$scope", HomeController]);

    function HomeController($scope) {

        $scope.sliderContent = [{
            img: 'common/home/slide1.jpg',
            link: '/mens'
        }, {
            img: 'common/home/slide2.jpg',
            link: '/womens'
        }, {
            img: 'common/home/slide3.jpg',
            link: '/sale'
        }];
    }

})();

