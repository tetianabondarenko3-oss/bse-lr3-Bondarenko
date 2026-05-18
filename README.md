# ЛР 3 — Модульне тестування (Unit Testing)

**Студент:** Бондаренко Тетяна Олександрівна  
**Група:** ПЗПІ-25-4  
**Проєкт:** Touch Up Smart  
**Дисципліна:** Основи програмної інженерії  

---

## Про модуль

Програмний модуль реалізовано на основі **UML-діаграми класів з ЛР 02**.

**Посилання на UML-модель (ЛР 02):** https://github.com/tetianabondarenko3-oss/bse-lr2-Bondarenko/tree/lab-02/lab-02

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

## Результати тестування

- **Кількість тест-кейсів:** 23
- **Line coverage:** 100%
- **Техніки:** EP (Equivalence Partitioning), BVA (Boundary Value Analysis)
- **Патерн тестів:** AAA (Arrange → Act → Assert)

---