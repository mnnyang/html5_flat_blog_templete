function initTab(selectedId = 0) {
    var tab = $('#tab');
    var tabTitles = tab.find('.tab-title-item');
    var tabContents = tab.find('.tab-content-item');

    for (var i = 0; i < tabTitles.length; i++) {

        tabTitles[i].id = i;
        $(tabTitles[i]).on('click', function () {

            console.log("fff");

            var $this = $(this);
            tabTitles.removeClass('select');
            $this.addClass('select');

            tabContents.removeClass('select').hide();
            $(tabContents[this.id]).addClass('select').show();

            updateDirTop();

        });

        //set default selected
        $(tabContents[selectedId]).show();
    }

}

function initSidebar() {
    console.log("ok");
    var sidebar = $('#sidebar');
    var menu_item = sidebar.find('.menu-item');

    menu_item.on('click', function () {

        var $this = $(this);
        $this.next().slideToggle(1);
        $this.toggleClass('open');

        sidebar.find('.sub-menu').not($this.next()).slideUp(1).prev().removeClass('open');
    });

    sidebar.find('.open').next().show();
}


var defaultDirTop = 0;

function updateDirTop() {
    if (undefined !== $('.select .directory').offset()) {
        defaultDirTop = $('.select .directory').offset().top;
    }
}

function initDirectoryFixed() {

    updateDirTop();

    $(window).scroll(function () {
        var dir = $('.select .directory');

        if (null == dir) {
            return;
        }

        var st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);

        if (st + 50 > defaultDirTop) {
            if (dir.css('position') !== 'fixed') {
                dir.css('position', 'fixed').css('top', '64px');
                console.log("fixed")
            }
        } else {
            if (dir.css('position') !== 'relative') {
                dir.css('position', 'relative').css('top', '0px').css('width', '209px');
                console.log("relative")
            }
        }
    });
}

function hideMobileMenu() {
    $('.header-mobile-menu').hide();
}

function initSettingButton() {
    $('#setting_button').on('click', function () {
        if ($('.header-mobile-menu').css('display') === 'none') {
            console.log("show");
            $('.header-mobile-menu').show();
        } else {
            console.log("hide");
            hideMobileMenu();
        }
    });
}

function initLeftGlideButton() {
    $('#bars_button').on('click', function () {
        if ($('.main-page').css('marginLeft') == '200px') {

            $('.main-page').animate({marginLeft: 0}, 300, function () {
            });
        } else {
            $('.main-page').animate({marginLeft: '200px'}, 300, function () {
            });
        }
    });
}

function animCloseLeftGlide() {
    if ($('.main-page').is(':animated')) {
        return;
    }
    $('.main-page').animate({marginLeft: 0}, 100);
}

function animOpenLeftGlide() {
    if ($('.main-page').is(':animated')) {
        return;
    }

    $('.main-page').animate({marginLeft: '200px'}, 100, function () {
    });
}

function initLeftGlideState() {
    var result = window.matchMedia('(max-width: 768px)');

    if (result.matches) {
        console.log('页面宽度小于等于768px');
        $('.main-page').css('marginLeft', 0);

    } else {
        console.log('页面宽度大于768px');
        animOpenLeftGlide();
    }
}

function initGoToTop() {
    $('#go_to_top').on('click', function () {
        $("body,html").animate({scrollTop: 0}, 500);
    });

    updateGoToTopState();
}

function updateGoToTopState() {
    if (window.scrollY > 150) {
        if ($('#go_to_top').css('display') == 'none') {
            $('#go_to_top').show();
            $('#go_to_top').animate({right: 0}, 150,);
        }
    } else {
        if ($('#go_to_top').css('display') != 'none') {
            $('#go_to_top').animate({right: '-100px'}, 150, function () {
                $('#go_to_top').hide();
            });
        }
    }
}

/**
 * 设置时间线的颜色
 * @param target
 * @param color
 */

var colorList = ['#00BCD4', '#000000', '#E91E63','#673AB7','#FFC107', '#4CAF50'];

function initTimeLineColor() {
    var timeLine = $('#time-line');
    if (!timeLine[0]) {
        return;
    }

    var timeLineItem = timeLine.find('.time-line-item-wrapper');
    for (var i = 0; i < timeLineItem.length; i++) {

        var $this = $(timeLineItem[i]);
        var color = colorList[(i) % colorList.length];
        $this.css('border-color', color);
        $this.find('.time-line-title').css('background', color);
        $this.find('.point').css('border-color', color);
        $this.find('.content-wrapper').css('background', color);
        $this.find('.corner').css('border-right-color', color);
    }
}

/**
 * 页面滑动
 */
function onPageScroll() {
    console.log(window.scrollY);
    updateGoToTopState();
}

/**
 * 页面resize
 */
$(window).resize(function () {
    updateDirTop();
    hideMobileMenu();

    initLeftGlideState();
});


$(function () {
    initSidebar();
    initTab();

    initDirectoryFixed();

    initSettingButton();
    initLeftGlideButton();
    initLeftGlideState();

    initGoToTop();

    initTimeLineColor();
});

/**
 * 重新打开页面进入网站
 * @param url
 */
function goToUrlByNewPage(url = "#") {
    window.open(url);
}

/**
 * 重新打开页面进入网站
 * @param url
 */
function goToUrlByCurrentPage(url = "#") {
    window.open(url, '_self');
}


