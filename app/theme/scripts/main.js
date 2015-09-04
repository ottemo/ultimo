$(document).ready(function () {


    /**
     * Modals
     */

    $(document).on('click', '.modal-footer a', function (event) {
        $('.modal').modal('hide');
    });

    // Mail chimp modal, close on submit btn click
    $(document).on('click', '#mc-embedded-subscribe', function () {
        $('.modal').modal('hide');
    });

    /**
     * Menu
     */

    // Let our menu drop downs fire on hover
    // this takes advantage of the bootstrap css, and gets
    // the mobile menu playing nice
    $(document).on('mouseenter', '.main-menu .dropdown', function() {
        $(this).addClass('open')
    });
    $(document).on('mouseleave', '.main-menu .dropdown', function() {
        $(this).removeClass('open')
    });

    // Don't follow top level dropdown links on mobile
    // this seems to work for ios, but chrome simulator still fetches the page
    if (window.innerWidth < 767) {
        $(document).on('click', '.main-menu .dropdown > a', function(e){
            e.preventDefault();
            e.stopPropagation();
        });
    };

    // Collapse the mobile menu if you click on any link that isn't a dropdown toggle
    $(document).on('click', '.main-menu li:not(.dropdown) > a', function(e){
        var $navToggle = $('.navbar-toggle');
        if ($navToggle.is(':visible')) {
            $navToggle.click();
        }
    });

    // Following the active class
    $(document).on('click', '#navbar li:not(.cart-wrapper)', function (event) {
        event.preventDefault();
        $('#navbar ul li').removeClass('active');
        $(this).addClass('active');
    });

    /**
     * tabs on cms pages
     */
    $(document)
        .on('click', '.nav-tabs a.data-toggle-tab', function(e){
            e.preventDefault();

            // Update the active nav tab
            $(this).parent().addClass('active')
            .siblings().removeClass('active');

            // Figure out which tab-pane to target
            var targetClasses = $(this).attr('class').split(' ');
            var startsWith = 'data-target-';
            var target = '';
            $.each(targetClasses, function(i, el){
                if(el.substr(0, startsWith.length) == startsWith){
                    target = el.substr(startsWith.length);

                    return false;
                }
            });

            // Add the active class to the tab pane
            $('.tab-pane-' + target).addClass('active')
            .siblings().removeClass('active');

        });
});
