function initTab(selectedId = 0) {
    var tab = $('#tab');
    var tabTitles = tab.find('.tab-title-item');
    var tabContents = tab.find('.tab-content-item');

    for (var i = 0; i < tabTitles.length; i++) {

        tabTitles[i].id = i;
        $(tabTitles[i]).on('click', function () {

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


function initGoToTop() {
    $('#go_to_top').on('click', function () {
        $("body,html").animate({scrollTop: 0}, 500);
    });
}

$(window).resize(function () {
    updateDirTop();
    hideMobileMenu();
}).resize();


$(function () {
    initSidebar();
    initTab();

    initDirectoryFixed();

    initSettingButton();

    initGoToTop();
});


