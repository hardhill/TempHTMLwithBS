$(document).ready(function () {
    $("#blogin").click(function () {
        Logining();
    })
});

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function Logining() {
    var data = {};
    data.pass1 = $("#inputPassword1").val();
    data.email = $("#email").val();
    data.mode = "auth";
    data.submit = true;
    $.ajax({
        url: "http://service.bielecki.ru/reg/index.php",
        crossDomain: true,
        method: "POST",
        dataType: "json",
        data: data,
        success: function (data) {
            if (data.status == "success") {
                var arrmsg = JSON.parse(data.message);
                var options = {};
                options.expires = 0;
                options.path = "/";
                setCookie("email", arrmsg.email, options);
                setCookie("userid", arrmsg.userid, options);
                setCookie("userip", arrmsg.userip, options);
                document.location.replace("http://mlm.bielecki.ru/");
                //$("#result").html(arrmsg.userid);
            } else {
                $("#result").html(data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#result').text(jqXHR.responseText || textStatus);
        }
    });
}