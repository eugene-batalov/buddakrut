$(document).ready(function () {
    // $('.id-share');
    $('.puzzle-parts--item').on('click', function (e) {
        e.preventDefault();
        var link = $(this).attr('href');
        $('.popup--head').html('<a href = get_file.php?download=' + link + '>Download Puzzle #' + link + '</a>');
        $(".id-share--status").attr({'href':link});
        $(".id-share--status").hide();
        $(".btn-main").show();
    });
    
    $(".btn-main").on('click', function (e) {
        e.preventDefault();
                var data = {
            "action": "test",
            "puzzleid":  $(".id-share--status").attr('href')
        };
        data = $(".js-ajax-php-json").serialize() + "&" + $.param(data);
                $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php", //Relative or absolute path to response.php file
            data: data,
            success: function (data) {
                if(data["correct_answer"] == "Correct!"){
                    $(".btn-main").hide();
                    $(".id-share--status").addClass("correct");
                    $(".id-share--status").removeClass("incorrect");
                }
                else{
                    $(".id-share--status").addClass("incorrect");
                    $(".id-share--status").removeClass("correct");
                }
  //              $(".btn-main").hide();
                $(".id-share--status").show();
                $(".id-share--status").html(
                        data["correct_answer"] 
                        //+ "<br />puzzleid: " + data["puzzleid"] 
                        //+ "<br />Gender: " + data["gender"] + "<br />JSON: " + data["json"]
                        );
            }
        });
        return false;
    });
    
//    $(".js-ajax-php-json").submit(function () {
//        var data = {
//            "action": "test"
//        };
//        data = $(this).serialize() + "&" + $.param(data);
//        $.ajax({
//            type: "POST",
//            dataType: "json",
//            url: "response.php", //Relative or absolute path to response.php file
//            data: data,
//            success: function (data) {
//                $(".btn-main").hide();
//                $(".id-share--status").show();
//                $(".id-share--status").html(
//                        "Favorite beverage: " + data["favorite_beverage"] + "<br />Favorite restaurant: " + data["favorite_restaurant"] + "<br />Gender: " + data["gender"] + "<br />JSON: " + data["json"]
//                        );
//                alert("Form submitted successfully.\nReturned json: " + data["json"]);
//            }
//        });
//        return false;
//    });
});