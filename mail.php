<?php
$to = "ryadomgg@gmail.com"; // емайл получателя данных из формы
$subject = "Форма обратной связи на PHP"; // тема полученного емайла
$message = "Ваше имя: ".$_POST['name']."<br>";//присвоить переменной значение, полученное из формы name=name
$message .= "Номер телефона: ".$_POST['phone']."<br>"; //полученное из формы name=phone
$message .= "E-mail: ".$_POST['email']."<br>"; //полученное из формы name=email
$message .= "Продукт: ".$_POST['product']."<br>"; //полученное из формы name=message
$additional_headers  = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
$additional_headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
mail($to, $message, $additional_headers); //отправляет получателю на емайл значения переменных
?>