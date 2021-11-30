'use strict';

// Объявление переменных
const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
const rollback = 24;

// Объявление функции для определения типа переменной
const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
}
// Объявление функции, определяющей сообщение о скидке
const getRollbackMessage = function(price) {
    if (price >= 30000) {
        return 'Даем скидку в 10%';
    }
    if (price > 15000 && price < 30000) {
        return 'Даем скидку в 5%';
    }
    if (price <= 15000 && price > 0) {
        return 'Скидка не предусмотрена';
    }
    if (price <= 0) {
        return 'Что-то пошло не так';
    }
}
// Объявление функции для подсчета суммы доп.услуг
const getAllServicePrices = function(extra1, extra2) {
    return extra1 + extra2;
}
// Объявление функции для подсчета полной стоимости
function getFullPrice(myScreenPrice, allPrice) {
    return myScreenPrice + allPrice;
}
// Объявление функции для форматирования текста заголовка
const getTitle = function(myTitle) {
    myTitle = myTitle.trim();
    return myTitle[0].toUpperCase() + myTitle.slice(1).toLowerCase();
}
// Объявление функции для подсчета стоимости с учетом отката
const getServicePercentPrices = function(myFullPrice, myRollback) {
    return Math.ceil(myFullPrice - (myFullPrice * (myRollback / 100)) );
}

// Функциональный блок
const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2); // Узнаем сумму за доп.услуги
const fullPrice = getFullPrice(screenPrice, allServicePrices);              // Узнаем полную стоимость
const servicePercentPrice = getServicePercentPrices(fullPrice, rollback);   // Узнаем стоимость с учетом отката

// Вывод типа переменных
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.split()); // Вывод строки в виде массива
console.log(getRollbackMessage(fullPrice)); // Вывод полной стоимости
console.log(servicePercentPrice); // Вывод стоимости с учетом отката