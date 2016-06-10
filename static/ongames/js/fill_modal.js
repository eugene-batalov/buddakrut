$(document).ready(function () {
    // $('.id-share');
    $('.noEnterSubmit').keypress(function (e) {
        if (e.which == 13)
            return false;
        //or...
        //if ( e.which == 13 ) e.preventDefault();
    });
    $('.puzzle-parts--item').on('click', function (e) {
        e.preventDefault();
        var link = $(this).attr('puzzleid');
        $('.popup--head').html('<p>1. Download GamePuzzle offline program from home page</p>' +
                '<a href = get_file.php?download=' + link +
                '>2. Click <span style="color:blue;text-decoration:underline">here</span> to download Puzzle #' + link + '</a>' +
                '<p>3. Assemble the puzzle using offline program</p>' +
                '<p>4. Answer the question below:</p>');
        $(".popup--description").html($(this).attr('task'));
        $(".id-share--status").attr({'href': link});
        $(".id-share--status").hide();
        $(".btn-answer").show();
        $(".modal-dismiss").attr({'href': window.location.pathname});
        if (window.location.pathname.indexOf("free-puzzles") > -1)
            return;
        var data = {
            "action": "check_if_answered",
            "puzzleid": link
        };
        data = $(".js-ajax-php-json").serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php", //Relative or absolute path to response.php file
            data: data,
            success: function (data) {
                //alert(data["json"]); ////
                switch (data["answer"]) {
                    case "incorrect":
                        if (data["minutes"] > 0) {
                            $(".js-ajax-php-json").hide();
                            $(".btn-answer").hide();
                            $(".id-share--status").addClass("incorrect");
                            $(".id-share--status").removeClass("correct");
                            $(".id-share--status").show();
                            var now = new Date();
                            var utcTime = new Date(now.getTime() + data["minutes"] * 60000 + now.getTimezoneOffset()*60*1000);
                            var nextEvent = moment.tz(utcTime.toString('yyyy-mm-dd HH:mm:ss'), "Etc/GMT");
                            //alert(nextEvent.toDate());
                            $(".id-share--status").countdown(nextEvent.toDate(), function (event) {
                                $(this).html(event.strftime('Incorrect! Next try in: %M minutes %S seconds. '));
                            });
                            //$(".id-share--status").html("Incorrect! Next try in: " + data["minutes"] + " minutes. ");// + data["s"]);
                        } else {
                            (".id-share--status").show();
                            $(".id-share--status").html(" s. " + data["s"]);
                        }
                        break;
                    case "correct":
                        $(".js-ajax-php-json").hide();
                        $(".btn-answer").hide();
                        $(".id-share--status").addClass("correct");
                        $(".id-share--status").removeClass("incorrect");
                        $(".id-share--status").show();
                        $(".id-share--status").html("Answered on: " + data["answerdt"]);
                        break;
                    default:
                        (".id-share--status").show();
                        $(".id-share--status").html(" s. " + data["s"]);
                        break;
                }
            }
        });
    });

    $(".btn-answer").on('click', function (e) {
        e.preventDefault();
        var data = {
            "action": "check_answer",
            "puzzleid": $(".id-share--status").attr('href')
        };
        data = $(".js-ajax-php-json").serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php", //Relative or absolute path to response.php file
            data: data,
            success: function (data) {
                if (data["correct_answer"] == "Correct!") {
                    $(".btn-answer").hide();
                    $(".id-share--status").addClass("correct");
                    $(".id-share--status").removeClass("incorrect");
                    var s = "";
                    if (data["zone2points"] > 0) {
                        s = " You got +" + data["zone2points"] + " points.";
                    }
                    $(".id-share--status").html("Correct!" + s);
                } else {
                    $(".btn-answer").hide();
                    $(".js-ajax-php-json").hide();
                    $(".id-share--status").addClass("incorrect");
                    $(".id-share--status").removeClass("correct");
                    if (window.location.pathname.indexOf("free-puzzles") <= -1) {
                            var now = new Date();
                            var utcTime = new Date(now.getTime() + data["minutes"] * 60000 + now.getTimezoneOffset()*60*1000);
                            var nextEvent = moment.tz(utcTime.toString('yyyy-mm-dd HH:mm:ss'), "Etc/GMT");
                            //alert(nextEvent.toDate());
                            $(".id-share--status").countdown(nextEvent.toDate(), function (event) {
                                $(this).html(event.strftime('Incorrect! Next try in: %M minutes %S seconds. '));
                            });
                        // $(".id-share--status").html("Please try again in " + data["minutes"] + " minutes.");
                    } else
                        $(".id-share--status").html("Incorrect!");
                }
                $(".id-share--status").show();
            }
        });
        return false;
    });
    $('.process-payment').on('click', function (e) {
        e.preventDefault();
        if ($("#data-payment").val() === null) {
//            e.preventDefault();
            alert("Please select Membership payment option to proceed!");
        } else {
//            alert("start_payment.php?zone=2&option="+$("#data-payment").val());
            //         window.location = "start_payment.php?zone=2&option=" + $("#data-payment").val();
//               $ItemName = \filter_input(\INPUT_GET, 'itemname');
//    $ItemPrice = \filter_input(\INPUT_GET, 'itemprice');
//    $ItemNumber = \filter_input(\INPUT_GET, 'itemnumber');
//    $ItemDesc = \filter_input(\INPUT_GET, 'itemdesc');
//    $ItemQty = \filter_input(\INPUT_GET, 'itemQty');
            var months = $("#data-payment").val();
            var itemname = "Payment for " + months + " month(s)";
            var itemprice = 0;
            switch (months) {
                case "3":
                    itemprice = 7;
                    break;
                case "6":
                    itemprice = 12;
                    break;
                case "12":
                    itemprice = 20;
                    break;
                default:
                    itemprice = 3;
                    break;
            }
            var itemnumber = 1;
            var itemdesc = "Membership fee";
            var itemQty = 1;
            window.location = "start_payment.php?zone=2&option="+months;
//                    "PayPal/process.php?itemname=" + itemname +
//                    "&itemprice=" + itemprice +
//                    "&itemnumber=" + itemnumber +
//                    "&itemdesc=" + itemdesc +
//                    "&itemQty=" + itemQty;
        }
    });
});
