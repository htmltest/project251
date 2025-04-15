$(document).ready(function() {

    if ($('header').length == 1) {
        $('.land-induction-wrapper').addClass('full');
    }

    $('.land-induction-welcome-btn a, .land-induction-menu-item a').click(function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length == 1) {
            var curOffset = 0;
            if ($('header').length == 1) {
                curOffset = $('header').outerHeight();
            }
            $('html, body').animate({'scrollTop': curBlock.offset().top - curOffset});
        }
        e.preventDefault();
    });

    $('.land-induction-comfort-slider-menu-item').click(function() {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.land-induction-comfort-slider-menu-item.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.land-induction-comfort-slider-menu-item').index(curItem);
            $('.land-induction-comfort-slider-item.active').removeClass('active');
            $('.land-induction-comfort-slider-item').eq(curIndex).addClass('active');
            landInductionAnimateComfort();
            $('.land-induction-comfort-slider-list').css({'height': $('.land-induction-comfort-slider-item.active').height()});
        }
    });

    $('.land-induction-catalogue-filter-group-title').click(function() {
        var curGroup = $(this).parent();
        curGroup.toggleClass('open');
        curGroup.find('.land-induction-catalogue-filter-group-content').slideToggle(function() {
            updateCataloguePosition();
        });
    });

    var landInductionCatalogueSlider = null;

    $('.land-induction-catalogue-filter-item input').change(function() {
        landInductionCatalogueUpdate();
    });

    $('.land-induction-catalogue').each(function() {
        landInductionCatalogueUpdate();
    });

    function landInductionCatalogueUpdate() {
        $('.land-induction-catalogue-slider').each(function() {
            var curSlider = $(this);
            if (curSlider.find('.swiper').hasClass('swiper-initialized')) {
                landInductionCatalogueSlider.destroy();
            }

            var newHTML = '';
            for (var i = 0; i < landInductionCatalogue.length; i++) {
                var curItem = landInductionCatalogue[i];

                var isBorder = true;
                if ($('.land-induction-catalogue-filter-item input[name="border"]:checked').length > 0) {
                    isBorder = false;
                    $('.land-induction-catalogue-filter-item input[name="border"]:checked').each(function() {
                        if (curItem.border[$(this).val()]) {
                            isBorder = true;
                        }
                    });
                }

                var isSecurity = true;
                if ($('.land-induction-catalogue-filter-item input[name="security"]:checked').length > 0) {
                    isSecurity = false;
                    $('.land-induction-catalogue-filter-item input[name="security"]:checked').each(function() {
                        if (curItem.security[$(this).val()]) {
                            isSecurity = true;
                        }
                    });
                }

                var isCtrl = true;
                if ($('.land-induction-catalogue-filter-item input[name="ctrl"]:checked').length > 0) {
                    isCtrl = false;
                    $('.land-induction-catalogue-filter-item input[name="ctrl"]:checked').each(function() {
                        if (curItem.ctrl[$(this).val()]) {
                            isCtrl = true;
                        }
                    });
                }

                var isComfort = true;
                if ($('.land-induction-catalogue-filter-item input[name="comfort"]:checked').length > 0) {
                    isComfort = false;
                    $('.land-induction-catalogue-filter-item input[name="comfort"]:checked').each(function() {
                        if (curItem.comfort[$(this).val()]) {
                            isComfort = true;
                        }
                    });
                }

                if (isBorder && isSecurity && isCtrl && isComfort) {
                    newHTML +=  '<div class="swiper-slide">' +
                                    '<div class="land-induction-catalogue-slider-item">' +
                                        '<div class="land-induction-catalogue-slider-item-preview"><img src="' + curItem.image + '" alt=""></div>' +
                                        '<div class="land-induction-catalogue-slider-item-content">' +
                                            '<div class="land-induction-catalogue-slider-item-title">' + curSlider.attr('data-title') +' ' + curItem.title + '</div>' +
                                            '<div class="land-induction-catalogue-slider-item-btn"><a href="' + curItem.url + '">подробнее</a></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
                }
            }
            if (newHTML == '') {
                newHTML +=  '<div class="swiper-slide">' +
                                '<div class="land-induction-catalogue-slider-empty">' +
                                    '<div class="land-induction-catalogue-slider-empty-preview"><img src="' + curSlider.attr('data-emptyimg') + '" alt=""></div>' +
                                    '<div class="land-induction-catalogue-slider-empty-content">' +
                                        '<div class="land-induction-catalogue-slider-empty-title">' + curSlider.attr('data-emptytitle') + '</div>' +
                                        '<div class="land-induction-catalogue-slider-empty-text">' + curSlider.attr('data-emptytext') + '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
            }
            $('.land-induction-catalogue-slider .swiper-wrapper').html(newHTML);

            landInductionCatalogueSlider = new Swiper(curSlider.find('.swiper')[0], {
                slidesPerView: 1,
                navigation: {
                    nextEl: curSlider.find('.swiper-button-next')[0],
                    prevEl: curSlider.find('.swiper-button-prev')[0],
                },
                pagination: {
                    el: curSlider.find('.swiper-pagination')[0],
                    clickable: true
                }
            });

            window.setTimeout(function() { updateCataloguePosition(); } , 300);
        });
    }

    $('.land-induction-security-point').click(function() {
        $('.land-induction-security-point.active').removeClass('active');
        var curPoint = $(this);
        curPoint.addClass('active');
        $('.land-induction-security-info-mobile').html(
            '<div class="land-induction-security-info-mobile-title">' + curPoint.find('.land-induction-security-point-title').html() + '</div>' +
            '<div class="land-induction-security-info-mobile-text">' + curPoint.find('.land-induction-security-point-text').html() + '</div>'
        );
        $('.land-induction-security-info-mobile').addClass('active');
    });

});

