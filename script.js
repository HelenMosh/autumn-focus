// script.js

// Элементы страниц
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

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
  page2.classList.remove('hidden');
  page1.style.transform = 'translateX(-100%)'; // первая страница уходит влево
  page2.style.transform = 'translateX(0)';     // вторая появляется
  setTimeout(() => page1.classList.add('hidden'), 700);
}

function showPage1() {
  page1.classList.remove('hidden');
  page1.style.transform = 'translateX(0)';      // первая страница возвращается
  page2.style.transform = 'translateX(100%)';   // вторая уходит вправо
  setTimeout(() => page2.classList.add('hidden'), 700);
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
    updateTimer(workDuration);
  } else {
    timerLabel.textContent = 'Отдых';
    updateTimer(breakDuration);
  }
}

function updateTimer(duration) {
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
        // Конец цикла: спросить пользователя
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
