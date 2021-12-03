'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 24,
    service1: '',
    service2: '',
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    start: function() {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);          
        appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback); 

        appData.logger();
    },

    asking: function() {
        appData.title = prompt('Как называется ваш проект?');
        appData.screens = prompt('Какие типы экранов нужно разработать?');
    
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        } while (!appData.isNumber(appData.screenPrice));
    
        appData.screenPrice = +appData.screenPrice;
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
        appData.title = appData.getTitle();
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

    getAllServicePrices: function() {
        let sum = 0;
        let servicePrice;
    
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
            }
            if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
            }

            do {
                servicePrice = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(servicePrice));
            
            sum += +servicePrice;
        }
        return sum;
    },

    getFullPrice: function(myScreenPrice, allPrice) {
        return myScreenPrice + allPrice;
    },

    getTitle: function() {
        appData.title = appData.title.trim();
        return appData.title[0].toUpperCase() + appData.title.slice(1).toLowerCase();
    },

    getServicePercentPrices: function(myFullPrice, myRollback) {
        return Math.ceil(myFullPrice - (myFullPrice * (myRollback / 100)) );
    },

    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    logger: function() {
        for (let key in appData) {
            console.log(key, appData[key]);
        }
    }
};

appData.start();
