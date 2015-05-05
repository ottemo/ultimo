module.exports = function() {
    (function ($) {

        $(document).ready(function () {

            $(document).on('click', '#navbar li:not(.cart-wrapper)', function(event) {
                event.preventDefault();
                $('#navbar ul li').removeClass('active');
                $(this).addClass('active');
            });

            //button click and hide popup
            $(document).on('click', '.modal-footer a', function(event) {
                $('.modal').modal('hide');
            });


            $(document).on('click', '#modal-registration', function(event) {
                $("#form-login").modal("hide");
                $("#form-registration").modal("show");
            });

            $(document).on('click', '#modal-login', function(event) {
                $("#form-registration").modal("hide");
                $("#form-login").modal("show");
            });

        });

    })(jQuery);

    require('./common/init')();
    require('./category/init')();
}