function updateCataloguePosition() {
    var windowScroll = $(window).scrollTop();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    $('.land-induction-catalogue-slider').css({'min-height': $('.land-induction-catalogue-slider-inner').outerHeight()});
    $('.land-induction-catalogue-slider').each(function() {
        if (windowScroll + windowHeight / 2 > $('.land-induction-catalogue').offset().top) {
            $('.land-induction-catalogue-slider').addClass('fixed');
            if (windowScroll + windowHeight > $('.land-induction-catalogue').offset().top + $('.land-induction-catalogue').outerHeight()) {
                $('.land-induction-catalogue-slider-inner').css({'margin-bottom': (windowScroll + windowHeight) - ($('.land-induction-catalogue').offset().top + $('.land-induction-catalogue').outerHeight())});
            } else {
                $('.land-induction-catalogue-slider-inner').css({'margin-bottom': 0});
            }
        } else {
            $('.land-induction-catalogue-slider').removeClass('fixed');
            $('.land-induction-catalogue-slider-inner').css({'margin-bottom': 0});
        }
    });
}

$(window).on('load resize', function() {
    updateCataloguePosition();
    
    $('.land-induction-comfort-slider-list').each(function() {
        $('.land-induction-comfort-slider-list').css({'height': $('.land-induction-comfort-slider-item.active').height()});
    });
    
    $('.land-induction-design').each(function() {
        if ($(window).width() < 1188) {
            var minHeight = 0;
            $('.land-induction-design-pre-rext').css({'min-height': 0});
            $('.land-induction-design-pre-rext').each(function() {
                var curHeight = $(this).outerHeight();
                if (curHeight > minHeight) {
                    minHeight = curHeight;
                }
            });
            $('.land-induction-design-pre-rext').css({'min-height': minHeight});
        } else {
            $('.land-induction-design-pre-rext').css({'min-height': 0});
        }
    });
});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    $('.land-induction-design').each(function() {
        var headerSize = 120;
        if ($('header').length == 1) {
            headerSize = 200;
        }
        var bottomOffset = 120;
        if ($(window).width() < 1188) {
            headerSize = 40;
            if ($('header').length == 1) {
                headerSize = 92;
            }
            bottomOffset = 800;
        }
        if (windowScroll >= $('.land-induction-design').offset().top - headerSize) {
            $('.land-induction-design').addClass('fixed');
            if (windowScroll >= $('.land-induction-design').offset().top - headerSize + $('.land-induction-design').outerHeight() - $('.land-induction-design-item').eq(0).outerHeight() + bottomOffset) {
                $('.land-induction-design-container').css({'margin-top': ($('.land-induction-design').offset().top - headerSize + $('.land-induction-design').outerHeight() - $('.land-induction-design-item').eq(0).outerHeight() + bottomOffset) - windowScroll});
            } else {
                $('.land-induction-design-container').css({'margin-top': 0});
            }
        } else {
            $('.land-induction-design').removeClass('fixed');
            $('.land-induction-design-container').css({'margin-top': 0});
        }
        var startAnimation = $('.land-induction-design').offset().top - headerSize;
        var stopAnimation = $('.land-induction-design').offset().top - headerSize + $('.land-induction-design').outerHeight() - windowHeight;
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        if ($(window).width() < 1188) {
            if (curPercent <= 0.375) {
                $('.land-induction-design-item').eq(0).addClass('active animate');
                $('.land-induction-design-item').eq(1).removeClass('active animate');
                $('.land-induction-design-item').eq(2).removeClass('active animate');
                if (curPercent <= 0.125) {
                    $('.land-induction-design-item-func-item').eq(0).addClass('active');
                    $('.land-induction-design-item-func-item').eq(1).removeClass('active');
                    $('.land-induction-design-item-func-item').eq(2).removeClass('active');
                } else if (curPercent <= 0.25) {
                    $('.land-induction-design-item-func-item').eq(0).removeClass('active');
                    $('.land-induction-design-item-func-item').eq(1).addClass('active');
                    $('.land-induction-design-item-func-item').eq(2).removeClass('active');
                } else {
                    $('.land-induction-design-item-func-item').eq(0).removeClass('active');
                    $('.land-induction-design-item-func-item').eq(1).removeClass('active');
                    $('.land-induction-design-item-func-item').eq(2).addClass('active');
                }
            } else if (curPercent <= 0.875) {
                $('.land-induction-design-item').eq(0).removeClass('active animate');
                $('.land-induction-design-item').eq(1).addClass('active animate');
                $('.land-induction-design-item').eq(2).removeClass('active animate');
                if (curPercent <= 0.50) {
                    $('.land-induction-design-item-borders-item').eq(0).addClass('active');
                    $('.land-induction-design-item-borders-item').eq(1).removeClass('active');
                    $('.land-induction-design-item-borders-item').eq(2).removeClass('active');
                    $('.land-induction-design-item-borders-item').eq(3).removeClass('active');
                } else if (curPercent <= 0.625) {
                    $('.land-induction-design-item-borders-item').eq(0).removeClass('active');
                    $('.land-induction-design-item-borders-item').eq(1).addClass('active');
                    $('.land-induction-design-item-borders-item').eq(2).removeClass('active');
                    $('.land-induction-design-item-borders-item').eq(3).removeClass('active');
                } else if (curPercent <= 0.75) {
                    $('.land-induction-design-item-borders-item').eq(0).removeClass('active');
                    $('.land-induction-design-item-borders-item').eq(1).removeClass('active');
                    $('.land-induction-design-item-borders-item').eq(2).addClass('active');
                    $('.land-induction-design-item-borders-item').eq(3).removeClass('active');
                } else {
                    $('.land-induction-design-item-borders-item').eq(0).removeClass('active');
                    $('.land-induction-design-item-borders-item').eq(1).removeClass('active');
                    $('.land-induction-design-item-borders-item').eq(2).removeClass('active');
                    $('.land-induction-design-item-borders-item').eq(3).addClass('active');
                }
            } else {
                $('.land-induction-design-item').eq(0).removeClass('active animate');
                $('.land-induction-design-item').eq(1).removeClass('active animate');
                $('.land-induction-design-item').eq(2).addClass('active animate');
            }
        } else {
            if (curPercent <= 0.33) {
                $('.land-induction-design-item').eq(0).addClass('active animate');
                $('.land-induction-design-item').eq(1).removeClass('active animate');
                $('.land-induction-design-item').eq(2).removeClass('active animate');
            } else if (curPercent <= 0.66) {
                $('.land-induction-design-item').eq(0).removeClass('active animate');
                $('.land-induction-design-item').eq(1).addClass('active animate');
                $('.land-induction-design-item').eq(2).removeClass('active animate');
            } else {
                $('.land-induction-design-item').eq(0).removeClass('active animate');
                $('.land-induction-design-item').eq(1).removeClass('active animate');
                $('.land-induction-design-item').eq(2).addClass('active animate');
            }
        }
    });

    $('.land-induction-comfort').each(function() {
        if (windowScroll >= $('.land-induction-comfort').offset().top) {
            if (!isScrollTopComfort) {
                isScrollTopComfort = true;
                landInductionAnimateComfort();
            }
        }
    });

    updateCataloguePosition();
});

