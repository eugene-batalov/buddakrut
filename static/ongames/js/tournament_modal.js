$(document).ready(function () {
    $(".tournament-event").on('click', function (e) {
        e.preventDefault();
        var data = {
            "action": "get_tournament",
            "tournament_id": $(this).prop("id"),
            "pathname": window.location.pathname
        };
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php",
            data: data,
            success: function (data) {
                $(".tournament-modal").html(data["tournament-modal"]);
                $(".btn-answer").on('click', function (e) {
                    e.preventDefault();
                    data = {
                        "action": "check_tournament_answer",
                        "tournament_id": $(".tournament-answer").attr("id"),
                        "puzzle_id": $(".tournament-answer").attr("puzzleid")
                    };
                    data = $(".tournament-answer").serialize() + "&" + $.param(data);
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "response.php",
                        data: data,
                        success: function (data) {
                            var message = "</div>";
                            if (data["winner"] != "0") {
                                message = " You are the winner, your place is: " + data["winner"] + " Scores table is updated. Your prize being sent to your account.</div>";
                            }
                            $(".tournament-answer").html(data["correct_answer"] + message);//+data["json"]);
                            $(".places").html(data["places"]);
                        }});
                });
            }
        });
    });
    $(".btn-answer").on('click', function (e) {
        e.preventDefault();
        alert("alertt");
    });
    $(".prev-month").on('click', function (e) {
    var data = {
        "action": "month_name",
        "change_month": -1
    };
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "response.php",
        data: data,
        success: function (data) {
            $(".subheader").html(data["month_name"]);
            $(".calendar").html(data["calendar"]);
            location.reload();
        }
    });
    e.preventDefault();
    });
        $(".next-month").on('click', function (e) {
    var data = {
        "action": "month_name",
        "change_month": 1
    };
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "response.php",
        data: data,
        success: function (data) {
            $(".subheader").html(data["month_name"]);
            $(".calendar").html(data["calendar"]);
            location.reload();
        }
    });
    e.preventDefault();
    });
});

document.onkeydown = function (e) {
    //e.preventDefault();
    e = e || window.event;
    var change_month = 0;
    switch (e.which || e.keyCode) {
        case 37:
            change_month = -1;
            break;
        case 39:
            change_month = 1;
            break;
        default:
            return;
    }
    var data = {
        "action": "month_name",
        "change_month": change_month
    };
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "response.php",
        data: data,
        success: function (data) {
            $(".subheader").html(data["month_name"]);
            $(".calendar").html(data["calendar"]);
            location.reload();
        }
    });
    e.preventDefault();
};