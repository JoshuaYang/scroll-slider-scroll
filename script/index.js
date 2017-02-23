var $window = $(window);
var pinBox = $('.pin-box');
var swiperSlide = $('.swiper-slide');
var length = swiperSlide.length;
var step = 1 / length;

var inPin = false;


var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    simulateTouch: false,
    speed: 1000
});


var controller = new ScrollMagic.Controller();
var scene = new ScrollMagic.Scene({
    offset: -118,
    triggerElement: '.part-slider',
    triggerHook: 0
})
.on('progress', function(e){
    var progress = e.progress;
    var i = 0;

    for(; i < length; ++i){
        if((i * step < progress) && (progress <= (i + 1) * step)){
            break;
        }
    }

    if(i === length) i = 0;

    if(mySwiper.activeIndex !== i){
        mySwiper.slideTo(i);

        pinBox.removeClass('pos0 pos1 pos2').addClass('pos' + i);
    }
})
.on('enter', function(){
    inPin = true;
})
.on('leave', function(){
    inPin = false;
})
.setPin('.pin-box')
.addTo(controller);

function updateDuration(){
    scene.duration(length * swiperSlide.height());
}

$(window).on('load resize', function(){
    updateDuration();
}).on('mousewheel DOMMouseScroll', function(e){
    if(mySwiper.animating) {
        e.preventDefault();
    }

    if(inPin) {
        var progress = scene.progress();

        var isFF = false || e.originalEvent.detail;

        var length = isFF ?
            e.originalEvent.detail * 90:
            (-e.originalEvent.wheelDelta) * 0.75;

        var isDown = length > 0;

        var currentScrollTop = $window.scrollTop();
        var distance = swiperSlide.height();
        if(!isDown) distance = -distance;

        var target = distance + currentScrollTop;

        if(!mySwiper.animating) {
            $window.scrollTop(target);
        }
    }
});