var isScrollTopComfort = false;
var timerUpdate1Digit = null;
var timerUpdate2Digits = null;
var timerUpdate3Img = null;
var timerUpdate4Img = null;
var timerUpdate5Img = null;

function update1Digit() {
    var curDigit = Number($('.land-induction-comfort-slider-item-1-digit').html());
    if (curDigit < 9) {
        curDigit++;
        $('.land-induction-comfort-slider-item-1-digit').html(curDigit);
        window.clearTimeout(timerUpdate1Digit);
        timerUpdate1Digit = null;
        timerUpdate1Digit = window.setTimeout(update1Digit, 200);
    }
}

function update2Digits() {
    var curDigit = Number($('.land-induction-comfort-slider-item-2-digits').html()[4]);
    if (curDigit > 0) {
        curDigit--;
        $('.land-induction-comfort-slider-item-2-digits').html('00:0' + curDigit);
        window.clearTimeout(timerUpdate2Digits);
        timerUpdate2Digits = null;
        timerUpdate2Digits = window.setTimeout(update2Digits, 400);
    }
}

function update3Img() {
    $('.land-induction-comfort-slider-item-img-handle-3').animate({'margin-left': '0', 'opacity': 1}, 300, function() {
        $('.land-induction-comfort-slider-item-img-3-pause').animate({'opacity': 1}, 1000, function() {
            $('.land-induction-comfort-slider-item-img-3-steam').animate({'opacity': 0}, 1000);
        });
    });
}

