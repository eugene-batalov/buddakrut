$(document).ready(function () {
    $(".btn-sign-in").on('click', function (e) {
        e.preventDefault();
        var data = {
            "action": "check_login"
        };
        data = $(".login-form").serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php",
            data: data,
            success: function (data) {
                //alert(data["json"]);
                if (data["correct_login_password"] == "Correct") {
                    window.location.href = data["redirect"];
                }
                else {
                    $(".popup--description").html("Incorrect email or password, please try again.")
                    $(".modal").modal();
                }
            }
        });
        return false;
    });
    $(".btn-send-password").on('click', function (e) {
        e.preventDefault();
        var data = {
            "action": "send_password"
        };
        data = $(".send-password-form").serialize() + "&" + $.param(data);
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
