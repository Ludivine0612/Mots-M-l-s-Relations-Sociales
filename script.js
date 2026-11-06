// =========================================================
// 1. DONNÉES DU JEU (Les 20 mots d'Airbus Helicopters)
// =========================================================
const GAME_DATA = [
  { word: "SYNDICAT", letters: ["N", "I", "T", "S", "A", "C", "D", "Y"], clue: "Organisation (comme la CFE-CGC, FO, CFDT, CGT) défendant les intérêts professionnels des salariés.", theme: "📣 REPRÉSENTATION" },
  { word: "INTERSYNDICALE", letters: ["L", "E", "N", "I", "T", "R", "S", "Y", "N", "D", "I", "C", "A", "E"], clue: "Regroupement temporaire de plusieurs organisations pour mener une action ou une négociation commune.", theme: "✊ ACTION COLLECTIVE" }, 
  { word: "NEGOCIATION", letters: ["I", "O", "N", "G", "E", "N", "O", "C", "I", "A", "T"], clue: "Processus de discussion entre direction et syndicats visant à un compromis mutuellement acceptable.", theme: "🤝 DIALOGUE" },  
  { word: "DIALOGUE", letters: ["L", "I", "E", "U", "G", "O", "D", "A"], clue: "Échange institutionnel entre la direction et les représentants du personnel : le ___ social.", theme: "🤝 BASE DU JEU" },
  { word: "COMPETITIVITE", letters: ["E", "C", "M", "T", "I", "V", "I", "T", "E", "P", "I", "O", "T"], clue: "Finalité économique qui justifie souvent la nécessité de faire évoluer nos accords sociaux.", theme: "📊 STRATÉGIE" },
  { word: "DELEGUE", letters: ["G", "E", "E", "L", "D", "U", "E"], clue: "Salarié désigné par un syndicat représentatif pour négocier avec l'employeur : le ___ syndical (DS).", theme: "📣 REPRÉSENTATION" },
  { word: "CONCERTATION", letters: ["O", "N", "C", "R", "C", "E", "A", "I", "T", "O", "T", "N"], clue: "Phase d'échange préalable visant à recueillir des avis avant de lancer une négociation ou un projet.", theme: "🗣️ ÉCHANGE" }, 
  { word: "REVENDICATION", letters: ["N", "O", "I", "T", "A", "C", "I", "D", "N", "E", "V", "E", "R"], clue: "Demande formulée par les organisations syndicales pour améliorer les conditions de travail.", theme: "✊ ACTION" },  
  { word: "CSEC", letters: ["E", "S", "C", "C"], clue: "Comité Social et Économique Central, regroupant les élus de tous les sites d'AH (Marignane, Paris, Dugny...).", theme: "🚁 GROUPE AIRBUS" },
  { word: "REPRESENTATIVITE", letters: ["T", "I", "V", "E", "R", "E", "P", "R", "E", "S", "E", "N", "T", "A", "I", "T"], clue: "Seuil d'audience électorale (10% en entreprise) permettant à un syndicat de signer des accords.", theme: "⚖️ DROIT SOCIAL" },
  { word: "MANDAT", letters: ["T", "N", "M", "A", "A", "D"], clue: "Mission confiée à un représentant du personnel (élu ou désigné) pour une durée déterminée.", theme: "🏛️ RÔLE SOCIAL" },
  { word: "VOTE", letters: ["E", "O", "T", "V"], clue: "Action démocratique permettant aux salariés d'élire leurs représentants au CSE tous les 4 ans.", theme: "🗳️ ÉLECTIONS" },
  { word: "PROTOCOLE", letters: ["O", "L", "E", "T", "C", "O", "O", "P", "R"], clue: "Document fixant les règles d'un scrutin (PAP) ou les étapes d'une négociation complexe.", theme: "📋 CADRE" }, 
  { word: "PARITE", letters: ["T", "R", "P", "E", "I", "A"], clue: "Principe visant l'égalité proportionnelle de représentation entre femmes et hommes lors des élections.", theme: "⚖️ ÉGALITÉ" },
  { word: "INSTANCE", letters: ["N", "C", "A", "S", "T", "E", "I", "N"], clue: "Terme générique officiel désignant un organe de représentation du personnel (le CSE en est une).", theme: "🏛️ INSTITUTION" },
  { word: "SSCT", letters: ["T", "S", "C", "S"], clue: "Commission du CSE spécialisée sur les sujets vitaux de Santé, Sécurité et Conditions de Travail.", theme: "🦺 SÉCURITÉ" },
  { word: "CONSULTATION", letters: ["O", "O", "I", "T", "A", "T", "L", "U", "S", "N", "C", "N"], clue: "Procédure légale par laquelle le CSE rend un avis motivé sur un projet de la direction.", theme: "📢 INSTANCES" },
  { word: "TRACT", letters: ["C", "T", "A", "T", "R"], clue: "Document d'information distribué par les organisations syndicales, souvent aux ronds-points ou portes du site.", theme: "📰 COMMUNICATION" },
  { word: "ACCORD", letters: ["D", "R", "O", "C", "C", "A"], clue: "Résultat formel et signé d'une négociation concluante entre la direction et les partenaires sociaux.", theme: "🤝 DIALOGUE" }, 
  { word: "COCONSTRUCTION", letters: ["N", "C", "T", "I", "C", "U", "R", "N", "O", "S", "O", "C", "O", "T"], clue: "Démarche partenariale visant à bâtir un projet conjointement entre direction et syndicats.", theme: "📈 MÉTHODE" }
];

