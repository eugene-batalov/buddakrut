$(document).ready(function () {
    $(".btn-group").on('click', function (e) {
        e.preventDefault();
        $(".btn-group").removeClass("active");
        $(this).addClass("active");
        switch ($(this).text()) {
            case "Art":
                $.cookie("group", 2);
                break;
            case "Cities":
                $.cookie("group", 1);
                break;
            case "Nature":
                $.cookie("group", 3);
                break;
            case "Transport":
                $.cookie("group", 4);
                break;
        }
        location.reload();
        return false;
    });

    $(".btn-group").addClass(function (index, currentClass) {
        var addedClass;
        if ($.cookie("group") == null)
            $.cookie("group", 2);
        var gr = $.cookie("group");
        if ($(this).text() == "Art" && gr == 2 ||
                $(this).text() == "Cities" && gr == 1 ||
                $(this).text() == "Nature" && gr == 3 ||
                $(this).text() == "Transport" && gr == 4) {
            addedClass = "active";
        }
        return addedClass;
    });
    $(".btn-group").removeClass(function (index, currentClass) {
        var removedClass;
        if ($.cookie("group") == null)
            $.cookie("group", 2); // по умолчанию выбор 2 группы - Art
        var gr = $.cookie("group");
        if ($(this).text() != "Art" && gr == 2 ||
                $(this).text() != "Cities" && gr == 1 ||
                $(this).text() != "Nature" && gr == 3 ||
                $(this).text() != "Transport" && gr == 4) {
            removedClass = "active";
        }
        return removedClass;
    });

    $(".lvl").on('click', function (e) {
        e.preventDefault();
        switch ($(this).find("span").text()) {
            case "Level 1":
                $.cookie("level", 1);
                break;
            case "Level 2":
                $.cookie("level", 2);
                break;
            case "Level 3":
                $.cookie("level", 3);
                break;
        }
        location.reload();
        $(".lvl").removeClass("active");
        $(this).addClass("active");
        return false;
    });

    $(".lvl").addClass(function (index, currentClass) {
        var addedClass;
        if ($.cookie("level") == null)
            $.cookie("level", 1);// по умолчанию выбор 1 уровня сложности
        if ($(this).find("span").text() == "Level " + $.cookie("level")) {
            addedClass = "active";
        }
        return addedClass;
    });
    $(".lvl").removeClass(function (index, currentClass) {
        var removedClass;

        if ($(this).find("span").text() != "Level " + $.cookie("level")) {
            removedClass = "active";
        }
        return removedClass;
    });
});
