# ЛР 3 — Модульне тестування (Unit Testing)

**Студент:** Бондаренко Тетяна Олександрівна  
**Група:** ПЗПІ-25-4  
**Проєкт:** Touch Up Smart  
**Дисципліна:** Основи програмної інженерії  

---

## Про модуль

Програмний модуль реалізовано на основі **UML-діаграми класів з ЛР 02**.

🔗 **Посилання на UML-модель (ЛР 02):** https://github.com/HlibBaistovNURE/Touch-Up-Smart-OPI-Group-4-4

Модуль містить 3 класи відповідно до діаграми класів:

| Клас | Відповідна вимога | Опис |
|------|-----------------|------|
| `FactCard` | FR-03, FR-07 | Картка з фактом — перегляд та модерація |
| `Category` | FR-01, FR-02 | Категорія події — вибір та генерація карток |
| `FavoriteList` | FR-05 | Список обраного користувача |

---

## Технології

- **Мова:** JavaScript (Node.js)
- **Фреймворк тестування:** Jest 29
- **Покриття:** Jest Coverage (HTML-звіт)
- **CI/CD:** GitHub Actions

---

## Структура проєкту

```
bse-lr3-Bondarenko/
├── src/
│   └── touchUpSmart.js        ← основний модуль (3 класи)
├── tests/
│   └── touchUpSmart.test.js   ← 23 тест-кейси (EP + BVA)
├── .github/
│   └── workflows/
│       └── tests.yml          ← автозапуск через GitHub Actions
├── package.json
└── README.md
```

---

## Запуск тестів

```bash
# 1. Встановити залежності
npm install

# 2. Запустити тести з покриттям
npm test
```

Після запуску відкрий файл `coverage/lcov-report/index.html` у браузері — це HTML-звіт покриття.

---

## Результати тестування

- **Кількість тест-кейсів:** 23
- **Line coverage:** 100%
- **Техніки:** EP (Equivalence Partitioning), BVA (Boundary Value Analysis)
- **Патерн тестів:** AAA (Arrange → Act → Assert)

---

## Таблиця тест-кейсів

| ID | Метод | Техніка | Тип |
|----|-------|---------|-----|
| TC-01 | FactCard constructor | EP | Позитивний |
| TC-02 | FactCard constructor | BVA (cardId=0) | Негативний |
| TC-03 | FactCard constructor | EP (від'ємний) | Негативний |
| TC-04 | FactCard constructor | EP (порожній title) | Негативний |
| TC-05 | FactCard constructor | EP (порожній content) | Негативний |
| TC-06 | FactCard.display() | — | Позитивний |
| TC-07 | FactCard.deactivate() | — | Позитивний |
| TC-08 | FactCard.deactivate() | EP (вже inactive) | Негативний |
| TC-09 | Category constructor | EP | Позитивний |
| TC-10 | Category constructor | EP (порожня назва) | Негативний |
| TC-11 | Category.addCard() | — | Позитивний |
| TC-12 | Category.addCard() | EP (дублікат) | Негативний |
| TC-13 | Category.addCard() | EP (не FactCard) | Негативний |
| TC-14 | Category.getActiveCards() | EP | Позитивний |
| TC-15 | Category.selectCategory() | BVA (0 карток) | Граничний |
| TC-16 | Category.selectCategory() | BVA (1 картка) | Граничний |
| TC-17 | Category.selectCategory() | EP (багато) | Позитивний |
| TC-18 | FavoriteList constructor | EP | Позитивний |
| TC-19 | FavoriteList constructor | BVA (listId=0) | Негативний |
| TC-20 | FavoriteList.addCard() | — | Позитивний |
| TC-21 | FavoriteList.addCard() | EP (дублікат) | Негативний |
| TC-22 | FavoriteList.removeCard() | — | Позитивний |
| TC-23 | FavoriteList.removeCard() | EP (немає картки) | Негативний |
