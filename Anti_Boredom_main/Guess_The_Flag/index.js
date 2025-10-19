const flags = [
  { country: 'Argentina', flag: 'https://flagcdn.com/w320/ar.png' },
  { country: 'Australia', flag: 'https://flagcdn.com/w320/au.png' },
  { country: 'Bangladesh', flag: 'https://flagcdn.com/w320/bd.png' },
  { country: 'Belgium', flag: 'https://flagcdn.com/w320/be.png' },
  { country: 'Brazil', flag: 'https://flagcdn.com/w320/br.png' },
  { country: 'Canada', flag: 'https://flagcdn.com/w320/ca.png' },
  { country: 'China', flag: 'https://flagcdn.com/w320/cn.png' },
  { country: 'Costa Rica', flag: 'https://flagcdn.com/w320/cr.png' },
  { country: 'Denmark', flag: 'https://flagcdn.com/w320/dk.png' },
  { country: 'Egypt', flag: 'https://flagcdn.com/w320/eg.png' },
  { country: 'Finland', flag: 'https://flagcdn.com/w320/fi.png' },
  { country: 'France', flag: 'https://flagcdn.com/w320/fr.png' },
  { country: 'Germany', flag: 'https://flagcdn.com/w320/de.png' },
  { country: 'Greece', flag: 'https://flagcdn.com/w320/gr.png' },
  { country: 'Honduras', flag: 'https://flagcdn.com/w320/hn.png' },
  { country: 'India', flag: 'https://flagcdn.com/w320/in.png' },
  { country: 'Indonesia', flag: 'https://flagcdn.com/w320/id.png' },
  { country: 'Ireland', flag: 'https://flagcdn.com/w320/ie.png' },
  { country: 'Israel', flag: 'https://flagcdn.com/w320/il.png' },
  { country: 'Italy', flag: 'https://flagcdn.com/w320/it.png' },
  { country: 'Japan', flag: 'https://flagcdn.com/w320/jp.png' },
  { country: 'Mexico', flag: 'https://flagcdn.com/w320/mx.png' },
  { country: 'Mongolia', flag: 'https://flagcdn.com/w320/mn.png' },
  { country: 'Nepal', flag: 'https://flagcdn.com/w320/np.png' },
  { country: 'Netherlands', flag: 'https://flagcdn.com/w320/nl.png' },
  { country: 'New Zealand', flag: 'https://flagcdn.com/w320/nz.png' },
  { country: 'Norway', flag: 'https://flagcdn.com/w320/no.png' },
  { country: 'Pakistan', flag: 'https://flagcdn.com/w320/pk.png' },
  { country: 'Palestine', flag: 'https://flagcdn.com/w320/ps.png' },
  { country: 'Paraguay', flag: 'https://flagcdn.com/w320/py.png' },
  { country: 'Peru', flag: 'https://flagcdn.com/w320/pe.png' },
  { country: 'Poland', flag: 'https://flagcdn.com/w320/pl.png' },
  { country: 'Panama', flag: 'https://flagcdn.com/w320/pa.png' },
  { country: 'Portugal', flag: 'https://flagcdn.com/w320/pt.png' },
  { country: 'Russia', flag: 'https://flagcdn.com/w320/ru.png' },
  { country: 'Saudi Arabia', flag: 'https://flagcdn.com/w320/sa.png' },
  { country: 'South Africa', flag: 'https://flagcdn.com/w320/za.png' },
  { country: 'South Korea', flag: 'https://flagcdn.com/w320/kr.png' },
  { country: 'Spain', flag: 'https://flagcdn.com/w320/es.png' },
  { country: 'Sri Lanka', flag: 'https://flagcdn.com/w320/lk.png' },
  { country: 'Sudan', flag: 'https://flagcdn.com/w320/sd.png' },
  { country: 'Sweden', flag: 'https://flagcdn.com/w320/se.png' },
  { country: 'Switzerland', flag: 'https://flagcdn.com/w320/ch.png' },
  { country: 'Thailand', flag: 'https://flagcdn.com/w320/th.png' },
  { country: 'Turkey', flag: 'https://flagcdn.com/w320/tr.png' },
  { country: 'Uganda', flag: 'https://flagcdn.com/w320/ug.png' },
  { country: 'Ukraine', flag: 'https://flagcdn.com/w320/ua.png' },
  { country: 'United Kingdom', flag: 'https://flagcdn.com/w320/gb.png'},
  { country: 'United States', flag: 'https://flagcdn.com/w320/us.png' },
  { country: 'Vietnam', flag: 'https://flagcdn.com/w320/vn.png' }
];

const flagImg = document.getElementById("flag");
const optionsContainer = document.getElementById("options");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

let currentFlag = {};

function getRandomFlags(num) {
  const shuffled = [...flags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function loadNewFlag() {
  result.textContent = "";
  optionsContainer.innerHTML = "";
  const randomSet = getRandomFlags(4);
  currentFlag = randomSet[Math.floor(Math.random() * 4)];

  flagImg.src = currentFlag.flag;

  randomSet.forEach((item) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = item.country;
    btn.addEventListener("click", () => checkAnswer(item.country));
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === currentFlag.country) {
    result.textContent = "✅ Correct!";
    result.style.color = "#00ff90";
  } else {
    result.textContent = `❌ Wrong! It was ${currentFlag.country}`;
    result.style.color = "#ff7070";
  }
}

nextBtn.addEventListener("click", loadNewFlag);

// Load first flag on start
loadNewFlag();
