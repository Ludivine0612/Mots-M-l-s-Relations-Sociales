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
  { word: "NEGOCIATION", letters: ["I", "O", "N", "G", "E", "N", "O", "C", "I", "A", "T"], clue: "Processus de discussion entre direction et syndicats visant à un compromis mutuellement acceptable.", theme: "🤝 DIALOGUE" }, 
  { word: "COCONSTRUCTION", letters: ["N", "C", "T", "I", "C", "U", "R", "N", "O", "S", "O", "C", "O", "T"], clue: "Démarche partenariale visant à bâtir un projet conjointement entre direction et syndicats.", theme: "📈 MÉTHODE" },
]

  // =========================================================
// 2. ÉTAT DU JEU
// =========================================================
let currentClueIndex = 0;
let proposedLetters = [];
let score = 0;
let foundCount = 0;
let lives = 3;

// =========================================================
// 3. INITIALISATION ET CHARGEMENT
// =========================================================
function initGame() {
  generateBackgroundStars();
  loadWord(); 
}

function loadWord() {
  // Vérifie si on a fini le jeu
  if (currentClueIndex >= GAME_DATA.length) {
    setTimeout(() => {
      showEndgameModal(); // <--- C'EST CETTE LIGNE QUI CHANGE
    }, 500);
    return;
  }

  const currentData = GAME_DATA[currentClueIndex];
  
  // Réinitialise le tableau des lettres proposées pour le nouveau mot
  proposedLetters = new Array(currentData.word.length).fill(null);

  // Met à jour les textes à l'écran
  document.querySelector('.clue-number').textContent = currentClueIndex + 1;
  document.querySelector('.clue-text').textContent = currentData.clue;
  document.querySelector('.category-select').textContent = currentData.theme;

  // Crée le bon nombre de cases (slots) et de tuiles
  renderSlots(currentData.word.length);
  renderLetterTiles(currentData.letters);
}

function renderSlots(numberOfSlots) {
  const slotsContainer = document.querySelector('.answer-slots');
  slotsContainer.innerHTML = ''; // Vide l'existant
  
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
// 4. LOGIQUE DE JEU (Ajouter, Retirer, Valider)
// =========================================================
function addLetterToProposedWord(tileId, letter) {
  const tile = document.querySelector(`.tile[data-tile-id="${tileId}"]`);
  if (tile.classList.contains('used')) return;

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
  if (proposedLetters.includes(null)) return; // Le mot n'est pas complet

  const proposedString = proposedLetters.map(p => p.letter).join('');
  const currentData = GAME_DATA[currentClueIndex];
  const slots = document.querySelectorAll('.slot');

  if (proposedString === currentData.word) {
    // === BONNE RÉPONSE ===
    slots.forEach(slot => slot.classList.add('correct'));
    
    score += 100;
    foundCount += 1;
    updateStatsUI();
    addFoundWordToUI(currentData.word);

    // On attend 1.2 seconde puis on passe au mot suivant
    setTimeout(() => {
      currentClueIndex++;
      loadWord();
    }, 1200); 

  } else {
    // === MAUVAISE RÉPONSE ===
    slots.forEach(slot => {
      slot.style.borderColor = 'var(--red)';
      slot.style.backgroundColor = 'rgba(239,68,68,0.1)';
    });
    
    // Réduit les vies
    lives = Math.max(0, lives - 1);
    updateStatsUI();

    // Effet visuel d'erreur pendant 0.8s puis retour à la normale
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
      
      // Si plus de vies, on passe de force au mot suivant (optionnel)
      if (lives === 0) {
        alert(`Oups, plus d'essais ! Le mot était : ${currentData.word}`);
        lives = 3; // Réinitialise les vies pour le mot suivant
        currentClueIndex++;
        loadWord();
        updateStatsUI();
      }
    }, 800);
  }
}

// =========================================================
// 5. MISE À JOUR DE L'INTERFACE
// =========================================================
function updateStatsUI() {
  document.getElementById('score-value').textContent = score;
  document.getElementById('found-value').innerHTML = `${foundCount}<span>/20</span>`;
  
  // Rendu des cœurs
  const heartsArray = ['', '❤️', '❤️❤️', '❤️❤️❤️'];
  document.querySelector('.lives').textContent = heartsArray[lives] || '💀';
}

