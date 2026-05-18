/**
 * Тести для модуля Touch Up Smart
 * ЛР 3 — Модульне тестування
 * Студент: Бондаренко Тетяна Олександрівна, ПЗПІ-25-4
 *
 * Фреймворк: Jest
 * Техніки: EP (Equivalence Partitioning — еквівалентне розбиття)
 *          BVA (Boundary Value Analysis — аналіз граничних значень)
 * Патерн кожного тесту: AAA (Arrange → Act → Assert)
 */

const { FactCard, Category, FavoriteList } = require("../src/touchUpSmart");

// БЛОК 1: Клас FactCard — перевірка конструктора


test("TC-01 | FactCard: коректне створення картки — всі поля заповнені правильно (EP: допустимий клас)", () => {
  // Arrange — готуємо вхідні дані
  const cardId = 1;
  const title = "Цікавий факт про тварин";
  const content = "Восьминоги мають три серця";

  // Act — викликаємо дію
  const card = new FactCard(cardId, title, content);

  // Assert — перевіряємо результат
  expect(card.cardId).toBe(1);
  expect(card.title).toBe("Цікавий факт про тварин");
  expect(card.content).toBe("Восьминоги мають три серця");
  expect(card.status).toBe("active");
});

test("TC-02 | FactCard: cardId = 0 повинен кидати помилку (BVA: значення 0, межа між недопустимим і допустимим)", () => {
  // Arrange — недопустиме граничне значення
  const cardId = 0;

  // Act + Assert — перевіряємо що кидається помилка
  expect(() => new FactCard(cardId, "title", "content")).toThrow(
    "cardId must be a positive integer"
  );
});

test("TC-03 | FactCard: від'ємний cardId = -1 повинен кидати помилку (EP: клас від'ємних чисел)", () => {
  // Arrange
  const cardId = -1;

  // Act + Assert
  expect(() => new FactCard(cardId, "title", "content")).toThrow(
    "cardId must be a positive integer"
  );
});

test("TC-04 | FactCard: порожній title повинен кидати помилку (EP: клас порожніх рядків)", () => {
  // Arrange
  const title = "";

  // Act + Assert
  expect(() => new FactCard(1, title, "content")).toThrow(
    "title must be a non-empty string"
  );
});

test("TC-05 | FactCard: порожній content повинен кидати помилку (EP: клас порожніх рядків)", () => {
  // Arrange
  const content = "";

  // Act + Assert
  expect(() => new FactCard(1, "title", content)).toThrow(
    "content must be a non-empty string"
  );
});


// БЛОК 2: Клас FactCard — методи display() та deactivate()


test("TC-06 | FactCard.display(): повертає коректно відформатований рядок (позитивний)", () => {
  // Arrange
  const card = new FactCard(1, "Факт дня", "Мед ніколи не псується");

  // Act
  const result = card.display();

  // Assert
  expect(result).toBe("[1] Факт дня: Мед ніколи не псується");
});

test("TC-07 | FactCard.deactivate(): статус картки стає inactive (позитивний)", () => {
  // Arrange
  const card = new FactCard(1, "Факт", "Текст факту");

  // Act
  card.deactivate();

  // Assert
  expect(card.status).toBe("inactive");
});

test("TC-08 | FactCard.deactivate(): повторна деактивація кидає помилку (EP: недопустимий стан)", () => {
  // Arrange — картка вже деактивована
  const card = new FactCard(1, "Факт", "Текст факту");
  card.deactivate();

  // Act + Assert — друга деактивація повинна кинути помилку
  expect(() => card.deactivate()).toThrow("Card is already inactive");
});


// БЛОК 3: Клас Category — конструктор та метод addCard()


test("TC-09 | Category: коректне створення категорії (EP: допустимий клас)", () => {
  // Arrange + Act
  const cat = new Category(1, "Свято");

  // Assert
  expect(cat.categoryId).toBe(1);
  expect(cat.name).toBe("Свято");
  expect(cat.cards).toHaveLength(0);
});

test("TC-10 | Category: порожня назва категорії кидає помилку (EP: клас порожніх рядків)", () => {
  // Arrange
  const name = "";

  // Act + Assert
  expect(() => new Category(1, name)).toThrow("name must be a non-empty string");
});

test("TC-11 | Category.addCard(): додавання однієї картки (позитивний)", () => {
  // Arrange
  const cat = new Category(1, "Бізнес");
  const card = new FactCard(1, "Порада для бізнесу", "Слухайте більше ніж говоріть");

  // Act
  cat.addCard(card);

  // Assert
  expect(cat.cards).toHaveLength(1);
});

test("TC-12 | Category.addCard(): додавання картки з тим самим id кидає помилку (EP: дублікат)", () => {
  // Arrange — картка вже є в категорії
  const cat = new Category(1, "Бізнес");
  const card = new FactCard(1, "Порада", "Текст");
  cat.addCard(card);

  // Act + Assert
  expect(() => cat.addCard(card)).toThrow("already exists in category");
});

