// Sample hero data (small set). You can expand this.
const MARVEL = [
  { id: "ironman", name: "Iron Man", img: "./images/ironman.jpg", stats: { strength: 75, speed: 74, intelligence: 95, power: 85, durability: 70, combat: 80 } },
  { id: "hulk", name: "Hulk", img: "./images/hulk.jpg", stats: { strength: 98, speed: 63, intelligence: 70, power: 98, durability: 95, combat: 72 } },
  { id: "spiderman", name: "Spiderman", img: "./images/spiderman.jpg", stats: { strength: 76, speed: 81, intelligence: 85, power: 70, durability: 75, combat: 78 } }
];

const DC = [
  { id: "batman", name: "Batman", img: "./images/Batman.jpg", stats: { strength: 70, speed: 70, intelligence: 95, power: 65, durability: 70, combat: 95 } },
  { id: "superman", name: "Superman",img: "./images/superman.jpg", stats: { strength: 100, speed: 100, intelligence: 85, power: 100, durability: 100, combat: 90 } },
  { id: "flash", name: "Flash",img: "./images/flash.jpg", stats: { strength: 60, speed: 100, intelligence: 80, power: 75, durability: 60, combat: 70 } }
];

function $(s){ return document.querySelector(s); }
function $all(s){ return document.querySelectorAll(s); }

// DOM refs
const marvelSelect = $('#marvelSelect');
const dcSelect = $('#dcSelect');
const battleBtn = $('#battleBtn');
const resetBtn = $('#resetBtn');
const result = $('#result');

// Fill selects
function populateSelects() {
  MARVEL.forEach(h => {
    const o = document.createElement('option');
    o.value = h.id; o.textContent = h.name;
    marvelSelect.appendChild(o);
  });
  DC.forEach(h => {
    const o = document.createElement('option');
    o.value = h.id; o.textContent = h.name;
    dcSelect.appendChild(o);
  });
}

// Show hero details
function showHero(side, hero) {
  const prefix = side === 'marvel' ? 'm' : 'd';
  const nameEl = side === 'marvel' ? $('#marvelName') : $('#dcName');
  const infoEl = side === 'marvel' ? $('#marvelInfo') : $('#dcInfo');
  const imgEl = side === 'marvel' ? $('#marvelImg') : $('#dcImg');

  nameEl.textContent = hero.name;
  infoEl.textContent = `Stats: Strength ${hero.stats.strength}, Speed ${hero.stats.speed}, Power ${hero.stats.power}`;
  imgEl.innerHTML = `<img src="${hero.img}" alt="${hero.name}" class="w-20 h-20 object-cover rounded-lg shadow-md">`;


  // Update progress widths (immediate 0 then animate)
  $(`#${prefix}-strength`).style.width = '0%';
  $(`#${prefix}-speed`).style.width = '0%';
  $(`#${prefix}-intel`).style.width = '0%';
  $(`#${prefix}-power`).style.width = '0%';
  $(`#${prefix}-dur`).style.width = '0%';
  $(`#${prefix}-combat`).style.width = '0%';

  // slight timeout to let transition run
  setTimeout(()=> {
    $(`#${prefix}-strength`).style.width = hero.stats.strength + '%';
    $(`#${prefix}-speed`).style.width = hero.stats.speed + '%';
    $(`#${prefix}-intel`).style.width = hero.stats.intelligence + '%';
    $(`#${prefix}-power`).style.width = hero.stats.power + '%';
    $(`#${prefix}-dur`).style.width = hero.stats.durability + '%';
    $(`#${prefix}-combat`).style.width = hero.stats.combat + '%';
  }, 40);
}

function findHero(list, id) {
  return list.find(h => h.id === id);
}

// Battle logic
function battle() {
  const leftId = marvelSelect.value;
  const rightId = dcSelect.value;
  if (!leftId || !rightId) {
    result.textContent = 'Select both heroes to start battle';
    return;
  }
  const left = findHero(MARVEL, leftId);
  const right = findHero(DC, rightId);

  // animate stats to final values (they already run in showHero)
  showHero('marvel', left);
  showHero('dc', right);

  // compute score by comparing each stat
  const stats = ['strength','speed','intelligence','power','durability','combat'];
  let leftScore = 0, rightScore = 0;
  stats.forEach(s => {
    const l = left.stats[s] || 0;
    const r = right.stats[s] || 0;
    if (l > r) leftScore++;
    else if (r > l) rightScore++;
  });

  // small delay so animation plays
  setTimeout(()=> {
    if (leftScore > rightScore) {
      result.textContent = `${left.name} (Marvel) Wins!`;
      winnerAnimation('left');
    } else if (rightScore > leftScore) {
      result.textContent = `${right.name} (DC) Wins!`;
      winnerAnimation('right');
    } else {
      result.textContent = `It's a Tie!`;
      winnerAnimation('tie');
    }
  }, 900);
}

function winnerAnimation(side) {

  $('#marvelCard').classList.remove('winner');
  $('#dcCard').classList.remove('winner');
  if (side === 'left') {
    $('#marvelCard').classList.add('winner');
    $('#dcCard').classList.remove('winner');
  } else if (side === 'right') {
    $('#dcCard').classList.add('winner');
    $('#marvelCard').classList.remove('winner');
  } else {
  
    $('#marvelCard').classList.add('winner');
    $('#dcCard').classList.add('winner');
  }
}

// reset
function resetAll() {
  marvelSelect.selectedIndex = 0;
  dcSelect.selectedIndex = 0;
  $('#marvelName').textContent = 'Select a hero';
  $('#dcName').textContent = 'Select a hero';
  $all('.progress-fill').forEach(el => el.style.width = '0%');
  result.textContent = '';
  $('#marvelImg').textContent = '';
  $('#dcImg').textContent = '';
  $('#marvelInfo').textContent = 'Stats: —';
  $('#dcInfo').textContent = 'Stats: —';
  $('#marvelCard').classList.remove('winner');
  $('#dcCard').classList.remove('winner');
}


populateSelects();
marvelSelect.addEventListener('change', ()=> {
  const h = findHero(MARVEL, marvelSelect.value);
  if (h) showHero('marvel', h);
});
dcSelect.addEventListener('change', ()=> {
  const h = findHero(DC, dcSelect.value);
  if (h) showHero('dc', h);
});
battleBtn.addEventListener('click', battle);
resetBtn.addEventListener('click', resetAll);
