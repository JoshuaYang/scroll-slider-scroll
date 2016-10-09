var swiperSlide = $('.swiper-slide');
var length = swiperSlide.length;
var step = 1 / length;


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
    }

})
.setPin('.swiper-container')
.addTo(controller);



function updateDuration(){
    scene.duration(length * swiperSlide.height());
}

$(window).on('load resize', function(){
    updateDuration();
}).on('mousewheel', function(e){
    if(mySwiper.animating){
        e.preventDefault();
    }

});
