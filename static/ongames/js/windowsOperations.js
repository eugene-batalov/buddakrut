function CloseWindow()
{
    window.opener.location.reload(true);
    var thisWindow = window.open("", '_self');
    thisWindow.close();
    return false;
}
function PopupWindow(url, title, w, h)
{
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 3) - (h / 2);
    var win = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    win.focus();
    return false;
}

