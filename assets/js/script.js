// Structure de Base


// Récupération du canvas et du contexte
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Test : affiche dans la console pour vérifier que tout est lié
console.log('Canvas !', canvas.width, canvas.height);

//ETAPE 1 : Premiers tests

// Etape 1.a : définir la taille d'une case (pour commencer le serpent fera 20x20)
const tailleCase = 20;

//Etape 1.b

let serpent = [
    {x: 80, y: 100}, // correspond à la tête du serpent
    {x: 60, y: 100}, // correspond au corps du serpent
    {x: 40, y: 100} // correspond à la queue du serpent
];

function dessinerSerpent() { //Fonction pour dessiner le serpent
    serpent.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#00ff88' : '#00aa55'; //ternaire : si c'est l'index 0 (la tête), utilise le vert clair, sinon utilise vert foncé
        ctx.fillRect(segment.x, segment.y, tailleCase, tailleCase);

        ctx.strokeStyle = '#000';
        ctx.strokeRect(segment.x, segment.y, tailleCase, tailleCase);
    });
}


/*// Appel de la fonction
dessinerSerpent();
*/

// Etape 1.c 

// Direction actuelle (on démarre vers la droite)
let direction = {x: 20, y: 0};

// Fonction pour déplacer le serpent
function deplacer() {
    // Calcule la nouvelle position de la tête
    const nouvelleTete = {
        x: serpent[0].x + direction.x,
        y: serpent[0].y + direction.y
    };

    // Ajoute la nouvelle tête au début
    serpent.unshift(nouvelleTete);
    
    // Retire la queue (pour garder la même taille)
    serpent.pop();
}

// Fonction principale : efface, déplace, redessine
function boucleDeJeu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Efface tout
    deplacer();                                         // Bouge le serpent
    dessinerSerpent();                                  // Redessine
}

// Lance la boucle : exécute boucleDeJeu() toutes les 200ms
setInterval(boucleDeJeu, 200);

// Etape 1.d
// Écoute les touches du clavier
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            // Empêche de faire demi-tour si on va vers le bas
            if (direction.y === 0) {
                direction = {x: 0, y: -20};
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = {x: 0, y: 20};
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = {x: -20, y: 0};
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = {x: 20, y: 0};
            }
            break;
    }
});

