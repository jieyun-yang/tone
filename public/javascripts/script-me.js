NProgress.configure({ showSpinner: false });
NProgress.start();
NProgress.set(0.45);
$(document).ready(function(){
    NProgress.done();
    var socket = io.connect();
    var mood;
    $('.red-info').css('background-color', 'rgb('+$('input[name=red]').val()+',0,0)');
    $('input[name=red]').on('change mousemove', function() {
    	$('.red-info').css('background-color', 'rgb('+$("input[name=red]").val()+',0,0)');
    });
    $('.green-info').css('background-color', 'rgb(0,'+$('input[name=green]').val()+',0)');
    $('input[name=green]').on('change mousemove', function() {
    	$('.green-info').css('background-color', 'rgb(0,'+$('input[name=green]').val()+',0)');
    });
    $('.blue-info').css('background-color', 'rgb(0,0,'+$('input[name=blue]').val()+')');
    $('input[name=blue]').on('change mousemove', function() {
    	$('.blue-info').css('background-color', 'rgb(0,0,'+$('input[name=blue]').val()+')');
    });

    $('.my-tone-color').css('background-color', 'rgb('+$('input[name=red]').val()+','+$('input[name=green]').val()+','+$('input[name=blue]').val()+')');
    $('input[type=range]').on('change mousemove', function() {
    	$('.my-tone-color').css('background-color', 'rgb('+$('input[name=red]').val()+','+$('input[name=green]').val()+','+$('input[name=blue]').val()+')');
    	socket.emit('set-tone-color',{
	    	red: $('input[name=red]').val(),
	    	green: $('input[name=green]').val(),
	    	blue: $('input[name=blue]').val()
	    });
    });

    socket.on('percentages', function (data) {
        var moodData = Math.max(data.happy.percentage, data.excited.percentage, data.sad.percentage, data.mad.percentage, data.jealous.percentage, data.upset.percentage,
    data.comfort.percentage, data.fear.percentage, data.surprised.percentage);
        switch (moodData) {
            case data.happy.percentage:
            mood = 'happy';
            break;
            case data.excited.percentage:
            mood = 'excited';
            break;
            case data.sad.percentage:
            mood = 'sad';
            break;
            case data.mad.percentage:
            mood = 'mad';
            break;
            case data.jealous.percentage:
            mood = 'jealous';
            break;
            case data.upset.percentage:
            mood = 'upset';
            break;
            case data.comfort.percentage:
            mood = 'comfort';
            break;
            case data.fear.percentage:
            mood = 'fear';
            break;
            case data.surprised.percentage:
            mood = 'surprised';
            break;
            default:
            mood = 'happy';
        }
    });
    var currentMood = 'mad';
    window.setInterval(function(){
        var lastMood = currentMood;
        $('.'+lastMood).addClass('hiden');
        currentMood = mood?mood:'mad';
        $('.'+currentMood).removeClass('hiden');
    },2000);

    
});

