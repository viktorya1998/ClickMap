<?php

//Подключение БД
$conn = mysqli_connect("localhost", "Click", "vfpbkf200", "click");

if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}


//Получение данных от Клиента
if (isset($_POST['x'])) {
    
    $X = $_POST['x'];
    $Y = $_POST['y'];
    $Time = $_POST['time'];
    $name = $_POST['name'];

    //Добавление данных в базу
    $sql = "INSERT INTO $name  (x, y, time) VALUES ($X, $Y, $Time)";

    if (!mysqli_query($conn, $sql)) {
        echo "Ошибка: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}else
if (isset($_POST['table'])) {

    //Получает название таблицы
    $nameTab = $_POST['table'] . "";

    $result = mysqli_query($conn, "SELECT * FROM $nameTab ");

    // Проверяем удачно ли выполнен запрос 
    if ($result === false) {
        echo mysqli_error($conn);
    } 
    else 
    {
        $mas = array();
        while ($row = mysqli_fetch_array($result)) {
            $mas[] = array($row["x"], $row["y"], $row["time"]);
        }

        echo json_encode($mas);
    }
    mysqli_close($conn);
}
else
echo "error";