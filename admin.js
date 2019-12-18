//Отправка запроса на сервер
$.ajax({
    type: 'POST',
    url: 'server.php',
    dataType: 'json',
    data: ({ tabl: 'Tab1' }),
    success: Success,
    error: function(xhr, status, error) {
        console.log(xhr.responseText + '\n\n' + status + '\n\n' + error);
    }
});

function Success(json) {
    var time = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var click = [];

    json.forEach(element => {
        time[element[2]]++;
        click.push({ x: element[0], y: element[1], valye: 1 });
    });

    //Диаграмма
    chart(time);

    //Карта кликов
    map(click);
}

function chart(time) {
    var ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00',
                '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
                '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
                '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
                '23:00', '24:00'
            ],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: time
            }]
        },
        options: {}
    });
}

function map(click) {

    var heatmap = h337.create({
        container: document.getElementById('heatmapContainer'),
        maxOpacity: .5,
        radius: 10,
        blur: .75,
    });

    heatmap.setData({
        max: 5,
        data: click
    });
}