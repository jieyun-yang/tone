NProgress.configure({ showSpinner: false });
NProgress.start();
NProgress.set(0.45);
var pieData = [
    {
        value: .25,
        color:"#a1d39b",
        highlight: "#b9e2b3",
        label: "Happy"
    },
    {
        value: .1,
        color: "#edb37a",
        highlight: "#ffc088",
        label: "Excited"
    },
    {
        value: .2,
        color: "#77a3e8",
        highlight: "#8db8f7",
        label: "Sad"
    },
    {
        value: .14,
        color: "#dd6c6c",
        highlight: "#ef8181",
        label: "Mad"
    },
    {
        value: .08,
        color: "#8e8edd",
        highlight: "#a4a4f4",
        label: "Jealous"
    },
    {
        value: .1,
        color: "#db83cf",
        highlight: "#f490ea",
        label: "Upset"
    },
    {
        value: .05,
        color: "#f7d38b",
        highlight: "#ffdea4",
        label: "Comfortable"
    },
    {
        value: .12,
        color: "#5eccc2",
        highlight: "#76e2d5",
        label: "Fear"
    },{
        value: .11,
        color: "#e2afaf",
        highlight: "#f4bdbd",
        label: "Surprised"
    }
];
var ctx = document.getElementById("chart-area").getContext("2d");
var myPie = new Chart(ctx).Pie(pieData,{
    showScale: true,
    responsive: true,
    animationSteps: 30,
    animationEasing: 'easeBounce'
});

