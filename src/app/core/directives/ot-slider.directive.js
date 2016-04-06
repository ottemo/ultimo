/**
 * Slick slider
 * https://github.com/kenwheeler/slick/blob/master/slick/slick.js
 *
 * Default Config
 * ----------------------------
 * accessibility: true,
 * adaptiveHeight: false,
 * appendArrows: $(element),
 * appendDots: $(element),
 * arrows: true,
 * asNavFor: null,
 * prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
 * nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
 * autoplay: false,
 * autoplaySpeed: 3000,
 * centerMode: false,
 * centerPadding: '50px',
 * cssEase: 'ease',
 * customPaging: function(slider, i) {
 * return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
 * },
 * dots: false,
 * dotsClass: 'slick-dots',
 * draggable: true,
 * easing: 'linear',
 * edgeFriction: 0.35,
 * fade: false,
 * focusOnSelect: false,
 * infinite: true,
 * initialSlide: 0,
 * lazyLoad: 'ondemand',
 * mobileFirst: false,
 * pauseOnHover: true,
 * pauseOnDotsHover: false,
 * respondTo: 'window',
 * responsive: null,
 * rows: 1,
 * rtl: false,
 * slide: '',
 * slidesPerRow: 1,
 * slidesToShow: 1,
 * slidesToScroll: 1,
 * speed: 500,
 * swipe: true,
 * swipeToSlide: false,
 * touchMove: true,
 * touchThreshold: 5,
 * useCSS: true,
 * useTransform: false,
 * variableWidth: false,
 * vertical: false,
 * verticalSwiping: false,
 * waitForAnimate: true,
 * zIndex: 1000
 */
angular.module('coreModule')
    .directive('otSlider', [
        '$timeout',
        function($timeout){
            return {
                restrict: 'A',
                scope: {
                    config: '='
                },
                link: function(scope, element) {
                    activate();

                    ///////////////////////

                    function activate() {
                        $timeout(function(){
                            var $el = $(element);
                            $el.slick(scope.config)
                        })
                    }
                }
            }
        }
    ]);