/**
 * Модуль Touch Up Smart
 * ЛР 3 — Модульне тестування
 * Студент: Бондаренко Тетяна Олександрівна, ПЗПІ-25-4
 *
 * Реалізація на основі UML-діаграми класів з ЛР 02:
 * Класи: FactCard, Category, FavoriteList
 */


// КЛАС FactCard — картка з фактом (з діаграми класів ЛР 02)

class FactCard {
  /**
   * Конструктор картки факту
   * @param {number} cardId   — унікальний номер картки (ціле число > 0)
   * @param {string} title    — заголовок картки (не порожній рядок)
   * @param {string} content  — текст факту (не порожній рядок)
   */
  constructor(cardId, title, content) {
    // Перевірка: cardId повинен бути цілим числом і більше 0
    if (!Number.isInteger(cardId) || cardId <= 0) {
      throw new Error("cardId must be a positive integer");
    }
    // Перевірка: title повинен бути рядком і не порожнім
    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("title must be a non-empty string");
    }
    // Перевірка: content повинен бути рядком і не порожнім
    if (typeof content !== "string" || content.trim() === "") {
      throw new Error("content must be a non-empty string");
    }

    this.cardId = cardId;
    this.title = title.trim();
    this.content = content.trim();
    this.status = "active"; // За замовчуванням картка активна
  }

  /**
   * display() — показати картку у вигляді рядка
   * Використовується при перегляді карток (FR-03)
   * @returns {string}
   */
  display() {
    return `[${this.cardId}] ${this.title}: ${this.content}`;
  }

  /**
   * deactivate() — деактивувати картку (для модерації адміністратором)
   * Відповідає FR-07 — модерування контенту
   * Кидає помилку, якщо картка вже неактивна
   */
  deactivate() {
    if (this.status === "inactive") {
      throw new Error("Card is already inactive");
    }
    this.status = "inactive";
  }
}


// КЛАС Category — категорія події (з діаграми класів ЛР 02)

class Category {
  /**
   * Конструктор категорії
   * @param {number} categoryId — унікальний номер категорії (ціле число > 0)
   * @param {string} name       — назва категорії (не порожній рядок)
   */
  constructor(categoryId, name) {
    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      throw new Error("categoryId must be a positive integer");
    }
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("name must be a non-empty string");
    }

    this.categoryId = categoryId;
    this.name = name.trim();
    this.cards = []; // Масив карток у цій категорії
  }

  /**
   * addCard() — додати картку до категорії
   * @param {FactCard} card — об'єкт типу FactCard
   */
  addCard(card) {
    // Перевірка: card повинен бути екземпляром класу FactCard
    if (!(card instanceof FactCard)) {
      throw new Error("card must be an instance of FactCard");
    }
    // Перевірка: картка з таким id вже є в категорії
    const exists = this.cards.find((c) => c.cardId === card.cardId);
    if (exists) {
      throw new Error(`Card with id ${card.cardId} already exists in category`);
    }
    this.cards.push(card);
  }

  /**
   * getActiveCards() — повернути лише активні картки
   * @returns {FactCard[]}
   */
  getActiveCards() {
    return this.cards.filter((c) => c.status === "active");
  }

  /**
   * selectCategory() — вибрати категорію та дізнатись скільки активних карток
   * Відповідає FR-01 — вибір категорії події
   * @returns {string}
   */
  selectCategory() {
    const count = this.getActiveCards().length;
    if (count === 0) {
      return `Category "${this.name}" has no active cards`;
    }
    return `Category "${this.name}" selected. Active cards: ${count}`;
  }
}


// КЛАС FavoriteList — список обраного 

class FavoriteList {
  /**
   * Конструктор списку обраного
   * @param {number} listId — унікальний номер списку (ціле число > 0)
   */
  constructor(listId) {
    if (!Number.isInteger(listId) || listId <= 0) {
      throw new Error("listId must be a positive integer");
    }
    this.listId = listId;
    this.cards = [];
    this.createdAt = new Date();
  }

  /**
   * addCard() — додати картку в обране
   * Відповідає FR-05 — збереження в «Обране»
   * @param {FactCard} card
   */
  addCard(card) {
    if (!(card instanceof FactCard)) {
      throw new Error("card must be an instance of FactCard");
    }
    if (this.cards.find((c) => c.cardId === card.cardId)) {
      throw new Error("Card already in favorites");
    }
    this.cards.push(card);
  }

  /**
   * removeCard() — видалити картку з обраного за id
   * @param {number} cardId
   */
  removeCard(cardId) {
    if (!Number.isInteger(cardId) || cardId <= 0) {
      throw new Error("cardId must be a positive integer");
    }
    const index = this.cards.findIndex((c) => c.cardId === cardId);
    if (index === -1) {
      throw new Error(`Card with id ${cardId} not found in favorites`);
    }
    this.cards.splice(index, 1);
  }

  /**
   * hasCard() — перевірити, чи є картка в обраному
   * @param {number} cardId
   * @returns {boolean}
   */
  hasCard(cardId) {
    return this.cards.some((c) => c.cardId === cardId);
  }
}

// Експортуємо класи для використання у тестах
module.exports = { FactCard, Category, FavoriteList };

// Готуємо файл для Code Review