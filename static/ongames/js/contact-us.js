$(document).ready(function () {
    $(".reload-captcha").on('click', function (e) {
        e.preventDefault();
        $(".secpic").attr("src", 'secpic.php' + '?' + new Date().getTime());
    });
    $(".btn-main").on('click', function (e) {
        e.preventDefault();
        var data = {
            "action": "send_feedback"
        };
        data = $(".contact-us-form").serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php",
            data: data,
            success: function (data) {
                var errors = data["errors"];
                var s = "";
                if (errors === 0) {
                    alert(data["email_sent"]);
                    location.reload();
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
    });
});