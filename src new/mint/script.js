var swiper = new Swiper('.product-slider', {
        spaceBetween: 30,
        effect: 'fade',
        // initialSlide: 2,
        loop: false,
        navigation: {
            nextEl: '.next',
            prevEl: '.prev'
        },
        // mousewheel: {
        //     // invert: false
        // },
        on: {
            init: function(){
                var index = this.activeIndex;

                var target = $('.product-slider__item').eq(index).data('target');

                console.log(target);

                $('.product-img__item').removeClass('active');
                $('.product-img__item#'+ target).addClass('active');
            }
        }

    });

    swiper.on('slideChange', function () {
        var index = this.activeIndex;

        var target = $('.product-slider__item').eq(index).data('target');

        console.log(target);

        $('.product-img__item').removeClass('active');
        $('.product-img__item#'+ target).addClass('active');

        if(swiper.isEnd) {
            $('.prev').removeClass('disabled');
            $('.next').addClass('disabled');
        } else {
            $('.next').removeClass('disabled');
        }

        if(swiper.isBeginning) {
            $('.prev').addClass('disabled');
        } else {
            $('.prev').removeClass('disabled');
        }
    });

    $(".js-fav").on("click", function() {
        $(this).find('.heart').toggleClass("is-active");
    });


    function lvl3(){
        document.getElementById('lvl3').addEventListener('click',function(){
           document.getElementById('buy').setAttribute('href','https://opensea.io/CanvaIsland/canvaisland?search[sortBy]=PRICE&search[priceFilter][symbol]=ETH&search[priceFilter][max]=0.2&search[priceFilter][min]=0.2&search[sortAscending]=true');
           document.getElementById('buy').setAttribute('target','_blank');
        },false)
        };
    function lvl4(){
        document.getElementById('lvl4').addEventListener('click',function(){
            document.getElementById('buy').setAttribute('href','https://opensea.io/CanvaIsland/canvaisland?search[sortBy]=PRICE&search[priceFilter][symbol]=ETH&search[priceFilter][max]=0.3&search[priceFilter][min]=0.3&search[sortAscending]=false');
         },false)
        };


