// =========================================================
// 1. DONNÉES DU JEU (20 mots Airbus Helicopters)
// =========================================================
const GAME_DATA = [
  { word: "SYNDICAT", letters: ["N", "I", "T", "S", "A", "C", "D", "Y"], clue: "Organisation défendant les intérêts professionnels des salariés.", theme: "📣 REPRÉSENTATION" },
  { word: "PRECONISATION", letters: ["O", "I", "T", "A", "S", "I", "N", "O", "C", "E", "R", "P", "N"], clue: "Recommandation de la SSCT pour éclairer l'avis du CSE sur un projet.", theme: "🦺 EXPERTISE" },
  { word: "DIALOGUE", letters: ["L", "I", "E", "U", "G", "O", "D", "A"], clue: "Échange institutionnel entre la direction et les représentants du personnel.", theme: "🤝 BASE DU JEU" },
  { word: "COMPETITIVITE", letters: ["E", "C", "M", "T", "I", "V", "I", "T", "E", "P", "I", "O", "T"], clue: "Finalité économique qui justifie l'évolution des accords sociaux.", theme: "📊 STRATÉGIE" },
  { word: "DELEGUE", letters: ["G", "E", "E", "L", "D", "U", "E"], clue: "Salarié désigné par un syndicat pour négocier : le ___ syndical.", theme: "📣 REPRÉSENTATION" },
  { word: "CONCERTATION", letters: ["O", "N", "C", "R", "C", "E", "A", "I", "T", "O", "T", "N"], clue: "Phase d'échange préalable visant à recueillir des avis.", theme: "🗣️ ÉCHANGE" },
  { word: "REVENDICATION", letters: ["D", "O", "N", "T", "A", "C", "I", "I", "N", "E", "V", "E", "R"], clue: "Demande formulée par les syndicats pour améliorer les conditions de travail.", theme: "✊ ACTION" },
  { word: "CSEC", letters: ["E", "S", "C", "C"], clue: "Comité Social et Économique Central d'Airbus Helicopters.", theme: "🚁 GROUPE AIRBUS" },
  { word: "REPRESENTATIVITE", letters: ["T", "I", "V", "E", "R", "E", "P", "R", "E", "S", "E", "N", "T", "A", "I", "T"], clue: "Seuil d'audience électorale (10%) permettant de signer des accords.", theme: "⚖️ DROIT SOCIAL" },
  { word: "MANDAT", letters: ["T", "N", "M", "A", "A", "D"], clue: "Mission confiée à un représentant pour une durée déterminée.", theme: "🏛️ RÔLE SOCIAL" },
  { word: "INTERSYNDICALE", letters: ["L", "E", "N", "I", "T", "R", "S", "Y", "N", "D", "I", "C", "A", "E"], clue: "Regroupement temporaire de plusieurs syndicats pour une action commune.", theme: "✊ ACTION COLLECTIVE" },
  { word: "VOTE", letters: ["E", "O", "T", "V"], clue: "Action démocratique pour élire les représentants au CSE.", theme: "🗳️ ÉLECTIONS" },
  { word: "PROTOCOLE", letters: ["O", "L", "E", "T", "C", "O", "O", "P", "R"], clue: "Document fixant les règles d'un scrutin ou d'une négociation.", theme: "📋 CADRE" },
  { word: "PARITE", letters: ["T", "R", "P", "E", "I", "A"], clue: "Égalité proportionnelle femmes/hommes lors des élections.", theme: "⚖️ ÉGALITÉ" },
  { word: "INSTANCE", letters: ["N", "C", "A", "S", "T", "E", "I", "N"], clue: "Organe de représentation du personnel (ex: le CSE).", theme: "🏛️ INSTITUTION" },
  { word: "CSSCT", letters: ["C", "T", "S", "C", "S"], clue: "Commission du CSE spécialisée en Santé, Sécurité et Conditions de Travail.", theme: "🦺 SÉCURITÉ" },
  { word: "CONSULTATION", letters: ["O", "O", "I", "T", "A", "T", "L", "U", "S", "N", "C", "N"], clue: "Procédure où le CSE rend un avis motivé sur un projet.", theme: "📢 INSTANCES" },
  { word: "TRACT", letters: ["C", "T", "A", "T", "R"], clue: "Document d'information distribué aux portes du site.", theme: "📰 COMMUNICATION" },
  { word: "NEGOCIATION", letters: ["I", "O", "N", "G", "E", "N", "O", "C", "I", "A", "T"], clue: "Discussion direction/syndicats visant à un compromis.", theme: "🤝 DIALOGUE" },
  { word: "COCONSTRUCTION", letters: ["N", "C", "T", "I", "C", "U", "R", "N", "O", "S", "O", "C", "O", "T"], clue: "Bâtir un projet conjointement direction et syndicats.", theme: "📈 MÉTHODE" }
];

