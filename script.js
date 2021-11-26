// Создание переменных
const title = 'jsCourse';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 500;
let rollback = 24;
let fullPrice = 30000;
let adaptive = true;

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
console.log(fullPrice * (rollback/100));