/**
 * Модуль Touch Up Smart
 * ЛР 3 — Модульне тестування
 * Студент: Бондаренко Тетяна Олександрівна, ПЗПІ-25-4
 *
 * Реалізація на основі UML-діаграми класів з ЛР 02:
 * Класи: FactCard, Category, FavoriteList
 */

const CARD_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

function validatePositiveInteger(value, paramName) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${paramName} must be a positive integer`);
  }
}

function validateNonEmptyString(value, paramName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${paramName} must be a non-empty string`);
  }

  return value.trim();
}
// КЛАС FactCard — картка з фактом (з діаграми класів ЛР 02)

class FactCard {
  
  /**
   * Конструктор картки факту
   * @param {number} cardId   — унікальний номер картки (ціле число > 0)
   * @param {string} title    — заголовок картки (не порожній рядок)
   * @param {string} content  — текст факту (не порожній рядок)
   */
  constructor(cardId, title, content) {
    validatePositiveInteger(cardId, "cardId");

    const normalizedTitle = validateNonEmptyString(title, "title");
    const normalizedContent = validateNonEmptyString(content, "content");

    this.cardId = cardId;
    this.title = normalizedTitle;
    this.content = normalizedContent;
    this.status = CARD_STATUS.ACTIVE;
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
    if (this.status === CARD_STATUS.INACTIVE) {
      throw new Error("Card is already inactive");
    }
    this.status = CARD_STATUS.INACTIVE;
  }
}

// Статичні константи статусу картки
FactCard.CARD_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};


// КЛАС Category — категорія події (з діаграми класів ЛР 02)

class Category {
  /**
   * Конструктор категорії
   * @param {number} categoryId — унікальний номер категорії (ціле число > 0)
   * @param {string} name       — назва категорії (не порожній рядок)
   */
  constructor(categoryId, name) {
    validatePositiveInteger(categoryId, "categoryId");
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
      throw new TypeError("card must be an instance of FactCard");
    }
    // Перевірка: картка з таким id вже є в категорії
    if (this.cards.some((c) => c.cardId === card.cardId)) {
  throw new Error(`Card with id ${card.cardId} already exists in category`);
}
    this.cards.push(card);
  }

  /**
   * getActiveCards() — повернути лише активні картки
   * @returns {FactCard[]}
   */
  getActiveCards() {
    return this.cards.filter((c) => c.status === CARD_STATUS.ACTIVE);
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
    validatePositiveInteger(listId, "listId");
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
    if (this.hasCard(card.cardId)) {
  throw new Error("Card already in favorites");
}
    validatePositiveInteger(card.cardId, "cardId"); 
    if (this.cards.some((c) => c.cardId === card.cardId)) {
      throw new Error("Card already in favorites");
    }
    this.cards.push(card);
  }

  /**
   * removeCard() — видалити картку з обраного за id
   * @param {number} cardId
   */
  removeCard(cardId) {
    validatePositiveInteger(cardId, "cardId");
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
