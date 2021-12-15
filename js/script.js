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

// Блоки для CMS
const cmsInput = document.getElementById('cms-open');
const cmsHidden = document.querySelector('.hidden-cms-variants');

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
    inputCmsValue: 0,
    cmsPercent: 0,

    init() {
        this.addTitle();
        cmsInput.addEventListener('change', this.addCms.bind(this));
        btnStart.addEventListener('click', this.checkValues.bind(this));
        btnReset.addEventListener('click', this.reset.bind(this));
        screenBtn.addEventListener('click', this.addScreenBlock.bind(this));
        inputRange.addEventListener('input', this.getRollback.bind(this));
    },

    // Добавление CMS
    addCms() {
        // Показ скрытого блока при клике на 'CMS'
        if (cmsInput.checked === true) {
            cmsHidden.style.display = 'flex';
        } else {
            cmsHidden.style.display = 'none';
        } 
         
        // Получение необходимых элементов
        const inputHiddenWrap = cmsHidden.querySelector('.main-controls__input');
        const inputHidden = cmsHidden.querySelector('#cms-other-input');
        const select = document.querySelector('#cms-select');

        //событие выбора CMS
        select.addEventListener('change', () => {
            if (select.options[select.selectedIndex].value === 'other') {
                inputHiddenWrap.style.display = 'flex'; // Показ скрытого инпута
                inputHidden.value = 0; // Обнуление инпута
            }
            // wordpress
            if (select.options[select.selectedIndex].value === '50') {
                inputHiddenWrap.style.display = 'none'; // Скрытие инпута, если WP
                inputHidden.value = 50; // Значение в инпуте = 50 (%)
            } 
            if (select.options[select.selectedIndex].value === '') {
                inputHiddenWrap.style.display = 'none'; 
            }
        })
    },

    // Добавляем заголовок для вкладки
    addTitle() {
       document.title = title.textContent;
    },

    // Запускаем вычисления
    start() {
        this.addScreens();
        this.addServieces();
        this.addPrices();  
        this.showResult();   
        this.logger();
    },

    // Показ итоговых стоимостей
    showResult() {
        totalInputLayout.value = this.screenPrice;
        totalInputServ.value = this.servicePricesNumber + this.servicePricesPercent;
        totalInputAll.value = this.fullPrice;
        totalInputRollback.value = this.serviceRollbackPrice;
        totalInputScreen.value = this.count;
    },

    // Проверка селекта и инпутов
    checkValues() {
        screen = document.querySelectorAll('.screen');
        this.isOk = true;
        screen.forEach((screen) => {
            const select = screen.querySelector('select'); // Получаем селект
            const inputScreen = screen.querySelector('input'); // Получаем инпут
            const selectName = select.options[select.selectedIndex].textContent; // Получаем текст из выбранной опции селекта
            
            if (selectName === 'Тип экранов' || !this.isNumber(inputScreen.value)) {
                this.isOk = false;
            }
        })
        if (this.isOk) {
            this.start();
        } else {
            alert('Заполни поля')
        }
    },

    // Меняем значения ползунком
    getRollback() {
        spanRange.textContent = inputRange.value + '%';
        this.rollback = +inputRange.value;

        // Проверяем, если верстка уже рассчитана, то ползунок влияет на расчет стоимости
        if(totalInputLayout.value !== '0') {
            this.serviceRollbackPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)) );
            totalInputRollback.value = this.serviceRollbackPrice;
        }
    },

    // Получаем данные из выпадающего списка и инпута с ценой за экран
    addScreens() {
        screen = document.querySelectorAll('.screen');
        this.count = 0;
        screen.forEach((screen, index) => {
            const select = screen.querySelector('select'); // Получаем селект
            const inputScreen = screen.querySelector('input'); // Получаем инпут
            const selectName = select.options[select.selectedIndex].textContent; // Получаем текст из выбранной опции селекта
            
            // Записываем объект с данными в массив
            this.screens.push(
                {
                    id: index, 
                    name: selectName, 
                    price: +select.value * +inputScreen.value
                }
            );
            this.count += +inputScreen.value;

            // Отключение селектов и инпутов
            select.disabled = true;
            inputScreen.disabled = true;
            btnStart.style.display = 'none';
            btnReset.style.display = 'block';

            const selectCMS = document.querySelector('#cms-select');
            const inputHidden = cmsHidden.querySelector('#cms-other-input');
            selectCMS.disabled = true;
            inputHidden.disabled = true;
        })
    },

    // По нажатию на плюс добавялем блок для выбора экрана
    addScreenBlock() {
        screen = document.querySelectorAll('.screen'); // Заново получаем новый нодлист
        const cloneScreen = screen[0].cloneNode(true); // Клонируем первый элемент
        cloneScreen.querySelector('input').value = ''; // Очищаем инпут
        screen[screen.length - 1].after(cloneScreen); // Добавляем его после последнего элемента
    },

    // Получаем данные от блока с доп.услугами
    addServieces() {
        // Узнаем доп услуги с процентами
        percentItem.forEach((item) => {
            const check = item.querySelector('input[type="checkbox"]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type="text"]');

            // Проверяем, выбран ли чекбокс
            if(check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        })
        
        // Узнаем доп услуги в рублях
        numberItem.forEach((item) => {
            const check = item.querySelector('input[type="checkbox"]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type="text"]');

            // Проверяем, выбран ли чекбокс
            if(check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        })

        // Запись процента CMS в свойство объекта
        const cmsValue = cmsHidden.querySelector('#cms-other-input').value;

        if (this.isNumber(cmsValue)){
            this.cmsPercent = +cmsValue;
        }
    },

    // Подсчет суммы за экраны и за доп.сервисы
    addPrices(){
        // Подсчет суммы за экраны 
        for (let screen of this.screens) {
            this.screenPrice += +screen.price
        }

        // Подсчет суммы доп услуг, данных в рублях
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

         // Подсчет суммы доп услуг, данных в процентах
         for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }

        // Подсчет суммы за экраны и доп услуги
        this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

        // Подсчет суммы за CMS
        this.inputCmsValue = this.fullPrice * (this.cmsPercent / 100);

        // Подсчет суммы за экраны и ВСЕ доп.услуги
        this.fullPrice += this.inputCmsValue;

        // Подсчет стоимости с учетом отката
        this.serviceRollbackPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)) );
    },

    // Сброс расчетов
    reset() {

        // Сброс стилей кнопок
        btnReset.style.display = 'none';
        btnStart.style.display = 'block';

        // Отключение инпута и селекта, удаление селектов
        screen = document.querySelectorAll('.screen');
        screen.forEach((item, index) => {
            let select = item.querySelector('select');
            let inputScreen = item.querySelector('input');

            // Отключение
            select.disabled = false;
            inputScreen.disabled = false;

            // Возвращение к первой опции
            select.selectedIndex = 0; 
            
            // Очистка инпута
            inputScreen.value = '';

            // Удаление лишних селектов
            if (index !== 0) {
                item.remove();
            }
        })

        // Очистка чекбоксов
        const checkbox = document.querySelectorAll('.custom-checkbox');
        checkbox.forEach(item => {
            item.checked = false;
        })

        // Скрытие блока CMS
        cmsHidden.style.display = 'none';
        const selectCms = cmsHidden.querySelector('select');
        selectCms.disabled = false;
        cmsHidden.querySelector('input').disabled = false;
        cmsHidden.querySelector('input').value = '';
        selectCms.selectedIndex = 0;
        const inputHiddenWrap = cmsHidden.querySelector('.main-controls__input');
        inputHiddenWrap.style.display = 'none';
        


        // Сброс ползунка
        inputRange.value = '0';
        spanRange.textContent = inputRange.value + '%';

        // Сброс всех значений
        totalInputLayout.value = '0';
        totalInputServ.value = '0';
        totalInputAll.value = '0';
        totalInputRollback.value = '0';
        totalInputScreen.value = '0';
        this.screens = [];
        this.screenPrice = 0;
        this.adaptive = true;
        this.rollback = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.serviceRollbackPrice = 0;
        this.count = 0;
        this.isOk = true;
        this.inputCmsValue = 0;
        this.wordpressValue = 0;
    },

    // Проверка на число
    isNumber(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    // Логи
    logger() {
        
    }
};

// Запуск
appData.init();
