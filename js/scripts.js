
(function ($, window, document) {
    $(function () {

        $.ajax({
            url:"./js/amounts.json",
            done: function(data) {
                console.log(data);
            },
            fail: function(e) {
               console.log(e);
            }
        });

    });
    // document ready
}(window.jQuery, window, document))