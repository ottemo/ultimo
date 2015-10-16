angular.module('designModule')
    .directive('otSlider', [
        '$timeout',
        function($timeout){
            return {
                restrict: 'A',
                // scope: {

                // },
                link: function(scope, element) {

                    activate();

                    ///////////////////////

                    function activate() {
                        $timeout(function(){
                            var $el = $(element);
                            $el.slick({

                            })
                        })
                    }
                }
            }
        }
    ]);