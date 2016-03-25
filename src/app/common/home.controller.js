(function() {
    angular
        .module("commonModule")
        .controller("HomeController", ["$scope", HomeController]);

    function HomeController($scope) {

        $scope.sliderContent = [{
            img: '/images/common/home/slide1.jpg',
            link: '/mens'
        }, {
            img: '/images/common/home/slide2.jpg',
            link: '/womens'
        }, {
            img: '/images/common/home/slide3.jpg',
            link: '/sale'
        }];
    }

})();

