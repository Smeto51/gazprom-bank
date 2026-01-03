export const TASKS = [
  {
    title: "Задача 1 filter — вернуть часть элементов",
    desc: ` 🟢 📌 Есть массив чисел:\n
        [5, 8, 12, 3, 1]
        Верни только числа больше 5.`,
  },
  {
    title: "Задача 2 ",
    desc: `Есть массив объектов:`,
    taskCode: `
    [
        { name: 'Ann', age: 25 },
        { name: 'Bob', age: 17 },
        { name: 'John', age: 30 },
    ]
        `,
  },
  {
    title: "Задача 3 Умножь каждое число на 10.",
    desc: `Есть массив объектов:`,
    taskCode: `
    [
        [5, 8, 12, 3, 1];
    ]
        `,
  },
  {
    title: "Задача 4 Верни массив только имён.",
    desc: `Есть массив объектов:`,
    taskCode: `
    [
      { name: "Ann", age: 25 },
      { name: "Bob", age: 17 },
      { name: "John", age: 30 },
    ]
        `,
  },

  {
    title: "Задача 5 Найди элемент banana.",
    desc: `Есть массив объектов:`,
    taskCode: `
    ['apple', 'orange', 'banana']
        `,
  },
  {
    title: "Задача 6 Найди пользователя с id = 2.",
  },
  { title: "Задача 7 Проверь: есть ли число больше 5?" },
  { title: "Задача 8 Проверь: есть ли неактивный пользователь?" },
  { title: "Задача 9 Проверь: все ли числа больше 5?" },
  { title: "Задача 10 Проверь: все ли значения true?" },
  {
    title: "Задача 11 Найди сумму всех элементов",
    taskCode: "[5, 8, 12, 3, 1]",
  },
  {
    title: "Задача 12 Найди общий возраст активных пользователей",
    taskCode: `  { id: 1, name: "Ann", age: 25, isActive: true },
  { id: 10, name: "Bob", age: 17, isActive: true },
  { id: 2, name: "John", age: 30, isActive: false },`,
  },
  { title: "Задача 13 Удали 1 элемент, выведи удаленый элемент и массив" },
  {
    title:
      "Задача 14 Удали последний элемент, выведи удаленый элемент и массив",
  },
  {
    title: "Задача 15 (splice вставка) (splice удаление) (splice замена)",
  },
];

export const NAME_AGE = [
  { id: 1, name: "Ann", age: 25, isActive: true },
  { id: 10, name: "Bob", age: 17, isActive: true },
  { id: 2, name: "John", age: 30, isActive: false },
];

export const TEST_NUMBER_ARRAY = [5, 8, 12, 3, 1];

export const TASKS_2 = [
  {
    title: "Получить только продукты категории food",
    desc: "",
    taskCode: `TEST_PRODUCTS = [
  { id: 1, title: "Milk", price: 1.2, category: "food" },
  { id: 2, title: "TV", price: 300, category: "electronics" },
  { id: 3, title: "Bread", price: 0.8, category: "food" },
  { id: 4, title: "Laptop", price: 1200, category: "electronics" },
  { id: 5, title: "Chair", price: 85, category: "furniture" },
  { id: 6, title: "Apple", price: 0.5, category: "food" },
  { id: 7, title: "Smartphone", price: 800, category: "electronics" },
  { id: 8, title: "Table", price: 200, category: "furniture" },
  { id: 9, title: "Eggs", price: 2.5, category: "food" },
  { id: 10, title: "Headphones", price: 150, category: "electronics" },
  { id: 11, title: "Sofa", price: 500, category: "furniture" },
  { id: 12, title: "Cheese", price: 3.5, category: "food" },
  { id: 13, title: "Monitor", price: 250, category: "electronics" },
  { id: 14, title: "Bookshelf", price: 120, category: "furniture" },
  { id: 15, title: "Banana", price: 0.3, category: "food" },
  { id: 16, title: "Keyboard", price: 75, category: "electronics" },
  { id: 17, title: "Bed", price: 400, category: "furniture" },
  { id: 18, title: "Chicken", price: 5, category: "food" },
  { id: 19, title: "Mouse", price: 40, category: "electronics" },
  { id: 20, title: "Desk", price: 180, category: "furniture" },
];`,
  },
  { title: "Список названий товаров:" },
  {
    title:
      "Посчитать суммарную стоимость по категориям, вывести количество товаров:",
  },
  {
    title: `1) Object.getPrototypeOf`,
    desc: `Создай объект user = { name: "Ann" }.
Выведи в консоль:`,

    taskCode: `Object.getPrototypeOf(user) === Object.prototype (что будет?)`,
  },
  {
    title: `Задачи 4`,
    desc: `Object.create

Создай base = { kind: "base" } и child = Object.create(base).
Проверь:
есть ли у child собственное свойство kind?
чему равен child.kind?


3) hasOwnProperty vs доступ по прототипу
Для child из задачи 2:
child.hasOwnProperty("kind") → ?
"kind" in child → ?


4) Shadowing (перекрытие свойства)
Добавь child.kind = "child" и проверь:
child.kind
base.kind
child.hasOwnProperty("kind")


5) Удаление перекрытия
Сделай delete child.kind и проверь, что снова берётся из прототипа.`,
  },
  {
    title: "Задачи 5",
    desc: `методы и this
    6) Метод в прототипе через Object.create
    7) Ломаем this стрелкой
    8) call/apply/bind`,
  },
];

export const TEST_PRODUCTS = [
  { id: 1, title: "Milk", price: 1.2, category: "food" },
  { id: 2, title: "TV", price: 300, category: "electronics" },
  { id: 3, title: "Bread", price: 0.8, category: "food" },
  { id: 4, title: "Laptop", price: 1200, category: "electronics" },
  { id: 5, title: "Chair", price: 85, category: "furniture" },
  { id: 6, title: "Apple", price: 0.5, category: "food" },
  { id: 7, title: "Smartphone", price: 800, category: "electronics" },
  { id: 8, title: "Table", price: 200, category: "furniture" },
  { id: 9, title: "Eggs", price: 2.5, category: "food" },
  { id: 10, title: "Headphones", price: 150, category: "electronics" },
  { id: 11, title: "Sofa", price: 500, category: "furniture" },
  { id: 12, title: "Cheese", price: 3.5, category: "food" },
  { id: 13, title: "Monitor", price: 250, category: "electronics" },
  { id: 14, title: "Bookshelf", price: 120, category: "furniture" },
  { id: 15, title: "Banana", price: 0.3, category: "food" },
  { id: 16, title: "Keyboard", price: 75, category: "electronics" },
  { id: 17, title: "Bed", price: 400, category: "furniture" },
  { id: 18, title: "Chicken", price: 5, category: "food" },
  { id: 19, title: "Mouse", price: 40, category: "electronics" },
  { id: 20, title: "Desk", price: 180, category: "furniture" },
];
