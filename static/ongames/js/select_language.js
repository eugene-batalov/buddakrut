$(document).ready(function () {
    $(".select-locale").on('click', function (e) {
        var data = {
            "action": "select_locale",
            "select_language": $(this).text()
        };
        data = $(".login-form").serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php",
            data: data,
            success: function (data) {
  //              alert("Language: "+data["select_language"]+" id: "+data["language_id"]);
                location.reload();
            }
        });
    });
});
