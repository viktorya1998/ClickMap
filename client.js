// получение координат
function getPosition(e) {
    var x = y = 0;
    if (!e) {
        var e = window.event;
    }
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    } else if (e.clientX || e.clientY) {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { x: x, y: y }
}

// обработчик клика
document.onclick = function(e) {

    var coord = getPosition(e);

    var struct = {
        x: coord.x,
        y: coord.y,
        time: new Date().getHours()
    };

    $.ajax({
        type: 'POST',
        url: 'server.php',
        dataType: 'html',
        data: ({ 'x': struct.x, 'y': struct.y, 'time': struct.time, 'name': 'Table0' })
    });
}