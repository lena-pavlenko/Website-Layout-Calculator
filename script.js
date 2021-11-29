'use strict';

// Запрашивание у пользователя основных данных
const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const adaptive = confirm('Нужен ли адаптив на сайте?');

// Запрашивание дополнительной информации
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');

// Вычисление итоговой стоимости
const fullPrice = screenPrice + servicePrice1 + servicePrice2;

// Вычисление стоимости с учетом отката
const rollback = 24;
const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback / 100)) );
console.log(servicePercentPrice);

// Конструкция условий
if (fullPrice >= 30000) {
    console.log('Даем скидку в 10%');
} else if (fullPrice > 15000 && fullPrice < 30000) {
    console.log('Даем скидку в 5%');
} else if (fullPrice <= 15000 && fullPrice > 0) {
    console.log('Скидка не предусмотрена');
} else if (fullPrice <= 0) {
    console.log('Что-то пошло не так');
}


// Вывод типа переменных в консоль
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

// Вывод длины строки
console.log(screens.length);

// Примеры конкатенации
console.log('Стоимость верстки экранов: ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта: '  +fullPrice + ' рублей');

// Приведение символов строки к нижнему регистру
// и разбиение ее на массив (содержит один элемент - всю строку)
console.log(screens.toLowerCase().split());

// Умножение чисел
console.log(fullPrice * (rollback / 100));