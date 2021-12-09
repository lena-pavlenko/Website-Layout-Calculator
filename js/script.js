'use strict';

// Получение переменных

// Заголовок
const title = document.getElementsByTagName('h1')[0];

// Кнопки
const handlerBtns = document.getElementsByClassName('handler_btn');
let [btnStart, btnReset] = handlerBtns;

// Кнопка +
const screenBtn = document.querySelector('.screen-btn');

// Инпуты для доп услуг
const percentItem = document.querySelectorAll('.other-items.percent');
const numberItem = document.querySelectorAll('.other-items.number');
console.log(percentItem, numberItem)

// Инпут range
const inputRange = document.querySelector('.rollback input[type="range"]');
// Спан 
const spanRange = document.querySelector('.rollback .range-value');

// Инпуты справа
const totalInputLayout = document.getElementsByClassName('total-input')[0];
const totalInputScreen = document.getElementsByClassName('total-input')[1];
const totalInputServ = document.getElementsByClassName('total-input')[2];
const totalInputAll = document.getElementsByClassName('total-input')[3];
const totalInputRollback = document.getElementsByClassName('total-input')[4];

console.log(totalInputLayout, totalInputScreen, totalInputServ, totalInputAll, totalInputRollback)


// Экраны
let screen = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 24,
    services: {},
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices);          
        appData.getServicePercentPrices(appData.fullPrice, appData.rollback); 
        appData.getTitle();

        appData.logger();
    },

    // Проверка для строчных значений
    checkStroke(myTitle, question) {
        do {
            myTitle = prompt(question);
        } while (appData.isNumber(myTitle) || myTitle.trim() === '');

        return myTitle;
    },

    asking: function() {
        appData.title = appData.checkStroke(appData.title, 'Как называется ваш проект?');
        
        // Цикл для экранов
        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;
                name = appData.checkStroke(name, 'Какие типы экранов нужно разработать?');

            do {
                price = prompt('Сколько будет стоить данная работа?');
            } while (!appData.isNumber(price));

            appData.screens.push({id: i, name: name, price: +price});
        }

        // Цикл для доп.услуг
        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;
            name = appData.checkStroke(name, 'Какой дополнительный тип услуги нужен?');
        
            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(price));

            // Запись каждого значения в объект
            appData.services[`${name}_${i}`] = +price;
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    
    // Подсчет суммы за экраны и за доп.сервисы
    addPrices: function(){
        // Подсчет суммы за экраны через метод reduce
        appData.screenPrice = appData.screens.reduce(function(sum, current) {
            return sum.price + current.price;
        });

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },

    showTypeOf: function(variable) {
        console.log(variable, typeof variable);
    },

    getRollbackMessage: function(price) {
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
    },

    getFullPrice: function(myScreenPrice, allPrice) {
        appData.fullPrice = myScreenPrice + allPrice;
    },

    getTitle: function() {
        appData.title = appData.title.trim();
        appData.title = appData.title[0].toUpperCase() + appData.title.slice(1).toLowerCase();
    },

    getServicePercentPrices: function(myFullPrice, myRollback) {
        appData.servicePercentPrice = Math.ceil(myFullPrice - (myFullPrice * (myRollback / 100)) );
    },

    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    logger: function() {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.services);
        console.log(appData.screens);
        console.log(appData.screenPrice);
    }
};

// appData.start();
