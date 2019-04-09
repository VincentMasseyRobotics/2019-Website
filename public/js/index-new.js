$(document).ready(function () {

    $('#contact-form').submit(function(e) {
        e.preventDefault();

        var email = $('#contact-email');
        var name = $('#contact-name');
        var message = $('#contact-message');

        swal({
            type: 'info',
            title: 'Processing message'
        });
        swal.showLoading()


        $.ajax({
            url: './contact',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                email: email.val(),
                name: name.val(),
                message: message.val()
            }),
            success: function (msg) {
                if (msg['message'] == "success") {
                    swal({
                        type: 'success',
                        title: 'Message sent!',
                        html: 'Thank you for contacting us! We\'ll respond as soon as possible.'
                    });

                    email.val("");
                    name.val("");
                    message.val("");
                } else {
                    swal(
                        'Oops...',
                        'Something went wrong! Please try again later.',
                        'error'
                    );
                }
            },
            error: function () {
                swal(
                    'Oops...',
                    'Something went wrong! Please try again later.',
                    'error'
                );
            }

        });
    });

    function updateScroll(position) {
        switch (position) {
            case 'hidden': // Hide bar when detached from top
                $('#nav-main').removeClass('nav-active');
                $('#nav-main').removeClass('nav-docked');
                $('#nav-main').addClass('nav-hidden');

                $("#nav-ham").attr("hidden", true);

                break;
            case 'body': // Body
                $('#nav-main').css('position', 'fixed');

                $('#nav-main').removeClass('nav-docked');
                $('#nav-main').addClass('nav-active');

                $('#nav-main').removeClass('nav-hidden');

                $('#mobile-overlay').removeClass('overlay-dark');
                $('#mobile-overlay').addClass('overlay-light');

                // Hide hamburger
                /*
                if ($('#nav-main-table').is(":hidden")) {
                    $("#nav-ham").attr("hidden", false);
                }*/

                break;
            default: // Top (Docked)
                $('#nav-main').css('position', 'absolute');
                $('#nav-main').addClass('nav-docked');
                $('#nav-main').removeClass('nav-active');
                $('#nav-main').removeClass('nav-hidden');

                $('#mobile-overlay').addClass('overlay-dark');
                $('#mobile-overlay').removeClass('overlay-light');

                /*
                if ($('#nav-main-table').is(":hidden")) {
                    $("#nav-ham").attr("hidden", false);
                }*/

                break;
        }
    };

    var wp = new Waypoint({
        element: document.getElementById('content'),
        handler: function(direction) {
            updateScroll(direction == 'down' ? 'body' : 'hidden');
        },
        offset: '50px'
    })

    var wp2 = new Waypoint({
        element: document.getElementById('page-header'),
        handler: function(direction) {
            updateScroll(direction == 'down' ? 'hidden' : 'docked');
        },
        offset: '-50px'
    })

    updateScroll('docked');

    $('.js-navbar-link').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 500, 'swing', function () {

        });
    });

    $('#year').html(new Date().getFullYear());

    $(".hamburger").on("click",function(){
        toggleOverlay();
    });

    $('a.overlayLink').click(function () {
        toggleOverlay();
    });

    var bgresize = function () {
        if($("#nav-ham").hasClass("is-active")){
            $("#nav-ham").toggleClass("is-active");
            $(".overlay").css({top: "-100%"});
            $("html").css({"overflow-y": "visible"});
        }

        if ($('body').width() < 1200) {

            $("#accordion").removeClass("hidden");
            $(".accordionCont").removeClass("hidden");
            $("#full-faq").addClass("hidden");
            $("#nav-ham").removeClass("hidden");

            //$("#navleft").hide();
            $("#navright").hide();

            $("#nav-inner").removeClass("container");
        } else {

            $("#accordion").addClass("hidden");
            $(".accordionCont").addClass("hidden");
            $("#full-faq").removeClass("hidden");
            $("#nav-ham").addClass("hidden");

            //$("#navleft").show();
            $("#navright").show();

            $("#nav-inner").addClass("container");
        }
    }

    bgresize();
    $(window).resize(bgresize);
    $(window).on("orientationchange", bgresize);
});

function toggleOverlay() {
    $("#nav-ham").toggleClass("is-active");

    if($("#nav-ham").hasClass("is-active")){
        $(".overlay").css({top: "0"});
        $("html").css({"overflow-y": "hidden"});
    } else{
        $(".overlay").css({top: "-100%"});
        $("html").css({"overflow-y": "visible"});
    }
}
