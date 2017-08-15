$(document).ready(function () {
    initReg();
});

function initReg() {
    //назначить кнопке "Регистрация" действия
    $("#bsavereg").click(function () {
        saveRegistration();
    });
}

function saveRegistration() {
    var data = {};
    data.mode = "reg";
    data.username = $("#username").val();
    data.email = $("#email").val();
    data.pass1 = $("#inputPassword1").val();
    data.pass2 = $("#inputPassword2").val();
    data.submit = true;
    $.ajax({
        url: "http://service.bielecki.ru/reg/index.php",
        crossDomain: true,
        dataType: "json",
        data: data,
        method: "POST",
        success: function (data) {
            if (data.status == "regsave") {
                $("#forma").hide();
                $("#result").show();
                $("#result").html("<a href='index.html'>" + data.message + "</a>");
            }
            else {
                $("#forma").show();
                $("#result").show();
                $("#result").html(data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.result').text(jqXHR.responseText || textStatus);
        }

    });
}