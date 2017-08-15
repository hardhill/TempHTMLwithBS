$(document).ready(function () {
    initSite();
});

// устанавливает cookie с именем
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

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1,
        path: "/"
    })
}

function initSite() {
    $("#logout").click(function () {
        LogOutUser();
    });
    $("#blogin").click(function () {
        document.location.replace("auth.html");
    })
    //
    var userid = getCookie('userid');
    var userip = getCookie('userip');
    var email = getCookie('email');
    if (userid != null) {
        var data = {};
        data.mode = "sess";
        data.userid = (userid != null) ? userid : false;
        data.userip = (userip != null) ? userip : false;
        data.email = (email != null) ? email : false;
        $.ajax({
            url: "http://service.bielecki.ru/reg/index.php",
            method: "POST",
            crossDomain: true,
            dataType: "json",
            data: data,
            success: function (data) {
                if (data.status == "success") {
                    var arrmsg = JSON.parse(data.message);
                    $("#logandsign").hide();
                    $("#userlogout").show();
                    $("#username").text(arrmsg.login);

                }
                else {
                    $("#userlogout").hide();
                    $("#logandsign").show();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $("#userlogout").hide();
        $("#logandsign").show();
    }
}

function LogOutUser() {
    //deleteCookie("PHPSESSID");
    deleteCookie("userid");
    var data = {};
}