test("TC-13 | Category.addCard(): передача не-FactCard об'єкту кидає помилку (EP: недопустимий тип)", () => {
  // Arrange — передаємо звичайний об'єкт замість FactCard
  const cat = new Category(1, "Спорт");
  const fakeCard = { cardId: 1, title: "fake" };

  // Act + Assert
  expect(() => cat.addCard(fakeCard)).toThrow(
    "card must be an instance of FactCard"
  );
});


// БЛОК 4: Клас Category — методи getActiveCards() та selectCategory()


test("TC-14 | Category.getActiveCards(): повертає лише активні картки (позитивний + EP)", () => {
  // Arrange — 2 картки: 1 активна, 1 деактивована
  const cat = new Category(1, "Свято");
  const card1 = new FactCard(1, "Активна картка", "Текст 1");
  const card2 = new FactCard(2, "Неактивна картка", "Текст 2");
  card2.deactivate(); // деактивуємо другу картку
  cat.addCard(card1);
  cat.addCard(card2);

  // Act
  const activeCards = cat.getActiveCards();

  // Assert — повинна бути лише 1 активна
  expect(activeCards).toHaveLength(1);
  expect(activeCards[0].cardId).toBe(1);
});

test("TC-15 | Category.selectCategory(): категорія без активних карток (BVA: 0 карток — нижня межа)", () => {
  // Arrange — порожня категорія
  const cat = new Category(1, "Тест");

  // Act
  const result = cat.selectCategory();

  // Assert
  expect(result).toBe('Category "Тест" has no active cards');
});

test("TC-16 | Category.selectCategory(): рівно 1 активна картка (BVA: мінімум 1 картка)", () => {
  // Arrange
  const cat = new Category(1, "Побачення");
  cat.addCard(new FactCard(1, "Тема для розмови", "Розкажи про своє хобі"));

  // Act
  const result = cat.selectCategory();

  // Assert
  expect(result).toContain("Active cards: 1");
  expect(result).toContain("Побачення");
});

test("TC-17 | Category.selectCategory(): кілька активних карток (EP: більше 1 картки)", () => {
  // Arrange
  const cat = new Category(1, "Вечірка");
  cat.addCard(new FactCard(1, "Факт 1", "Текст 1"));
  cat.addCard(new FactCard(2, "Факт 2", "Текст 2"));
  cat.addCard(new FactCard(3, "Факт 3", "Текст 3"));

  // Act
  const result = cat.selectCategory();

  // Assert
  expect(result).toContain("Active cards: 3");
});


// БЛОК 5: Клас FavoriteList — конструктор


test("TC-18 | FavoriteList: коректне створення (EP: допустимий listId)", () => {
  // Arrange + Act
  const list = new FavoriteList(1);

  // Assert
  expect(list.listId).toBe(1);
  expect(list.cards).toHaveLength(0);
  expect(list.createdAt).toBeInstanceOf(Date);
});

test("TC-19 | FavoriteList: listId = 0 кидає помилку (BVA: значення 0, межа між недопустимим і допустимим)", () => {
  // Arrange
  const listId = 0;

  // Act + Assert
  expect(() => new FavoriteList(listId)).toThrow(
    "listId must be a positive integer"
  );
});


// БЛОК 6: Клас FavoriteList — методи addCard(), removeCard(), hasCard()


test("TC-20 | FavoriteList.addCard(): успішне додавання картки в обране (позитивний)", () => {
  // Arrange
  const list = new FavoriteList(1);
  const card = new FactCard(5, "Улюблений факт", "Текст улюбленого факту");

  // Act
  list.addCard(card);

  // Assert
  expect(list.cards).toHaveLength(1);
  expect(list.hasCard(5)).toBe(true);
});

test("TC-21 | FavoriteList.addCard(): додавання дубліката кидає помилку (EP: картка вже в обраному)", () => {
  // Arrange
  const list = new FavoriteList(1);
  const card = new FactCard(1, "Факт", "Текст");
  list.addCard(card);

  // Act + Assert
  expect(() => list.addCard(card)).toThrow("Card already in favorites");
});

test("TC-22 | FavoriteList.removeCard(): успішне видалення картки з обраного (позитивний)", () => {
  // Arrange — картка є в обраному
  const list = new FavoriteList(1);
  const card = new FactCard(1, "Факт", "Текст");
  list.addCard(card);

  // Act
  list.removeCard(1);

  // Assert
  expect(list.cards).toHaveLength(0);
  expect(list.hasCard(1)).toBe(false);
});

test("TC-23 | FavoriteList.removeCard(): видалення картки якої немає кидає помилку (EP: відсутній id)", () => {
  // Arrange — порожній список
  const list = new FavoriteList(1);

  // Act + Assert
  expect(() => list.removeCard(99)).toThrow("not found in favorites");
});