// 36 scores par défaut
const INITIAL_LEADERBOARD = [
  { name: "Elodie La Boss", score: 2464 },
  { name: "Fabulous Fab", score: 2421 },
  { name: "Cyrielle P.", score: 2412 },
  { name: "Carliitooo", score: 2411 },
  { name: "Sébastien M", score: 2391 },
  { name: "Anne-Laure", score: 2340 },
  { name: "Sacha", score: 2338 },
  { name: "Nelya", score: 2334 },
  { name: "Virginie L.", score: 2331 },
  { name: "Géraldine", score: 2326 },
  { name: "sandrine", score: 2323 },
  { name: "Emma", score: 2321 },
  { name: "Clara", score: 2316 },
  { name: "sarah levy", score: 2313 },
  { name: "Safia", score: 2311 },
  { name: "Arnaud P", score: 2300 },
  { name: "Anne R", score: 2290 },
  { name: "frederique", score: 2287 },
  { name: "Mathys", score: 2259 },
  { name: "MLaure", score: 2254 },
  { name: "Soumia", score: 2249 },
  { name: "lydie", score: 2239 },
  { name: "sophie", score: 2234 },
  { name: "Nisrine", score: 2225 },
  { name: "marie", score: 2213 },
  { name: "Ghislain", score: 2208 },
  { name: "Valerie", score: 2200 },
  { name: "Alyssia", score: 2190 },
  { name: "dorine", score: 2185 },
  { name: "Clémence", score: 2184 },
  { name: "Julie", score: 2169 },
  { name: "Lisa", score: 2167 },
  { name: "Matteo", score: 2038 },
  { name: "Ronchon", score: 2034 },
  { name: "celine", score: 2003 },
  { name: "Hicham", score: 1896 }
];