$(document).ready(function(){
    NProgress.done();
    var socket = io.connect();
    var mood;
    var prevMood = 'happy';
    socket.on('percentages', function (data) {
        myPie.segments[0].value = data.happy.percentage;
        myPie.segments[1].value = data.excited.percentage;
        myPie.segments[2].value = data.sad.percentage;
        myPie.segments[3].value = data.mad.percentage;
        myPie.segments[4].value = data.jealous.percentage;
        myPie.segments[5].value = data.upset.percentage;
        myPie.segments[6].value = data.comfort.percentage;
        myPie.segments[7].value = data.fear.percentage;
        myPie.segments[8].value = data.surprised.percentage;
        myPie.update();
        $('.scale-container.happy span').text(Math.ceil(data.happy.percentage)+'%');
        $('.scale-container.excited span').text(Math.ceil(data.excited.percentage)+'%');
        $('.scale-container.sad span').text(Math.ceil(data.sad.percentage)+'%');
        $('.scale-container.mad span').text(Math.ceil(data.mad.percentage)+'%');
        $('.scale-container.jealous span').text(Math.ceil(data.jealous.percentage)+'%');
        $('.scale-container.upset span').text(Math.ceil(data.upset.percentage)+'%');
        $('.scale-container.comfortable span').text(Math.ceil(data.comfort.percentage)+'%');
        $('.scale-container.fear span').text(Math.ceil(data.fear.percentage)+'%');
        $('.scale-container.surprised span').text(Math.ceil(data.surprised.percentage)+'%');
        var moodData = Math.max(data.happy.percentage, data.excited.percentage, data.sad.percentage, data.mad.percentage, data.jealous.percentage, data.upset.percentage,
    data.comfort.percentage, data.fear.percentage, data.surprised.percentage);
        switch (moodData) {
            case data.happy.percentage:
            mood = 'happy';
            $('.stream-container h3 span').text(mood);
            if (prevMood!='happy' && $('ul.happy-container').hasClass('hide')) {
                $('ul.'+prevMood+'-container').addClass('hide');
                $('ul.happy-container').removeClass('hide');
                prevMood = 'happy';
            }
            $('<img />').attr('src', data.happy.avatar)
            .load(function(){
              $('.stream-container ul.happy-container')
                .prepend($('<li>')
                .prepend($('<div class="tweet-container">')
                .prepend($('<p class="tweet">').text(data.happy.tweet))
                .prepend($('<p class="user-name">').text(data.happy.user+':')))
                .prepend($(this)));
            });
            break;
            case data.excited.percentage:
            mood = 'excited';
            $('.stream-container h3 span').text(mood);
            if (prevMood!='excited' && $('ul.excited-container').hasClass('hide')) {
                $('ul.'+prevMood+'-container').addClass('hide');
                $('ul.excited-container').removeClass('hide');
                prevMood = 'excited';
            }
            $('<img />').attr('src', data.excited.avatar)
            .load(function(){
              $('.stream-container ul.excited-container')
                .prepend($('<li>')
                .prepend($('<div class="tweet-container">')
                .prepend($('<p class="tweet">').text(data.excited.tweet))
                .prepend($('<p class="user-name">').text(data.excited.user+':')))
                .prepend($(this)));
            });
            break;
            case data.sad.percentage:
            mood = 'sad';
            $('.stream-container h3 span').text(mood);
            if (prevMood!='sad' && $('ul.sad-container').hasClass('hide')) {
                $('ul.'+prevMood+'-container').addClass('hide');
                $('ul.sad-container').removeClass('hide');
                prevMood = 'sad';
            }
            $('<img />').attr('src', data.sad.avatar)
            .load(function(){
              $('.stream-container ul.sad-container')
                .prepend($('<li>')
                .prepend($('<div class="tweet-container">')
                .prepend($('<p class="tweet">').text(data.sad.tweet))
                .prepend($('<p class="user-name">').text(data.sad.user+':')))
                .prepend($(this)));
            });
            break;
            case data.mad.percentage:
            mood = 'mad';
            $('.stream-container h3 span').text(mood);
            if (prevMood!='mad' && $('ul.mad-container').hasClass('hide')) {
                $('ul.'+prevMood+'-container').addClass('hide');
                $('ul.mad-container').removeClass('hide');
                prevMood = 'mad';
            }
            $('<img />').attr('src', data.mad.avatar)
            .load(function(){
              $('.stream-container ul.mad-container')
                .prepend($('<li>')
                .prepend($('<div class="tweet-container">')
                .prepend($('<p class="tweet">').text(data.mad.tweet))
                .prepend($('<p class="user-name">').text(data.mad.user+':')))
                .prepend($(this)));
            });
            break;
            case data.jealous.percentage:
            mood = 'jealous';
            $('.stream-container h3 span').text(mood);
            if (prevMood!='jealous' && $('ul.jealous-container').hasClass('hide')) {
                $('ul.'+prevMood+'-container').addClass('hide');
                $('ul.jealous-container').removeClass('hide');
                prevMood = 'jealous';
            }
            $('<img />').attr('src', data.jealous.avatar)
            .load(function(){
              $('.stream-container ul.jealous-container')
                .prepend($('<li>')
                .prepend($('<div class="tweet-container">')
                .prepend($('<p class="tweet">').text(data.jealous.tweet))
                .prepend($('<p class="user-name">').text(data.jealous.user+':')))
                .prepend($(this)));
            });
            break;
            case data.upset.percentage:
            mood = 'upset';
            $('.stream-container h3 span').text(mood);
            if (prevMood!='upset' && $('ul.upset-container').hasClass('hide')) {
                $('ul.'+prevMood+'-container').addClass('hide');
                $('ul.upset-container').removeClass('hide');
                prevMood = 'upset';
            }
            $('<img />').attr('src', data.upset.avatar)
            .load(function(){
              $('.stream-container ul.upset-container')
                .prepend($('<li>')
                .prepend($('<div class="tweet-container">')
                .prepend($('<p class="tweet">').text(data.upset.tweet))
                .prepend($('<p class="user-name">').text(data.upset.user+':')))
                .prepend($(this)));
            });
            break;
            case data.comfort.percentage:
            mood = 'comfort';
            $('.stream-container h3 span').text('relaxed');
            if (prevMood!='comfort' && $('ul.comfort-container').hasClass('hide')) {
                $('ul.'+prevMood+'-container').addClass('hide');
                $('ul.comfort-container').removeClass('hide');
                prevMood = 'comfort';
            }
            $('<img />').attr('src', data.comfort.avatar)
            .load(function(){
              $('.stream-container ul.comfort-container')
                .prepend($('<li>')
                .prepend($('<div class="tweet-container">')
                .prepend($('<p class="tweet">').text(data.comfort.tweet))
                .prepend($('<p class="user-name">').text(data.comfort.user+':')))
                .prepend($(this)));
            });
            break;
            case data.fear.percentage:
            mood = 'fear';
            $('.stream-container h3 span').text(mood);
            if (prevMood!='fear' && $('ul.fear-container').hasClass('hide')) {
                $('ul.'+prevMood+'-container').addClass('hide');
                $('ul.fear-container').removeClass('hide');
                prevMood = 'fear';
            }
            $('<img />').attr('src', data.fear.avatar)
            .load(function(){
              $('.stream-container ul.fear-container')
                .prepend($('<li>')
                .prepend($('<div class="tweet-container">')
                .prepend($('<p class="tweet">').text(data.fear.tweet))
                .prepend($('<p class="user-name">').text(data.fear.user+':')))
                .prepend($(this)));
            });
            break;
            case data.surprised.percentage:
            mood = 'surprised';
            $('.stream-container h3 span').text(mood);
            if (prevMood!='surprised' && $('ul.surprised-container').hasClass('hide')) {
                $('ul.'+prevMood+'-container').addClass('hide');
                $('ul.surprised-container').removeClass('hide');
                prevMood = 'surprised';
            }
            $('<img />').attr('src', data.surprised.avatar)
            .load(function(){
              $('.stream-container ul.surprised-container')
                .prepend($('<li>')
                .prepend($('<div class="tweet-container">')
                .prepend($('<p class="tweet">').text(data.surprised.tweet))
                .prepend($('<p class="user-name">').text(data.surprised.user+':')))
                .prepend($(this)));
            });
            break;
            default:
            mood = 'happy';
        }
        console.log('mood:'+mood);
    });
    var currentMood = 'mad';
    window.setInterval(function(){
        var lastMood = currentMood;
        $('.'+lastMood).addClass('hiden');
        currentMood = mood?mood:'mad';
        $('.'+currentMood).removeClass('hiden');
    },2000);

});

