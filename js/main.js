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


$(".btn").click(function () {
    $(".both").toggleClass('flipped');
});