// =========================================================
// 2. ÉTAT DU JEU
// =========================================================
let currentClueIndex = 0;
let proposedLetters = [];
let score = 0;
let foundCount = 0;
let lives = 3;
let isGameActive = false;
let wordStartTime = 0;
// =========================================================
// 3. NAVIGATION DES ÉCRANS
// =========================================================
function showScreen(screenId) {
  document.getElementById('home-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('leaderboard-screen').classList.add('hidden');
  document.getElementById('endgame-modal').classList.add('hidden');

  const target = document.getElementById(screenId);
  if (target) target.classList.remove('hidden');

  // Gestion de la visibilité du bouton home
  const homeBtn = document.getElementById('home-nav-btn');
  if (screenId === 'game-screen') {
    homeBtn.classList.remove('hidden');
  } else {
    homeBtn.classList.add('hidden');
  }
}

function goToHome() {
  isGameActive = false;
  showScreen('home-screen');
}

function openLeaderboardScreen() {
  isGameActive = false;
  renderLeaderboardList('main-leaderboard-list');
  showScreen('leaderboard-screen');
}

// =========================================================
// 4. INITIALISATION ET CHARGEMENT DU JEU
// =========================================================
function initGame() {
  generateBackgroundStars();
}

function startNewGame() {
  currentClueIndex = 0;
  score = 0;
  foundCount = 0;
  lives = 3;
  proposedLetters = [];
  isGameActive = true;

  document.querySelector('.found-words-section').innerHTML = 'Mots trouvés';
  updateStatsUI();
  showScreen('game-screen');
  loadWord();
}

function loadWord() {
  if (currentClueIndex >= GAME_DATA.length) {
    setTimeout(() => {
      showEndgameModal();
    }, 500);
    return;
  }

  const currentData = GAME_DATA[currentClueIndex];
  proposedLetters = new Array(currentData.word.length).fill(null);

  document.querySelector('#game-screen .clue-number').textContent = currentClueIndex + 1;
  document.querySelector('#game-screen .clue-text').textContent = currentData.clue;
  document.querySelector('#game-screen .category-select').textContent = currentData.theme;

  renderSlots(currentData.word.length);
  renderLetterTiles(currentData.letters);
  
  // Lancement du chrono de 30 secondes pour le bonus
  wordStartTime = Date.now(); 
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

function generateBackgroundStars() {
  const starContainer = document.querySelector('.stars');
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    starContainer.appendChild(star);
  }
}

// =========================================================
// 5. ACTIONS DE JEU
// =========================================================
function addLetterToProposedWord(tileId, letter) {
  if (!isGameActive) return;
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

function clearCurrentProposedWord() {
  proposedLetters.forEach((_, index) => {
    removeLetterFromProposedWord(index);
  });
}

function validateProposedWord() {
  if (!isGameActive || proposedLetters.includes(null)) return;

  const proposedString = proposedLetters.map(p => p.letter).join('');
  const currentData = GAME_DATA[currentClueIndex];
  const slots = document.querySelectorAll('.slot');

  if (proposedString === currentData.word) {
    slots.forEach(slot => slot.classList.add('correct'));
    
    // Calcul du temps écoulé en secondes
    const timeTaken = Math.floor((Date.now() - wordStartTime) / 1000);
    // Bonus : 30 secondes max, 1 point par seconde économisée
    const timeBonus = Math.max(0, 30 - timeTaken);
    
    score += (100 + timeBonus); // 100 pts de succès + bonus
    
    foundCount += 1;
    updateStatsUI();
    addFoundWordToUI(currentData.word);

    setTimeout(() => {
      currentClueIndex++;
      loadWord();
    }, 1200); 

  } else {
    slots.forEach(slot => {
      slot.style.borderColor = 'var(--red)';
      slot.style.backgroundColor = 'rgba(239,68,68,0.1)';
    });
    
    lives = Math.max(0, lives - 1);
    updateStatsUI();

    setTimeout(() => {
      slots.forEach(slot => {
        if (!slot.classList.contains('filled')) {
          slot.style.borderColor = 'rgba(6,182,212,0.3)';
          slot.style.backgroundColor = 'rgba(255,255,255,0.03)';
        } else {
          slot.style.borderColor = 'var(--cyan)';
          slot.style.backgroundColor = 'rgba(6,182,212,0.1)';
        }
      });
      
      if (lives === 0) {
        alert(`Oups, plus d'essais ! Le mot était : ${currentData.word}`);
        lives = 3;
        currentClueIndex++;
        loadWord();
        updateStatsUI();
      }
    }, 800);
  }
}

function updateStatsUI() {
  document.getElementById('score-value').textContent = score;
  document.getElementById('found-value').innerHTML = `${foundCount}<span>/20</span>`;
  const heartsArray = ['', '❤️', '❤️❤️', '❤️❤️❤️'];
  document.querySelector('.lives').textContent = heartsArray[lives] || '💀';
}

function addFoundWordToUI(word) {
  const section = document.querySelector('.found-words-section');
  const wordBadge = document.createElement('span');
  wordBadge.style.display = "inline-block";
  wordBadge.style.backgroundColor = "rgba(16,185,129,0.1)";
  wordBadge.style.border = "1px solid var(--green)";
  wordBadge.style.color = "var(--green)";
  wordBadge.style.padding = "4px 10px";
  wordBadge.style.borderRadius = "6px";
  wordBadge.style.margin = "8px 8px 0 0";
  wordBadge.style.fontWeight = "bold";
  wordBadge.textContent = word;
  section.appendChild(wordBadge);
}

function giveHint() {
  if (!isGameActive || lives <= 0) return; 

  const currentData = GAME_DATA[currentClueIndex];
  const correctWord = currentData.word;
  let hintGiven = false;

  for (let i = 0; i < correctWord.length; i++) {
    if (!proposedLetters[i] || proposedLetters[i].letter !== correctWord[i]) {
      if (proposedLetters[i]) {
        removeLetterFromProposedWord(i);
      }
      
      const targetLetter = correctWord[i];
      const availableTiles = document.querySelectorAll('.tile:not(.used)');
      
      let tileToUse = null;
      for (let tile of availableTiles) {
        if (tile.dataset.letter === targetLetter) {
          tileToUse = tile;
          break;
        }
      }

      if (tileToUse) {
        const tileId = parseInt(tileToUse.dataset.tileId);
        addLetterToProposedWord(tileId, targetLetter);
        hintGiven = true;
        break;
      }
    }
  }

  if (hintGiven) {
    lives -= 1;
    score = Math.max(0, score - 10);
    updateStatsUI();

    if (lives === 0) {
      setTimeout(() => {
        const slots = document.querySelectorAll('.slot');
        slots.forEach(slot => {
          slot.style.borderColor = 'var(--red)';
          slot.style.backgroundColor = 'rgba(239,68,68,0.1)';
        });

        setTimeout(() => {
          alert(`Oups, plus d'essais ! Le mot était : ${currentData.word}`);
          lives = 3;
          currentClueIndex++;
          loadWord();
          updateStatsUI();
        }, 600);
      }, 300);
    }
  }
}

// =========================================================
// 6. GESTION DU LEADERBOARD
// =========================================================
function getLeaderboardData() {
  const stored = localStorage.getItem('airbus_leaderboard');
  if (!stored) {
    localStorage.setItem('airbus_leaderboard', JSON.stringify(INITIAL_LEADERBOARD));
    return [...INITIAL_LEADERBOARD];
  }
  return JSON.parse(stored);
}

function renderLeaderboardList(elementId) {
  const leaderboard = getLeaderboardData();
  const list = document.getElementById(elementId);
  if (!list) return;

  list.innerHTML = '';
  leaderboard.forEach((entry, index) => {
    const li = document.createElement('li');
    const rankPrefix = index === 0 ? '🥇 ' : index === 1 ? '🥈 ' : index === 2 ? '🥉 ' : `${index + 1}. `;

    li.innerHTML = `
      <span class="leaderboard-player">${rankPrefix}${entry.name}</span>
      <span class="leaderboard-score">${entry.score} pts</span>
    `;
    list.appendChild(li);
  });
}

function showEndgameModal() {
  isGameActive = false;
  document.getElementById('final-score-display').textContent = score;
  document.getElementById('endgame-modal').classList.remove('hidden');
  document.getElementById('name-input-section').classList.remove('hidden');
  document.getElementById('leaderboard-section').classList.add('hidden');
  document.getElementById('endgame-title').textContent = "🎉 Terminé !";
  document.getElementById('player-name').value = "";
}

function saveScore() {
  const nameInput = document.getElementById('player-name').value.trim();
  if (!nameInput) {
    alert("Merci d'entrer un pseudo !");
    return;
  }

  let leaderboard = getLeaderboardData();
  leaderboard.push({ name: nameInput, score: score });
  leaderboard.sort((a, b) => b.score - a.score);

  localStorage.setItem('airbus_leaderboard', JSON.stringify(leaderboard));
  
  document.getElementById('name-input-section').classList.add('hidden');
  document.getElementById('leaderboard-section').classList.remove('hidden');
  renderLeaderboardList('modal-leaderboard-list');
}

function clearLeaderboard() {
  if (confirm("Voulez-vous réinitialiser le classement aux scores d'origine ?")) {
    localStorage.setItem('airbus_leaderboard', JSON.stringify(INITIAL_LEADERBOARD));
    renderLeaderboardList('modal-leaderboard-list');
    renderLeaderboardList('main-leaderboard-list');
  }
}

// =========================================================
// 7. PLEIN ÉCRAN & CLAVIER
// =========================================================
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Erreur plein écran : ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

window.addEventListener('keydown', (e) => {
  if (!isGameActive) return;

  if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
    const typedLetter = e.key.toUpperCase();
    const availableTiles = document.querySelectorAll('.tile:not(.used)');
    let tileToUse = null;
    
    for (let tile of availableTiles) {
      if (tile.dataset.letter === typedLetter) {
        tileToUse = tile;
        break; 
      }
    }

    if (tileToUse) {
      const tileId = parseInt(tileToUse.dataset.tileId);
      addLetterToProposedWord(tileId, typedLetter);
    }
  }

  if (e.key === 'Backspace') {
    let lastFilledIndex = -1;
    for (let i = 0; i < proposedLetters.length; i++) {
      if (proposedLetters[i] !== null) lastFilledIndex = i;
    }
    if (lastFilledIndex !== -1) {
      removeLetterFromProposedWord(lastFilledIndex);
    }
  }

  if (e.key === 'Enter') {
    validateProposedWord();
  }

  if (e.key === 'Escape') {
    clearCurrentProposedWord();
  }
});

// Lancement à l'ouverture : on charge le fond étoilé et affiche l'accueil
initGame();
