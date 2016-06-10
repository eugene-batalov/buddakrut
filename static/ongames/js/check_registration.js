$(document).ready(function () {
    $("#reg-data-7").datepicker({changeYear: true, dateFormat: "yy-mm-dd", setDate: $("#reg-data-7").attr("value"), yearRange: "1900:2025"});
    $(".reload-captcha").on('click', function (e) {
        e.preventDefault();
        $(".secpic").attr("src", 'secpic.php' + '?' + new Date().getTime());
    });
    $(".btn-register").on('click', function (e) {
        e.preventDefault();
        var data = {
            "action": "check_registration",
            "agree": $("#agree").is(':checked'),
            "rules": $("#rules").is(':checked')
        };
        data = $(".registration-form").serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php",
            data: data,
            success: function (data) {
                var errors = data["errors"];
                var s = "";
                if (errors === 0) {
                    window.location.href = data["redirect"];
                }
                else {
                    s += data["error_code0"];
                    for (var i = 1; i < errors; i++)
                        s += "\n" + data["error_code" + i.toString()];
//                    if(errors > 1) $(".popup--head").html("Errors!");
//                    $(".popup--description").html(s);
//                    $(".modal").modal();

                    alert("Errors: " + s);
                }
            }
        });
        return false;
    });
    $(".btn-email-confirm").on('click', function (e) {
        e.preventDefault();
        var data = {
            "action": "send_email_verification_link"
        };
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php",
            data: data,
            success: function (data) {
                alert(data["email_sent"]);
            }
        });
        return false;
    });
});