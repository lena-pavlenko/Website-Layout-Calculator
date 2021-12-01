'use strict';

// Объявление переменных
let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 24;
let service1;
let service2;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

// Функция для проверки на число
const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

// Функция для вызова основных вопросов
const asking = function() {
    title = prompt('Как называется ваш проект?');
    screens = prompt('Какие типы экранов нужно разработать?');

    // Пока не введено число, вопрос будет задавать снова
    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    } while (!isNumber(screenPrice));

    screenPrice = +screenPrice; // Переводим ответ пользователя в числовой тип (убираем пробелы) и присваиваем переменной

    adaptive = confirm('Нужен ли адаптив на сайте?');
}

// Функция для определения типа переменной
const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
}

// Функция, определяющей сообщение о скидке
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

// Функция для подсчета суммы доп.услуг
const getAllServicePrices = function() {
    let sum = 0;
    let servicePrice;

    // Цикл для вывода вопросов
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
           service1 = prompt('Какой дополнительный тип услуги нужен?');
        }
        if (i === 1) {
           service2 = prompt('Какой дополнительный тип услуги нужен?');
        }

        // Пока не введено число, задаем вопрос снова
        do {
            servicePrice = prompt('Сколько это будет стоить?');
        } while (!isNumber(servicePrice));
        
        sum += +servicePrice; // Складываем ответы пользователя
        
    }
    return sum;
}

// Функция для подсчета полной стоимости
function getFullPrice(myScreenPrice, allPrice) {
    return myScreenPrice + allPrice;
}

// Функция для форматирования текста заголовка
const getTitle = function(myTitle) {
    myTitle = myTitle.trim();
    return myTitle[0].toUpperCase() + myTitle.slice(1).toLowerCase();
}

// Функция для подсчета стоимости с учетом отката
const getServicePercentPrices = function(myFullPrice, myRollback) {
    return Math.ceil(myFullPrice - (myFullPrice * (myRollback / 100)) );
}

// Функциональный блок
asking(); // Выводим вопросы
allServicePrices = getAllServicePrices(); // Узнаем сумму за доп.услуги
fullPrice = getFullPrice(screenPrice, allServicePrices);              // Узнаем полную стоимость
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);   // Узнаем стоимость с учетом отката

// Вывод типа переменных
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.split(', ')); // Вывод строки в виде массива
console.log(getRollbackMessage(fullPrice)); // Вывод полной стоимости
console.log(servicePercentPrice); // Вывод стоимости с учетом отката