// =========================================================
// 2. ÉTAT DU JEU
// =========================================================
let currentClueIndex = 0;
let proposedLetters = [];
let score = 0;
let foundCount = 0;
let lives = 3;
let startTime;

// =========================================================
// 3. INITIALISATION ET CHARGEMENT
// =========================================================
function initGame() {
  generateBackgroundStars();
  loadWord();
}

function loadWord() {
  if (currentClueIndex >= GAME_DATA.length) {
    setTimeout(showEndgameModal, 500);
    return;
  }

  const currentData = GAME_DATA[currentClueIndex];
  proposedLetters = new Array(currentData.word.length).fill(null);

  document.querySelector('.clue-number').textContent = currentClueIndex + 1;
  document.querySelector('.clue-text').textContent = currentData.clue;
  document.querySelector('.category-select').textContent = currentData.theme;

  renderSlots(currentData.word.length);
  renderLetterTiles(currentData.letters);

  startTime = Date.now(); // Lancement du chrono
}

function renderSlots(numberOfSlots) {
  const slotsContainer = document.querySelector('.answer-slots');
  slotsContainer.innerHTML = '';
  for (let i = 0; i < numberOfSlots; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.id = `slot-${i}`;
    slotsContainer.appendChild(slot);
  }
}

function renderLetterTiles(lettersArray) {
  const tilesArea = document.getElementById('tiles-area');
  tilesArea.innerHTML = '';
  lettersArray.forEach((letter, index) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.textContent = letter;
    tile.dataset.letter = letter;
    tile.dataset.tileId = index;
    tile.onclick = () => addLetterToProposedWord(index, letter);
    tilesArea.appendChild(tile);
  });
}

function showGameMessage(text) {
  const msg = document.createElement('div');
  msg.textContent = text;
  Object.assign(msg.style, {
    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(10, 14, 26, 0.95)', color: 'var(--cyan)', padding: '30px 50px',
    borderRadius: '15px', border: '2px solid var(--red)', boxShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
    zIndex: '3000', fontSize: '1.4rem', textAlign: 'center', fontWeight: '800',
    fontFamily: "'Barlow Condensed', sans-serif", transition: 'opacity 0.5s ease, transform 0.5s ease', opacity: '0'
  });
  document.body.appendChild(msg);
  setTimeout(() => { msg.style.opacity = '1'; msg.style.transform = 'translate(-50%, -55%)'; }, 10);
  setTimeout(() => {
    msg.style.opacity = '0';
    msg.style.transform = 'translate(-50%, -60%)';
    setTimeout(() => msg.remove(), 500);
  }, 2000);
}

// =========================================================
// 4. LOGIQUE DE JEU
// =========================================================
function addLetterToProposedWord(tileId, letter) {
  const tile = document.querySelector(`.tile[data-tile-id="${tileId}"]`);
  if (!tile || tile.classList.contains('used')) return;
  const emptySlotIndex = proposedLetters.indexOf(null);
  if (emptySlotIndex !== -1) {
    proposedLetters[emptySlotIndex] = { letter, tileId };
    const slot = document.getElementById(`slot-${emptySlotIndex}`);
    slot.textContent = letter;
    slot.classList.add('filled');
    slot.onclick = () => removeLetterFromProposedWord(emptySlotIndex);
    tile.classList.add('used');
  }
}

