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
        if ($(window).width() < 1188) {
            var curGroup = $(this).parent();
            var newHTML =   '<div class="land-induction-catalogue-filter-popup">' +
                                '<div class="land-induction-catalogue-filter-popup-bg"></div>' +
                                '<div class="land-induction-catalogue-filter-popup-container">' +
                                    '<div class="land-induction-catalogue-filter-popup-header">' +
                                        '<div class="land-induction-catalogue-filter-popup-title">' + curGroup.find('.land-induction-catalogue-filter-group-title').html() + '</div>' +
                                        '<a href="#" class="land-induction-catalogue-filter-popup-close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.3975 19.6537L5.34375 18.5999L10.9437 12.9999L5.34375 7.39994L6.3975 6.34619L11.9975 11.9462L17.5975 6.34619L18.6513 7.39994L13.0513 12.9999L18.6513 18.5999L17.5975 19.6537L11.9975 14.0537L6.3975 19.6537Z" fill="white" /></svg></a>' +
                                    '</div>' +
                                    '<form class="land-induction-catalogue-filter-popup-form">' +
                                        curGroup.find('.land-induction-catalogue-filter-group-content').html() +
                                    '</form>' +
                                    '<div class="land-induction-catalogue-filter-popup-footer">' +
                                        '<a href="#" class="land-induction-catalogue-filter-popup-footer-close"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.76917 4.73095L7.47183 5.45395L4.92567 8.00012L13 8.00012L13 9.00012L4.92567 9.00012L7.47183 11.5463L6.76917 12.2693L3 8.50012L6.76917 4.73095Z" fill="white" fill-opacity="0.5" /></svg>Отменить</a>' +
                                        '<a href="#" class="land-induction-catalogue-filter-popup-footer-apply">Применить</a>' +
                                    '</div>';
            newHTML +=          '</div>' +
                            '</div>';
            $('body').append(newHTML);
            $('.land-induction-catalogue-filter-popup-form input').each(function() {
                var curInput = $(this);
                var curName = curInput.attr('name');
                var curValue = curInput.attr('value');
                if (curGroup.find('.land-induction-catalogue-filter-group-content input[name="' + curName + '"][value="' + curValue + '"]').prop('checked')) {
                    curInput.prop('checked', true);
                }
            });
            var curScroll = $(window).scrollTop();
            $('html').addClass('land-induction-catalogue-filter-popup-open');
            $('.land-induction-wrapper').css({'top': -curScroll});
            $('.land-induction-wrapper').data('curScroll', curScroll);
        }
    });

    $('body').on('click', '.land-induction-catalogue-filter-popup-close, .land-induction-catalogue-filter-popup-bg, .land-induction-catalogue-filter-popup-footer-close', function(e) {
        $('.land-induction-wrapper').css({'top': 0});
        $('.land-induction-catalogue-filter-popup').remove();
        $('html').removeClass('land-induction-catalogue-filter-popup-open');
        $(window).scrollTop($('.land-induction-wrapper').data('curScroll'));
        e.preventDefault();
    });

    $('body').on('click', '.land-induction-catalogue-filter-popup-footer-apply', function(e) {
        $('.land-induction-catalogue-filter-popup-form input').each(function() {
            var curInput = $(this);
            var curName = curInput.attr('name');
            var curValue = curInput.attr('value');
            $('.land-induction-catalogue-filter-group-content input[name="' + curName + '"][value="' + curValue + '"]').prop('checked', curInput.prop('checked')).trigger('change');
        });
        var curCount = $('.land-induction-catalogue-filter-group-content input:checked').length;
        $('.land-induction-catalogue-filter-link a span').html(curCount);
        if (curCount > 0) {
            $('.land-induction-catalogue-filter-link a span').addClass('active');
        } else {
            $('.land-induction-catalogue-filter-link a span').removeClass('active');
        }
        updateFilterSelected();
        $('.land-induction-wrapper').css({'top': 0});
        $('.land-induction-catalogue-filter-popup').remove();
        $('html').removeClass('land-induction-catalogue-filter-popup-open');
        $(window).scrollTop($('.land-induction-wrapper').data('curScroll'));
        e.preventDefault();
    });

    $('.land-induction-catalogue-filter-clear a').click(function(e) {
        $('.land-induction-catalogue-filter-group-content input').prop('checked', false).trigger('change');
        $('.land-induction-catalogue-filter-link a span').removeClass('active');
        updateFilterSelected();
        e.preventDefault();
    });

    $('.land-induction-catalogue-filter-submit a').click(function(e) {
        $('.land-induction-catalogue').addClass('open');
        e.preventDefault();
    });

    $('.land-induction-catalogue-filter-link a').click(function(e) {
        $('.land-induction-catalogue').removeClass('open');
        e.preventDefault();
    });

    var landInductionCatalogueSlider = null;

    $('.land-induction-catalogue-filter-item input').change(function() {
        landInductionCatalogueUpdate();
        updateFilterSelected();
    });

    $('.land-induction-catalogue').each(function() {
        landInductionCatalogueUpdate();
        updateFilterSelected();
    });

    function updateFilterSelected() {
        $('.land-induction-catalogue-filter-group').each(function() {
            var curGroup = $(this);
            var newHTML = '';
            curGroup.find('.land-induction-catalogue-filter-group-content input:checked').each(function() {
                var curInput = $(this);
                newHTML += '<span>' + curInput.parent().find('span').html() + '</span>';
            });
            curGroup.find('.land-induction-catalogue-filter-group-selected').html(newHTML);

        });
    }

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

$(window).on('load resize', function() {
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
        var headerSize = 20;
        if ($('header').length == 1) {
            headerSize = 169;
        }
        var bottomOffset = 40;
        if ($(window).width() < 1188) {
            headerSize = 40;
            if ($('header').length == 1) {
                headerSize = 92;
            }
            bottomOffset = -windowHeight / 3;
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
    } else {
        curDigit = 1;
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
    } else {
        curDigit = 7;
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
        $('.land-induction-comfort-slider-item-img-5-steam').addClass('animate');
        $('.land-induction-comfort-slider-item-img-5-crockery-2').animate({'opacity': 1}, 500, function() {
            $('.land-induction-comfort-slider-item-img-5-crockery-3').animate({'opacity': 1}, 500);
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
                $('.land-induction-comfort-slider-item-img-5-steam').removeClass('animate');
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