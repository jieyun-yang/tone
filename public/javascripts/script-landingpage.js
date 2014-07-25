NProgress.configure({
    showSpinner: false
});
NProgress.start();
NProgress.set(0.25);


$(window).load(function() {
    NProgress.done();
});

$(document).ready(function() {

    var socket = io.connect('http://localhost:8888');
    socket.on('message', function(data) {
        console.log(data);
    });

    window.setTimeout(function() {
        $('.logo').css('visibility', 'visible');
        $('.logo').addClass('animated fadeInUp');
    }, 400);
    window.setTimeout(function() {
        $('.slogan').css('visibility', 'visible');
        $('.slogan').addClass('animated fadeInLeft');
    }, 500);
    window.setTimeout(function() {
        $('.signup-button').css('visibility', 'visible');
        $('.signup-button').addClass('animated fadeInUp');
    }, 800);
    window.setTimeout(function() {
        $('.login-button').css('visibility', 'visible');
        $('.login-button').addClass('animated fadeInUp');
    }, 1000);
    window.setTimeout(function() {
        $('.learnmore-button').css('visibility', 'visible');
        $('.triangleIcon').css('visibility', 'visible');
        $('.learnmore-button').addClass('animated fadeIn');
        $('.triangleIcon').addClass('animated fadeIn');
    }, 1200);



    $('.signup-button').click(function() {
        $('.background-img').css('-webkit-filter', 'brightness(0.8)');
        $('.logo').addClass('animated fadeOutUp');
        $('.slogan').addClass('animated fadeOutUp');
        $('.signup-button').addClass('animated fadeOutDown');
        $('.login-button').addClass('animated fadeOutDown');
        $('.learnmore-button').addClass('animated fadeOutDown');
        $('.triangleIcon').addClass('animated fadeOutDown');
        window.setTimeout(function() {
            $('.logo').css('display', 'none');
            $('.slogan').css('display', 'none');
            $('.signup-button').css('display', 'none');
            $('.login-button').css('display', 'none');
            $('.learnmore-button').css('display', 'none');
            $('.triangleIcon').css('display', 'none');
            $('.signup-form').css('display', 'inline-block');
        }, 400);
        window.setTimeout(function() {
            $('.form-group>input').css('visibility', 'visible');
            $('.form-group>input').addClass('animated fadeInLeft');
            $('.signup').css('visibility', 'visible');
            $('.signup').addClass('animated fadeInDown');
            $('.signup-form label').css('visibility', 'visible');
            $('.signup-form label').addClass('animated fadeInUp');
            $('#login').css('visibility', 'visible');
            $('#login').addClass('animated fadeInUp');
        }, 1000);

    });



    $('#login').click(function() {
        $('.signup-form').addClass('animated fadeOut');
        window.setTimeout(function() {
            location.href = '/login';
        }, 1000);
    });


    $('#signup').click(function() {
        $('.login-form').addClass('animated fadeOut');
    });



    $('.closeButton').click(function() {
        if (window.location.hash == '#s') {
            $('.signup-form').addClass('animated fadeOutDown');
            window.setTimeout(function() {
                location.href = '/';
            }, 500);
        }
        $('.background-img').css('-webkit-filter', 'none');
    });

    $('.learnmore-button').click(function() {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: value
        }, {
            duration: 1000
        });
    });

    $('.gotop').click(function() {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, {
            duration: 1500
        });
    });




    $(window).scroll(function() {

        var scrolled = $(window).scrollTop();

        var scrolledSafari = window.pageYOffset;

        if (scrolled < value || scrolledSafari < value) {
            $('.about').css('position', 'fixed');
            $('.about').css('top', '0');
        }

        if (scrolled > value || scrolledSafari > value) {
            $('.about').css('position', 'absolute');
            $('.about').css('top', value + 'px');
        }
    });

});