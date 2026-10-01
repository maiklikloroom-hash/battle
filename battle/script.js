// ---- 1. Суперники — об'єкти ----
const fighters = [
  { id: 1, name: "Лицар Орест",  hp: 100, maxHp: 100 },
  { id: 2, name: "Маг Мирослав", hp: 100, maxHp: 100 }
];

// ---- 2. Допоміжні функції (без дублювання коду) ----
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// колір залежить від частки здоров'я
function barColor(percent) {
  if (percent > 60) return "#2e9e4f";   // зелений
  if (percent > 30) return "#e0a100";   // жовтий
  return "#d03a3a";                      // червоний
}

// одна функція малює будь-якого суперника
function render(f) {
  const percent = Math.round((f.hp / f.maxHp) * 100);
  document.getElementById("name" + f.id).textContent = f.name;
  document.getElementById("label" + f.id).textContent =
    f.hp > 0 ? `Здоровʼя: ${f.hp} / ${f.maxHp} (${percent}%)` : "Переможений";
  const fill = document.getElementById("fill" + f.id);
  fill.style.width = percent + "%";
  fill.style.backgroundColor = barColor(percent);
}

// одна функція завдає шкоди будь-кому
function damage(f, amount) {
  f.hp = Math.max(0, f.hp - amount);
  render(f);
  return amount;
}

function isOver() {
  return fighters.some(f => f.hp === 0);
}

function finishIfNeeded(text) {
  if (isOver()) {
    const winner = fighters.find(f => f.hp > 0);
    text += winner ? ` Переміг: ${winner.name}!` : " Нічия — обидва впали!";
    document.getElementById("fightBtn").disabled = true;
    document.getElementById("strikeBtn").disabled = true;
  }
  document.getElementById("log").textContent = text;
}

// ---- 3. Дії кнопок ----
// Бій: обидва отримують випадкову шкоду 5–20
function fight() {
  const [a, b] = fighters;
  const da = damage(a, rand(5, 20));
  const db = damage(b, rand(5, 20));
  finishIfNeeded(`${a.name} втрачає ${da}, ${b.name} втрачає ${db}.`);
}

// Підступний удар: суперник втрачає 15–30, герой лише 0–5
function strike() {
  const [a, b] = fighters;
  const db = damage(b, rand(15, 30));
  const da = damage(a, rand(0, 5));
  finishIfNeeded(`Підступний удар! ${b.name} втрачає ${db}, ${a.name} — лише ${da}.`);
}

function reset() {
  fighters.forEach(f => { f.hp = f.maxHp; render(f); });
  document.getElementById("fightBtn").disabled = false;
  document.getElementById("strikeBtn").disabled = false;
  document.getElementById("log").textContent = "Натисніть кнопку, щоб почати бій.";
}

document.getElementById("fightBtn").addEventListener("click", fight);
document.getElementById("strikeBtn").addEventListener("click", strike);
document.getElementById("resetBtn").addEventListener("click", reset);

// початкове відображення
fighters.forEach(render);