function removeLetterFromProposedWord(slotIndex) {
  if (proposedLetters[slotIndex] === null) return;
  const { tileId } = proposedLetters[slotIndex];
  const tile = document.querySelector(`.tile[data-tile-id="${tileId}"]`);
  if (tile) tile.classList.remove('used');
  proposedLetters[slotIndex] = null;
  const slot = document.getElementById(`slot-${slotIndex}`);
  slot.textContent = '';
  slot.classList.remove('filled', 'correct');
  slot.onclick = null;
}

function validateProposedWord() {
  if (proposedLetters.includes(null)) return;
  const proposedString = proposedLetters.map(p => p.letter).join('');
  const currentData = GAME_DATA[currentClueIndex];
  const slots = document.querySelectorAll('.slot');

  if (proposedString === currentData.word) {
    slots.forEach(slot => slot.classList.add('correct'));
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    let speedBonus = Math.max(0, 30 - timeSpent); 
    score += (100 + speedBonus);
    foundCount++;
    updateStatsUI();
    addFoundWordToUI(currentData.word);
    setTimeout(() => { currentClueIndex++; loadWord(); }, 1200);
  } else {
    slots.forEach(slot => {
      slot.style.borderColor = 'var(--red)';
      slot.style.backgroundColor = 'rgba(239,68,68,0.1)';
    });
    lives = Math.max(0, lives - 1);
    updateStatsUI();
    if (lives === 0) {
      showGameMessage(`DOMMAGE ! Le mot était : ${currentData.word}`);
      setTimeout(() => { lives = 3; currentClueIndex++; loadWord(); updateStatsUI(); }, 2500);
    } else {
      setTimeout(() => {
        slots.forEach(slot => {
          slot.style.borderColor = slot.classList.contains('filled') ? 'var(--cyan)' : 'rgba(6,182,212,0.3)';
          slot.style.backgroundColor = slot.classList.contains('filled') ? 'rgba(6,182,212,0.1)' : 'rgba(255,255,255,0.03)';
        });
      }, 800);
    }
  }
}

function giveHint() {
  if (lives <= 0) return;
  const currentData = GAME_DATA[currentClueIndex];
  const correctWord = currentData.word;
  let hintGiven = false;

  for (let i = 0; i < correctWord.length; i++) {
    if (!proposedLetters[i] || proposedLetters[i].letter !== correctWord[i]) {
      if (proposedLetters[i]) removeLetterFromProposedWord(i);
      const targetLetter = correctWord[i];
      const availableTiles = document.querySelectorAll('.tile:not(.used)');
      let tileToUse = Array.from(availableTiles).find(t => t.dataset.letter === targetLetter);

      if (tileToUse) {
        addLetterToProposedWord(parseInt(tileToUse.dataset.tileId), targetLetter);
        hintGiven = true;
        break;
      }
    }
  }

  if (hintGiven) {
    lives--;
    score = Math.max(0, score - 10);
    updateStatsUI();
    if (lives === 0) {
      showGameMessage(`DOMMAGE ! Le mot était : ${currentData.word}`);
      setTimeout(() => { lives = 3; currentClueIndex++; loadWord(); updateStatsUI(); }, 2500);
    }
  }
}

// =========================================================
// 5. INTERFACE ET CLASSEMENT
// =========================================================
function updateStatsUI() {
  document.getElementById('score-value').textContent = score;
  document.getElementById('found-value').innerHTML = `${foundCount}<span>/20</span>`;
  const heartsArray = ['', '❤️', '❤️❤️', '❤️❤️❤️'];
  document.querySelector('.lives').textContent = heartsArray[lives] || '💀';
}

