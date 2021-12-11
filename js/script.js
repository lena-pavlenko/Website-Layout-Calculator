'use strict';

// Получение переменных

// Заголовок
const title = document.getElementsByTagName('h1')[0];

// Кнопки
const btnStart = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];

// Кнопка +
const screenBtn = document.querySelector('.screen-btn');

// Инпуты для доп услуг
const percentItem = document.querySelectorAll('.other-items.percent');
const numberItem = document.querySelectorAll('.other-items.number');

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

// Экраны
let screen = document.querySelectorAll('.screen');

const appData = {
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicesPercent: {},
    servicesNumber: {},
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    serviceRollbackPrice: 0,
    count: 0,
    isOk: true,

    init() {
        appData.addTitle();
        btnStart.addEventListener('click', appData.checkValues);
        screenBtn.addEventListener('click', appData.addScreenBlock);
        inputRange.addEventListener('input', appData.getRollback)
        
    },

    // Добавляем заголовок для вкладки
    addTitle() {
       document.title = title.textContent;
    },

    // Запускаем вычисления
    start() {
        appData.addScreens();
        appData.addServieces();
        appData.addPrices();  
        appData.showResult();   
        appData.logger();
    },

    // Показ итоговых стоимостей
    showResult() {
        totalInputLayout.value = appData.screenPrice;
        totalInputServ.value = appData.servicePricesNumber + appData.servicePricesPercent;
        totalInputAll.value = appData.fullPrice;
        totalInputRollback.value = appData.serviceRollbackPrice;
        totalInputScreen.value = appData.count;
    },

    // Проверка селекта и инпутов
    checkValues() {
        screen = document.querySelectorAll('.screen');
        appData.isOk = true;
        screen.forEach(function(screen){
            const select = screen.querySelector('select'); // Получаем селект
            const inputScreen = screen.querySelector('input'); // Получаем инпут
            const selectName = select.options[select.selectedIndex].textContent; // Получаем текст из выбранной опции селекта
            
            if (selectName === 'Тип экранов' || !appData.isNumber(inputScreen.value)) {
                appData.isOk = false;
            }
        })
        if (appData.isOk) {
            appData.start();
        } else {
            alert('Заполни поля')
        }
    },

    // Меняем значения ползунком
    getRollback() {
        spanRange.textContent = inputRange.value + '%';
        appData.rollback = +inputRange.value;

        // Проверяем, если верстка уже рассчитана, то ползунок влияет на расчет стоимости
        if(totalInputLayout.value !== '0') {
            appData.serviceRollbackPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)) );
            totalInputRollback.value = appData.serviceRollbackPrice;
        }
    },

    // Получаем данные из выпадающего списка и инпута с ценой за экран
    addScreens() {
        screen = document.querySelectorAll('.screen');
        appData.count = 0;
        screen.forEach(function(screen, index){
            const select = screen.querySelector('select'); // Получаем селект
            const inputScreen = screen.querySelector('input'); // Получаем инпут
            const selectName = select.options[select.selectedIndex].textContent; // Получаем текст из выбранной опции селекта
            
            // Записываем объект с данными в массив
            appData.screens.push(
                {
                    id: index, 
                    name: selectName, 
                    price: +select.value * +inputScreen.value
                }
            );
            appData.count += +inputScreen.value;
           
        })
    },

    // По нажатию на плюс добавялем блок для выбора экрана
    addScreenBlock() {
        screen = document.querySelectorAll('.screen'); // Заново получаем новый нодлист
        const cloneScreen = screen[0].cloneNode(true); // Клонируем первый элемент
        screen[screen.length - 1].after(cloneScreen); // Добавляем его после последнего элемента
    },

    // Получаем данные от блока с доп.услугами
    addServieces() {
        // Узнаем доп услуги с процентами
        percentItem.forEach(function(item) {
            const check = item.querySelector('input[type="checkbox"]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type="text"]');

            // Проверяем, выбран ли чекбокс
            if(check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        })
        
        // Узнаем доп услуги в рублях
        numberItem.forEach(function(item) {
            const check = item.querySelector('input[type="checkbox"]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type="text"]');

            // Проверяем, выбран ли чекбокс
            if(check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        })  
    },

    // Подсчет суммы за экраны и за доп.сервисы
    addPrices(){
        // Подсчет суммы за экраны 
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        }

        // Подсчет суммы доп услуг, данных в рублях
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

         // Подсчет суммы доп услуг, данных в процентах
         for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        // Подсчет суммы за экраны и доп услуги
        appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

        // Подсчет стоимости с учетом отката
        appData.serviceRollbackPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)) );
    },

    // Проверка на число
    isNumber(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    // Логи
    logger() {
        console.log(appData);
    }
};

// Запуск
appData.init();
