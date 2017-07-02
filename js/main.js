$(document).ready(function () {
    // ??
    $('[data-toggle=offcanvas]').click(function () {
        if ($('.sidebar-offcanvas').css('background-color') == 'rgb(255, 255, 255)') {
            $('.list-group-item').attr('tabindex', '-1');
        } else {
            $('.list-group-item').attr('tabindex', '');
        }
        $('.row-offcanvas').toggleClass('active');

    });

    // style aktywnych linków sidebara
    $('.list-group-item').click(function () {
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');
    });

    // działania na kliknięcie linków
    $('#place-click').click(function () {
        $('#content-subpage').load('./partials/showPlace.html', null, function () {
            ShowPlace.getInstance().init(); // On Load
        });
    });

    $('#name-click').click(function () {
        $('#content-subpage').load('./partials/giveName.html', null, function () {
            alert('give Name');
        });
    });

    $('#info-click').click(function () {
        $('#content-subpage').load('./partials/info.html', null, function () {
            alert('info');
        });
    });

    // domyślnie po załadowaniu strony
    $('#content-subpage').load('./partials/showPlace.html', null, function () {
        ShowPlace.getInstance().init(); // On Load
    });
});
