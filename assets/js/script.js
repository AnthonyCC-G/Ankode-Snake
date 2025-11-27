// Structure de Base

// 1 - Configuration → canvas, constantes
// 2 - Variables d'état → serpent, direction, nourriture
// 3 - Fonctions de dessin → ce qui affiche
// 4 - Fonctions de logique → ce qui calcule
// 5 - Boucle de jeu → ce qui orchestre
// 6 - Contrôles → les événements clavier
// 7 - Lancement → on démarre tout


// ================================
// CONFIGURATION DE BASE
// ================================

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const tailleCase = 20;
let score = 0;
let premierePartie = true;

console.log('Canvas bien présent !', canvas.width, canvas.height);

// ================================
// ÉTAT DU JEU (variables)
// ================================

let serpent = [
    {x: 80, y: 100},  // Tête
    {x: 60, y: 100},  // Corps
    {x: 40, y: 100}   // Queue
];

let direction = {x: 20, y: 0};  // Démarre vers la droite

let nourriture = null;  // Sera généré au lancement

// ================================
// FONCTIONS DE DESSIN
// ================================

function dessinerSerpent() {
    serpent.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#00ff88' : '#00aa55';
        ctx.fillRect(segment.x, segment.y, tailleCase, tailleCase);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(segment.x, segment.y, tailleCase, tailleCase);
    });
}

function dessinerNourriture() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(nourriture.x, nourriture.y, tailleCase, tailleCase);
}

// ================================
// FONCTIONS DE LOGIQUE
// ================================

function genererNourriture() {
    return {
        x: Math.floor(Math.random() * (canvas.width / tailleCase)) * tailleCase,
        y: Math.floor(Math.random() * (canvas.height / tailleCase)) * tailleCase
    };
}

function deplacer() {
    const nouvelleTete = {
        x: serpent[0].x + direction.x,
        y: serpent[0].y + direction.y
    };

    serpent.unshift(nouvelleTete);

    if (nouvelleTete.x === nourriture.x && nouvelleTete.y === nourriture.y) {
        nourriture = genererNourriture();  // Mangé → nouvelle nourriture, pas de pop
        score++;  // +1 point
        document.getElementById('score').textContent = 'Score : ' + score;
    } else {
        serpent.pop();  // Pas mangé → retire la queue
    }
}

function verifierCollision() {
    const tete = serpent[0];
    
    // Collision murs
    if (tete.x < 0 || tete.x >= canvas.width || tete.y < 0 || tete.y >= canvas.height) {
        return true;
    }
    
    // Collision corps
    for (let i = 1; i < serpent.length; i++) {
        if (tete.x === serpent[i].x && tete.y === serpent[i].y) {
            return true;
        }
    }
    
    return false;
}

function togglePause() {
    if (premierePartie) {
        return;
    }
    
    if (enPause) {
        intervalId = setInterval(boucleDeJeu, 200);
        enPause = false;
    } else {
        clearInterval(intervalId);
        enPause = true;
    }
}



function relancer() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    
    serpent = [
        {x: 80, y: 100},
        {x: 60, y: 100},
        {x: 40, y: 100}
    ];
    direction = {x: 20, y: 0};
    score = 0;
    document.getElementById('score').textContent = 'Score : 0';
    nourriture = genererNourriture();
    enPause = false;
    intervalId = setInterval(boucleDeJeu, 200);
    
    // Change le texte du bouton après le premier lancement
    if (premierePartie) {
        document.getElementById('btn-relancer').textContent = 'Rejouer';
        premierePartie = false;
    }
}



// ================================
// BOUCLE DE JEU
// ================================

function boucleDeJeu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    deplacer();
    
    if (verifierCollision()) {
    clearInterval(intervalId);
    enPause = true;  // Le jeu s'arrête
    return;
    }
    
    
    dessinerSerpent();
    dessinerNourriture();
}

// ================================
// CONTRÔLES
// ================================

//TOUCHES DIRECTIONNELLES
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = {x: 0, y: -20};
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = {x: 0, y: 20};
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = {x: -20, y: 0};
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = {x: 20, y: 0};
            break;
        case ' ':
            e.preventDefault();
            togglePause();
            break;
    }
});



// ================================
// LANCEMENT DU JEU
// ================================

// Prépare le jeu (mais ne le lance pas)
nourriture = genererNourriture();
let intervalId = null;
let enPause = true;  // Le jeu commence en pause

// Dessine l'état initial (sans mouvement)
dessinerSerpent();
dessinerNourriture();

// Bouton relancer
document.getElementById('btn-relancer').addEventListener('click', relancer);