function update4Img() {
    $('.land-induction-comfort-slider-item-img-handle-4').animate({'margin-left': '0', 'opacity': 1}, 300, function() {
        $('.land-induction-comfort-slider-item-img-4-ctrl').animate({'opacity': 1}, 500, function() {
            $('.land-induction-comfort-slider-item-img-4-border').animate({'opacity': 1}, 500, function() {
                $('.land-induction-comfort-slider-item-img-4-crockery').animate({'opacity': 1}, 500);
            });
        });
    });
}

function update5Img() {
    $('.land-induction-comfort-slider-item-img-handle-5').animate({'margin-left': '0', 'opacity': 1}, 300, function() {
        $('.land-induction-comfort-slider-item-img-5-steam').animate({'opacity': 1}, 500, function() {
            $('.land-induction-comfort-slider-item-img-5-crockery-2').animate({'opacity': 1}, 500, function() {
                $('.land-induction-comfort-slider-item-img-5-crockery-3').animate({'opacity': 1}, 500);
            });
        });
    });
}

function landInductionAnimateComfort() {
    $('.land-induction-comfort-slider-item').each(function() {
        var curItem = $(this);
        var curIndex = $('.land-induction-comfort-slider-item').index(curItem);
        switch (curIndex) {
            case 0:
                $('.land-induction-comfort-slider-item-img-handle-1').stop().css({'margin-left': '-300px', 'opacity': 0});
                $('.land-induction-comfort-slider-item-1-digit').html('1');
                window.clearTimeout(timerUpdate1Digit);
                timerUpdate1Digit = null;
                timerUpdate1Digit = window.setTimeout(function() {
                    $('.land-induction-comfort-slider-item-img-handle-1').animate({'margin-left': '0', 'opacity': 1}, 300, function() {
                        window.clearTimeout(timerUpdate1Digit);
                        timerUpdate1Digit = null;
                        timerUpdate1Digit = window.setTimeout(update1Digit, 200);
                    });
                }, 500);
                break;

            case 1:
                $('.land-induction-comfort-slider-item-img-handle-2').stop().css({'margin-left': '-300px', 'opacity': 0});
                $('.land-induction-comfort-slider-item-2-digits').html('00:07');
                window.clearTimeout(timerUpdate2Digits);
                timerUpdate2Digits = null;
                timerUpdate2Digits = window.setTimeout(function() {
                    $('.land-induction-comfort-slider-item-img-handle-2').animate({'margin-left': '0', 'opacity': 1}, 300, function() {
                        window.clearTimeout(timerUpdate2Digits);
                        timerUpdate2Digits = null;
                        timerUpdate2Digits = window.setTimeout(update2Digits, 400);
                    });
                }, 500);
                break;

            case 2:
                $('.land-induction-comfort-slider-item-img-handle-3').stop().css({'margin-left': '-300px', 'opacity': 0});
                $('.land-induction-comfort-slider-item-img-3-pause').stop().css({'opacity': 0});
                $('.land-induction-comfort-slider-item-img-3-steam').stop().css({'opacity': 1});
                window.clearTimeout(timerUpdate3Img);
                timerUpdate3Img = null;
                timerUpdate3Img = window.setTimeout(update3Img, 500);
                break;

            case 3:
                $('.land-induction-comfort-slider-item-img-handle-4').stop().css({'margin-left': '-300px', 'opacity': 0});
                $('.land-induction-comfort-slider-item-img-4-ctrl').stop().css({'opacity': 0});
                $('.land-induction-comfort-slider-item-img-4-border').stop().css({'opacity': 0});
                $('.land-induction-comfort-slider-item-img-4-crockery').stop().css({'opacity': 0});
                window.clearTimeout(timerUpdate4Img);
                timerUpdate4Img = null;
                timerUpdate4Img = window.setTimeout(update4Img, 500);
                break;

            case 4:
                $('.land-induction-comfort-slider-item-img-handle-5').stop().css({'margin-left': '-300px', 'opacity': 0});
                $('.land-induction-comfort-slider-item-img-5-crockery-2').stop().css({'opacity': 0});
                $('.land-induction-comfort-slider-item-img-5-crockery-3').stop().css({'opacity': 0});
                $('.land-induction-comfort-slider-item-img-5-steam').stop().css({'opacity': 0});
                window.clearTimeout(timerUpdate5Img);
                timerUpdate5Img = null;
                timerUpdate5Img = window.setTimeout(update5Img, 500);
                break;

            case 5:
                break;

            default:
        }
    });
}