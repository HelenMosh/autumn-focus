// script.js

// Массив мыслей дня
const tips = [
  "Великие дела начинаются с маленьких шагов.",
  "Не бойся ошибок — они часть пути.",
  "Сегодня ты сделаешь больше, чем вчера!",
  "Терпение — лучший друг успеха.",
  "Маленькая победа — тоже победа."
];

// Переменные прогресса тыквы
let pumpkinLevel = parseInt(localStorage.getItem("pumpkinLevel")) || 1;
let lastWatered = parseInt(localStorage.getItem("lastWatered")) || 0;

// Элементы DOM
const pumpkin = document.getElementById("pumpkin");
const waterButton = document.getElementById("water-btn");
const bookModal = document.getElementById("book-modal");
const bookText = document.getElementById("book-text");
const bookClose = document.getElementById("book-close");

// Отрисовка текущего состояния тыквы
function renderPumpkin() {
  // Сдвигаем спрайт по X (кадр 64x64)
  const frameWidth = 64;
  pumpkin.style.backgroundPosition = `-${(pumpkinLevel - 1) * frameWidth}px 0px`;
}

// Полив
waterButton.addEventListener("click", () => {
  const now = Date.now();
  if (now - lastWatered >= 5000) { // 5 секунд для теста (вместо 1 часа)
    if (pumpkinLevel < 5) {
      pumpkinLevel++;
      localStorage.setItem("pumpkinLevel", pumpkinLevel);
    }
    lastWatered = now;
    localStorage.setItem("lastWatered", lastWatered);
    renderPumpkin();

    // Случайная мысль
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    bookText.textContent = randomTip;
    bookModal.style.display = "block";
  } else {
    // Сообщение, если слишком рано поливать
    bookText.textContent = "Тыкве нужно время, чтобы впитать воду!";
    bookModal.style.display = "block";
  }
});

// Закрытие модалки
bookClose.addEventListener("click", () => {
  bookModal.style.display = "none";
});

// Перерисовка при загрузке страницы
renderPumpkin();