function addFoundWordToUI(word) {
  const section = document.querySelector('.found-words-section');
  
  // Crée un petit badge pour le mot trouvé
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

// Lancement du jeu !
initGame();

function giveHint() {
  // Sécurité : si on n'a plus de vies, on bloque l'action
  if (lives <= 0) return; 

  const currentData = GAME_DATA[currentClueIndex];
  const correctWord = currentData.word;
  let hintGiven = false;

  // On parcourt le mot pour trouver la première lettre manquante ou fausse
  for (let i = 0; i < correctWord.length; i++) {
    // S'il n'y a pas de lettre dans la case, ou si c'est la MAUVAISE lettre
    if (!proposedLetters[i] || proposedLetters[i].letter !== correctWord[i]) {
      
      // Si le joueur avait mis une mauvaise lettre ici, on l'enlève
      if (proposedLetters[i]) {
        removeLetterFromProposedWord(i);
      }
      
      // On cherche la bonne lettre parmi les tuiles qui ne sont pas encore utilisées
      const targetLetter = correctWord[i];
      const availableTiles = document.querySelectorAll('.tile:not(.used)');
      
      let tileToUse = null;
      for (let tile of availableTiles) {
        if (tile.dataset.letter === targetLetter) {
          tileToUse = tile;
          break; // On a trouvé la bonne tuile, on s'arrête
        }
      }

      if (tileToUse) {
        const tileId = parseInt(tileToUse.dataset.tileId);
        addLetterToProposedWord(tileId, targetLetter); // Place la lettre
        hintGiven = true;
        break; // On ne révèle qu'une seule lettre par clic
      }
    }
  }

  // Si un indice a bien été donné, on applique les pénalités
  if (hintGiven) {
    lives -= 1; // 💔 Enlève un essai (cœur)
    score = Math.max(0, score - 10); // Enlève 10 points
    updateStatsUI();

    // Si le joueur vient d'utiliser son TOUT DERNIER essai
    if (lives === 0) {
      setTimeout(() => {
        // Effet visuel rouge sur toutes les cases
        const slots = document.querySelectorAll('.slot');
        slots.forEach(slot => {
          slot.style.borderColor = 'var(--red)';
          slot.style.backgroundColor = 'rgba(239,68,68,0.1)';
        });

        // Message de fin et passage au mot suivant
        setTimeout(() => {
          alert(`Oups, plus d'essais ! Le mot était : ${currentData.word}`);
          lives = 3; // Réinitialise les vies pour le mot suivant
          currentClueIndex++;
          loadWord();
          updateStatsUI();
        }, 600);
      }, 300); // Petit délai pour laisser le temps de voir la lettre de l'indice apparaître
    }
  }
}

// =========================================================
// 6. CLASSEMENT ET NOUVEAU JOUEUR
// =========================================================

// Affiche la fenêtre de fin pour demander le pseudo
function showEndgameModal() {
  document.getElementById('final-score-display').textContent = score;
  document.getElementById('endgame-modal').classList.remove('hidden');
  document.getElementById('name-input-section').classList.remove('hidden');
  document.getElementById('leaderboard-section').classList.add('hidden');
  document.getElementById('endgame-title').textContent = "🎉 Terminé !";
  document.getElementById('player-name').value = ""; // Vide le champ
}

// Sauvegarde le score et affiche le classement
function saveScore() {
  const nameInput = document.getElementById('player-name').value.trim();
  if (!nameInput) {
    alert("Merci d'entrer un pseudo !");
    return;
  }

  // Récupérer les scores existants (ou créer un tableau vide)
  let leaderboard = JSON.parse(localStorage.getItem('airbus_leaderboard')) || [];
  
  // Ajouter le nouveau score
  leaderboard.push({ name: nameInput, score: score });
  
  // Trier les joueurs du plus grand score au plus petit
  leaderboard.sort((a, b) => b.score - a.score);
  
  // Sauvegarder dans le navigateur
  localStorage.setItem('airbus_leaderboard', JSON.stringify(leaderboard));

  showLeaderboard(leaderboard);
}

// Construit la liste HTML du classement
function showLeaderboard(leaderboard = null) {
  if (!leaderboard) {
    leaderboard = JSON.parse(localStorage.getItem('airbus_leaderboard')) || [];
  }

  document.getElementById('name-input-section').classList.add('hidden');
  document.getElementById('leaderboard-section').classList.remove('hidden');
  document.getElementById('endgame-title').textContent = "🏆 LEADERBOARD";

  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '';

  leaderboard.forEach((entry, index) => {
    const li = document.createElement('li');
    // Ajoute une petite médaille pour le Top 3
    let rank = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
    li.innerHTML = `<span>${rank} ${entry.name}</span> <span>${entry.score} pts</span>`;
    list.appendChild(li);
  });
}

// Relance le jeu à zéro pour le collègue suivant
function startNewGame() {
  // Remise à zéro des variables
  currentClueIndex = 0;
  score = 0;
  foundCount = 0;
  lives = 3;
  proposedLetters = [];

  // Vider la liste des mots trouvés en bas de l'écran
  document.querySelector('.found-words-section').innerHTML = 'Mots trouvés';

  // Cacher la fenêtre modale
  document.getElementById('endgame-modal').classList.add('hidden');

  // Relancer
  updateStatsUI();
  loadWord();
}

// Permet de vider le classement si besoin (bouton rouge)
function clearLeaderboard() {
  if(confirm("Voulez-vous vraiment effacer tous les scores ?")) {
    localStorage.removeItem('airbus_leaderboard');
    showLeaderboard([]); // Affiche une liste vide
  }
}

// =========================================================
// 7. PLEIN ÉCRAN
// =========================================================
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    // Passer en plein écran
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Erreur tentative plein écran : ${err.message}`);
    });
  } else {
    // Quitter le plein écran
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// =========================================================
// 8. GESTION DU CLAVIER
// =========================================================
window.addEventListener('keydown', (e) => {
  // 1. Si on tape une lettre (A-Z)
  if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
    const typedLetter = e.key.toUpperCase();
    
    // On cherche une tuile qui correspond à cette lettre et qui n'est pas encore utilisée
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

  // 2. Touche "Retour arrière" (Backspace) pour effacer la dernière lettre
  if (e.key === 'Backspace') {
    // On cherche l'index de la dernière lettre remplie
    let lastFilledIndex = -1;
    for (let i = 0; i < proposedLetters.length; i++) {
      if (proposedLetters[i] !== null) {
        lastFilledIndex = i;
      }
    }
    
    if (lastFilledIndex !== -1) {
      removeLetterFromProposedWord(lastFilledIndex);
    }
  }

  // 3. Touche "Entrée" pour valider le mot
  if (e.key === 'Enter') {
    validateProposedWord();
  }

  // 4. Touche "Echap" pour tout effacer
  if (e.key === 'Escape') {
    clearCurrentProposedWord();
  }
});