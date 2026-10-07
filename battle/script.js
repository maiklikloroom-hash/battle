// Випадкове число
const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;


// Колір смужки здоров'я
function barColor(percent) {
  if (percent > 60) return "#2e9e4f";
  if (percent > 30) return "#e0a100";
  return "#d03a3a";
}


// Одна функція для обох об'єктів
function render() {
  const percent = Math.round((this.hp / this.maxHp) * 100);

  document.getElementById("name" + this.id).textContent = this.name;

  document.getElementById("label" + this.id).textContent =
    this.hp > 0
      ? `Здоровʼя: ${this.hp} / ${this.maxHp} (${percent}%)`
      : "Переможений";

  const fill = document.getElementById("fill" + this.id);

  fill.style.width = percent + "%";
  fill.style.backgroundColor = barColor(percent);
}


// Одна функція завдає шкоди обом об'єктам
function damage(amount) {
  this.hp = Math.max(0, this.hp - amount);

  this.render();

  return amount;
}


// Об'єкт character
const character = {
  id: 1,
  name: "Лицар Орест",
  hp: 100,
  maxHp: 100,

  render: render,
  damage: damage
};


// Об'єкт enemy
const enemy = {
  id: 2,
  name: "Маг Мирослав",
  hp: 100,
  maxHp: 100,

  render: render,
  damage: damage
};


// Перевірка закінчення бою
function isOver() {
  return character.hp === 0 || enemy.hp === 0;
}


// Виведення переможця
function finishIfNeeded(text) {
  if (isOver()) {
    let winner;

    if (character.hp > 0) {
      winner = character;
    } else if (enemy.hp > 0) {
      winner = enemy;
    }

    text += winner
      ? ` Переміг: ${winner.name}!`
      : " Нічия — обидва впали!";

    document.getElementById("fightBtn").disabled = true;
    document.getElementById("strikeBtn").disabled = true;
  }

  document.getElementById("log").textContent = text;
}


// Звичайний бій
function fight() {
  const da = character.damage(rand(5, 20));
  const db = enemy.damage(rand(5, 20));

  finishIfNeeded(
    `${character.name} втрачає ${da}, ${enemy.name} втрачає ${db}.`
  );
}


// Підступний удар
function strike() {
  const db = enemy.damage(rand(15, 30));
  const da = character.damage(rand(0, 5));

  finishIfNeeded(
    `Підступний удар! ${enemy.name} втрачає ${db}, ${character.name} — лише ${da}.`
  );
}


// Почати заново
function reset() {
  character.hp = character.maxHp;
  enemy.hp = enemy.maxHp;

  character.render();
  enemy.render();

  document.getElementById("fightBtn").disabled = false;
  document.getElementById("strikeBtn").disabled = false;

  document.getElementById("log").textContent =
    "Натисніть кнопку, щоб почати бій.";
}


// Кнопки
document.getElementById("fightBtn").addEventListener("click", fight);
document.getElementById("strikeBtn").addEventListener("click", strike);
document.getElementById("resetBtn").addEventListener("click", reset);


// Початкове відображення
character.render();
enemy.render();