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

});