function addFoundWordToUI(word) {
  const section = document.querySelector('.found-words-section');
  const wordBadge = document.createElement('span');
  wordBadge.style = "display:inline-block; background:rgba(16,185,129,0.1); border:1px solid var(--green); color:var(--green); padding:4px 10px; border-radius:6px; margin:8px 8px 0 0; font-weight:bold;";
  wordBadge.textContent = word;
  section.appendChild(wordBadge);
}

function showEndgameModal() {
  document.getElementById('final-score-display').textContent = score;
  document.getElementById('endgame-modal').classList.remove('hidden');
  document.getElementById('name-input-section').classList.remove('hidden');
  document.getElementById('leaderboard-section').classList.add('hidden');
}

function saveScore() {
  const nameInput = document.getElementById('player-name').value.trim();
  if (!nameInput) { showGameMessage("MERCI D'ENTRER UN PSEUDO !"); return; }
  let leaderboard = JSON.parse(localStorage.getItem('airbus_leaderboard')) || [];
  leaderboard.push({ name: nameInput, score: score, date: new Date().toLocaleDateString() });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem('airbus_leaderboard', JSON.stringify(leaderboard));
  showLeaderboard(leaderboard);
}

function showLeaderboard(leaderboard = null) {
  if (!leaderboard) leaderboard = JSON.parse(localStorage.getItem('airbus_leaderboard')) || [];
  document.getElementById('name-input-section').classList.add('hidden');
  document.getElementById('leaderboard-section').classList.remove('hidden');
  document.getElementById('endgame-title').textContent = "🏆 LEADERBOARD";
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '';
  leaderboard.forEach((entry, index) => {
    const li = document.createElement('li');
    let rank = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
    li.innerHTML = `<span>${rank} ${entry.name}</span> <span>${entry.score} pts</span>`;
    list.appendChild(li);
  });
  if (!document.getElementById('airbus-quote')) {
    const quote = document.createElement('p');
    quote.id = 'airbus-quote';
    quote.style = "font-style:italic; font-size:0.85rem; margin-top:20px; color:var(--cyan); text-align:center;";
    quote.innerHTML = "« Chez Airbus, la précision est vitale, <br>mais la réactivité fait la différence ! »";
    document.getElementById('leaderboard-section').insertBefore(quote, document.querySelector('.btn-clear'));
  }
}

function startNewGame() {
  currentClueIndex = 0; score = 0; foundCount = 0; lives = 3; proposedLetters = [];
  document.querySelector('.found-words-section').innerHTML = 'Mots trouvés';
  document.getElementById('endgame-modal').classList.add('hidden');
  updateStatsUI(); loadWord();
}

function clearLeaderboard() {
  if(confirm("Effacer tous les scores ?")) { localStorage.removeItem('airbus_leaderboard'); showLeaderboard([]); }
}

function toggleFullScreen() {
  document.activeElement.blur();
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => console.log(err));
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

function clearCurrentProposedWord() {
  proposedLetters.forEach((_, i) => removeLetterFromProposedWord(i));
}

function generateBackgroundStars() {
  const starContainer = document.querySelector('.stars');
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 1;
    star.style.width = star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    starContainer.appendChild(star);
  }
}

// =========================================================
// 8. GESTION DU CLAVIER
// =========================================================
window.addEventListener('keydown', (e) => {
  if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
    const typedLetter = e.key.toUpperCase();
    const availableTiles = document.querySelectorAll('.tile:not(.used)');
    let tileToUse = Array.from(availableTiles).find(t => t.dataset.letter === typedLetter);
    if (tileToUse) addLetterToProposedWord(parseInt(tileToUse.dataset.tileId), typedLetter);
  }
  if (e.key === 'Backspace') {
    let lastFilledIndex = -1;
    for (let i = 0; i < proposedLetters.length; i++) if (proposedLetters[i] !== null) lastFilledIndex = i;
    if (lastFilledIndex !== -1) removeLetterFromProposedWord(lastFilledIndex);
  }
  if (e.key === 'Enter') { e.preventDefault(); validateProposedWord(); }
  if (e.key === 'Escape') clearCurrentProposedWord();
});

// Lancement final
initGame();