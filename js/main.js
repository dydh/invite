jQuery.extend(jQuery.easing,
    {
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    });


function drawSVGPaths(_parentElement, _timeMin, _timeMax, _timeDelay) {


    var paths = $(_parentElement).find('path');

    //for each PATH..
    $.each(paths, function (i) {

        //get the total length
        var totalLength = this.getTotalLength();


        //set PATHs to invisible
        $(this).css({
            'stroke-dashoffset': totalLength,
            'stroke-dasharray': totalLength + ' ' + totalLength
        });

        //animate
        $(this).delay(_timeDelay * i).animate({
            'stroke-dashoffset': 0
        }, {
            duration: Math.floor(Math.random() * _timeMax) + _timeMin
            , easing: 'easeInOutQuad'
        });
    });
}


function startSVGAnimation(parentElement) {
    drawSVGPaths(parentElement, 500, 5000, 0);
}

startSVGAnimation($('svg'));

setTimeout(function () {
    $(".image").addClass('fold-out');
    $(".btn").addClass('fade-in')
}, 2500);


$('input.check').on('change', function () {

    $(".error").remove();

    if (this.id == "attend4") {
        $(".check").not(this).prop('checked', false);
        $(".guests").hide();
    }
    else {
        $(".guests").show();
        if ($("#attend4").is(':checked')) {
            $("#attend4").prop('checked', false);
        }
    }
});
$(".btn").click(function () {
    $(".both").toggleClass('flipped');
    $("#name").focus();
});
$("#cancel").click(function () {
    $(".both").toggleClass('flipped');
});

function onLoad() {
    $.getJSON('//freegeoip.net/json/?callback=?', function (data) {
        $("#ip").val(data.ip);
        $("#city").val(data.city);
    });
    
    var g= document.querySelectorAll('.header path');

    for (var i = 0; i < g.length; i++) {
	    var transform= getComputedStyle(g[i]).getPropertyValue('transform');
        g[i].setAttribute('transform', transform);
    }
}

$("form").submit(function (event) {
    var name = $("#name").val();
    var attend1 = $("#attend1").is(':checked');
    var attend2 = $("#attend2").is(':checked');
    var attend3 = $("#attend3").is(':checked');
    var attend4 = $("#attend4").is(':checked');

    var attend = attend1 || attend2 || attend3;
    var regret = attend4;

    var count = $('#count option:selected').text();

    if (name!=="" && attend && count !== "Choose" || name && regret) {
        alert("Thank you for your response!");
        $(".both").toggleClass('flipped');
        return;
    }
    $("#rsvp").append("<span class='error'>Please fill out all the fields above. Thank you!</span>");

    $("#name").on('change', function () {
        $(".error").remove();
    });

    $("#count").on('change', function () {
        $(".error").remove();
    })

});

