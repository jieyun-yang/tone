NProgress.configure({ showSpinner: false });
NProgress.start();
NProgress.set(0.45);
jQuery.easing.def = 'easeInOutCirc';
var overBack = 0;
var overAvatar = 0;

$(document).ready(function(){
    NProgress.done();
    var url = window.location.pathname;
    var activePage = url.substring(url.lastIndexOf('/') + 1);

    // $('.background').load('/feed', function(){
    //     NProgress.done(); 
    //     later();
    // });
    
    switch (activePage) 
    {
        case 'feed':
        $('.feedPage').addClass('active');
        break;
        case 'myproject':
        $('.myproject').addClass('active');
        break;
        // case 'search':
        // $('.contact').addClass('active');
        // break;
        
    }

    // function later(){
        $('.closeButton').click( function(){
            event.preventDefault();
            $('#sidebar-wrapper').removeClass('active');
            window.setTimeout(function(){
                $('#menu-toggle').removeClass('animated fadeOut');
                $('#menu-toggle').addClass('animated fadeIn');},400);
            $('.closeButton').css('display','none');
        });

        $('#menu-toggle').click(function() {
            event.preventDefault();
            $('#menu-toggle').removeClass('animated fadeIn');
            $('#menu-toggle').addClass('animated fadeOut');
            window.setTimeout(function(){
                $('#sidebar-wrapper').addClass('active');},400);
            $('.closeButton').css('display','block');
        });
    // }


    var editor = new MediumEditor('.editable', {
            buttonLabels: 'fontawesome',
            buttons: ['bold', 'italic', 'underline', 'anchor', 'header1', 'header2', 'quote', 'image'],
            firstHeader: 'h1',
            secondHeader: 'h2',
            placeholder: 'Write something...'
        });
    
    
            
    $('.gotop').click(function(){
    event.preventDefault();
    $('html,body').animate({
          scrollTop:0
        }, {duration: 1500});
    });

    // var data = {};
    // data.title = $('.new-title').val();
    // data.subtitle = $('.new-subtitle').val();
    // data.post = $('.editable').html();
    
    // $.ajax({
    //     type: 'POST',
    //     data: JSON.stringify(data),
    //     contentType: 'application/json',
    //     url: 'http://localhost:8888/newproject',                      
    //     // success: function(data) {
    //     //     console.log('success');
    //     //     console.log(JSON.stringify(data));
    //     // }
    // });

     $('.publish-button').click(function(){

        var userHref = $('.myproject').attr('href');
        var tempbackground = $('#postBackground').attr('src');
        if(tempbackground.indexOf("/images/") < 0){
            tempbackground = '/images/background/18.jpg';
        }
        event.preventDefault();
        $.ajax({
            url: '/newproject', 
            type: 'POST', 
            contentType: 'application/json', 
            data: JSON.stringify({title: $('#new-title').val(), subtitle: $('#new-subtitle').val(), post: $('#new-post').html(), tempbackground:tempbackground}),
            success: function() {
               location.href= userHref;
            }
        });
     });

     $('.project-background-wrapper').mouseenter(function(){
        overBack=1;
        if(overAvatar==0){
            $(this).find('.project-background').css('-webkit-filter','brightness(0.7)');
        }
     });
     $('.project-background-wrapper').mouseleave(function(){
        overBack=0;
        $(this).find('.project-background').css('-webkit-filter','brightness(0.85)');
     });
    
     $('.feed-profile-container').mouseenter(function(){
        overAvatar=1;
        $(this).find('.feed-avatar').css('border','1px solid #fff');        
        $(this).parent().parent().find('.project-background').css('-webkit-filter','brightness(0.85)');
     });

     $('.feed-profile-container').mouseleave(function(){
        overAvatar=0;
        $(this).find('.feed-avatar').css('border','none');        
        if(overBack==1){
            $(this).parent().parent().find('.project-background').css('-webkit-filter','brightness(0.7)');
        }
     });

     $('.feed-profile-container').click(function(){
        event.preventDefault();
        location.href = $(this).find('.author-url').text();
     });

     $('.user-wrapper').mouseenter(function(){
        $('.projectpage-avatar').css('border','1px solid #fff');
     });
     $('.user-wrapper').mouseleave(function(){
        $('.projectpage-avatar').css('border','none');
     });

     // $('.projectcontainer article embed').attr('align','center');
     $('.publish-changes-button').click(function(){
        event.preventDefault();
        var postHref = $('.publish-changes-button').attr('href');
        var tempbackground = $('#edit-background').attr('src');
        if(tempbackground.indexOf("/images/") < 0){
            tempbackground = '/images/background/18.jpg';
        }
        $.ajax({
            url: postHref+'/edit', 
            type: 'POST', 
            contentType: 'application/json', 
            data: JSON.stringify({title: $('#edit-title').val(), subtitle: $('#edit-subtitle').val(), post: $('#edit-post').html(), tempbackground: tempbackground}),
            success: function() {
               location.href= postHref;
            }
        });
     });



     $('.portrait a').mouseenter(function(){
       $(this).append('<i class="fa fa-gear fa-fw"></i>');
       $(this).find('img').css('cursor','pointer');
       $(this).find('img').css('-webkit-filter','brightness(0.8)');
     });

     $('.portrait a').mouseleave(function(){
       $(this).find('i').remove();
       $(this).find('img').css('-webkit-filter','none');
     });

     $('#changeUserBackground').mouseenter(function(){
       $(this).parent().append('<p style="font-family:source sans pro;font-size:13px;font-weight:300;position:absolute;top:54px;right:15px;color:#fff;">(size: <200kb)</p>');
       
     });

     $('#changeUserBackground').mouseleave(function(){
       $(this).parent().find('p').remove();
     });

     

     $('#changeUserBackground').click(function(){
        $('#uploadUserBackground').click();
     });



     $('#changePostBackground').mouseenter(function(){
       $(this).parent().append('<p style="font-family:source sans pro;font-size:15px;font-weight:300;position:absolute;bottom:39%;left:25%;color:#fff;">(size: <200kb)</p>');
       
     });

     $('#changePostBackground').mouseleave(function(){
       $(this).parent().find('p').remove();
     });

     $('#changePostBackground').click(function(){
        $('#uploadPostBackground').click();
     });


     $('#comment-button').click(function (argument) {
        $.ajax({
            url: '/p/'+$('#comment-postId').text(),
            type: 'POST', 
            contentType: 'application/json', 
            data: JSON.stringify({content: $('#comment').html() }),
            success: function() {
               location.href= '/p/'+$('#comment-postId').text();
            }
        });
     });

     var commentor = new MediumEditor('#comment', {
            buttonLabels: 'fontawesome',
            buttons: ['bold', 'italic', 'underline', 'anchor', 'header1', 'header2', 'quote'],
            firstHeader: 'h3',
            secondHeader: 'h4',
            placeholder: 'Leave a message'
        });

});

