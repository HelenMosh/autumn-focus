// script.js

// ------------------ Элементы страниц ------------------
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
// ------------------ Кнопка "Полить" ------------------
const waterBtn = document.getElementById('water-btn');
const bookModal = document.getElementById('book-modal');
const bookText = document.getElementById('book-text');
const bookClose = document.getElementById('book-close');

const tips = [
  "Тыкве нужно время, чтобы впитать воду!",
  "Помни, что регулярный уход за растением — залог роста.",
  "Полив помогает твоей тыкве расти!",
  "Каждый час — шанс для тыквы подрасти!"
];

waterBtn.addEventListener('click', () => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  bookText.textContent = randomTip;
  bookModal.style.display = 'block';
});

bookClose.addEventListener('click', () => {
  bookModal.style.display = 'none';
});

// Кнопки навигации
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const timerBtn = document.getElementById('timer-btn');

// Модальное окно таймера
const timerModal = document.getElementById('timer-modal');
const startTimerBtn = document.getElementById('start-timer');
const closeTimerBtn = document.getElementById('close-timer');
const workInput = document.getElementById('work-time');
const breakInput = document.getElementById('break-time');

// Отображение таймера
const timerDisplay = document.getElementById('timer-display');
const timerLabel = document.getElementById('timer-label');
const timerCount = document.getElementById('timer-count');
const resetTimer = document.getElementById('reset-timer');

let timerInterval;
let currentPhase; // 'work' или 'break'
let workDuration = 0;
let breakDuration = 0;

// ------------------ Плавное переключение страниц ------------------
function showPage2() {
  page2.style.transform = 'translateX(0)';      // Вторая страница появляется
  page1.style.transform = 'translateX(-100%)';  // Первая страница уходит влево
}

function showPage1() {
  page1.style.transform = 'translateX(0)';       // Первая возвращается
  page2.style.transform = 'translateX(100%)';   // Вторая уходит вправо
}

// ------------------ Навигация кнопок ------------------
startBtn.addEventListener('click', showPage2);
backBtn.addEventListener('click', showPage1);

// ------------------ Модальное окно таймера ------------------
timerBtn.addEventListener('click', () => {
  timerModal.classList.remove('hidden');
});

closeTimerBtn.addEventListener('click', () => {
  timerModal.classList.add('hidden');
});

// ------------------ Запуск таймера ------------------
startTimerBtn.addEventListener('click', () => {
  workDuration = parseInt(workInput.value) * 60;   // минуты → секунды
  breakDuration = parseInt(breakInput.value) * 60; 
  timerModal.classList.add('hidden');
  startPhase('work');
});

// ------------------ Функции таймера ------------------
function startPhase(phase) {
  clearInterval(timerInterval);
  currentPhase = phase;
  timerDisplay.classList.remove('hidden');

  if (phase === 'work') {
    timerLabel.textContent = 'Работа';
    runTimer(workDuration);
  } else {
    timerLabel.textContent = 'Отдых';
    runTimer(breakDuration);
  }
}

function runTimer(duration) {
  let remaining = duration;
  timerCount.textContent = formatTime(remaining);

  timerInterval = setInterval(() => {
    remaining--;
    timerCount.textContent = formatTime(remaining);

    if (remaining <= 0) {
      clearInterval(timerInterval);
      if (currentPhase === 'work') {
        startPhase('break');
      } else {
        // Конец цикла: спрашиваем пользователя
        if (confirm('Продолжаем работать?')) {
          startPhase('work');
        } else {
          timerDisplay.classList.add('hidden');
        }
      }
    }
  }, 1000);
}

// ------------------ Кнопка сброса таймера ------------------
resetTimer.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerDisplay.classList.add('hidden');
});

// ------------------ Форматирование времени ------------------
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}
