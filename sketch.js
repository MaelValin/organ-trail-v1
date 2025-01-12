let player;
let baseSpeed = 5;
let playerSpeed = baseSpeed;

let zombies = [];

let canvasWidth = 1200;
let canvasHeight = 700;
let centerX = canvasWidth / 2;
let centerY = canvasHeight / 2;

// Timer et score
let timermillieseconde = 0;
let timerseconde = 0;
let timerminute = 0;
let scoremoney = 0;
let scorescrach = 0;

let items = [];
let decorPositions = [];

let timerandom = 10;

let activity = "daily";
let ammoquantity = 10;

// Rechargement
let time;
let timereload = 0;
let timerealoadlimite = 2;

// border
let borderTop;
let borderBottom;
let borderLeft;
let borderRight;
let borders;

// Couleurs
let colorfont = "#464646";

let isMousePressed = false; // État du clic

/*function preload() {
    player = loadImage('player.png');
}*/

function createBorders() {
  // Créer les bords comme des sprites
  borderTop = new Sprite(centerX, 0, canvasWidth, 10);
  borderTop.shape = "box";
  borderTop.color = colorfont;
  borderTop.collider = "static";

  borderBottom = new Sprite(centerX, canvasHeight, canvasWidth, 10);
  borderBottom.shape = "box";
  borderBottom.color = colorfont;
  borderBottom.collider = "static";

  borderLeft = new Sprite(0, centerY, 10, canvasHeight);
  borderLeft.shape = "box";
  borderLeft.color = colorfont;
  borderLeft.collider = "static";

  borderRight = new Sprite(canvasWidth, centerY, 10, canvasHeight);
  borderRight.shape = "box";
  borderRight.color = colorfont;
  borderRight.collider = "static";

  // Ajouter les bords dans un tableau
  borders = [borderTop, borderBottom, borderLeft, borderRight];
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0);

  createBorders();

  
}

function createStartButton() {
    
  let button = document.createElement("button");
  button.innerHTML = "Start";
  button.id = "startButton";
  button.style.position = "absolute";
  button.style.bottom = "10rem";
  button.style.left = "50%";
  button.style.fontSize = "8rem";
  button.style.fontFamily = "'Jersey 15', serif";
  button.style.borderRadius = "10px";
  button.style.transform = "translateX(-50%)";
  button.style.zIndex = "1";
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    button.remove(); // Remove the button
    runstart(); // Start the game
    loop(); // Start the update loop
  });
}







function runstart() {


    // Ennemi
function spawnZombie() {
    let randomX, randomY;
  
    // Générer des coordonnées aléatoires en dehors du canvas
    if (random() < 0.5) {
      randomX = random() < 0.5 ? -50 : canvasWidth + 50;
      randomY = random(-50, canvasHeight + 50);
    } else {
      randomX = random(-50, canvasWidth + 50);
      randomY = random() < 0.5 ? -50 : canvasHeight + 50;
    }
  
    let zombie = new Sprite(randomX, randomY, 50, 50);
    zombie.shape = "circle";
    zombie.collider = "dynamic";
    zombie.rotationLock = true;
    zombie.overlaps(borderTop, false);
    zombie.overlaps(borderBottom, false);
    zombie.overlaps(borderLeft, false);
    zombie.overlaps(borderRight, false);
    zombie.layer = 2;

   
    let randomDifficulty = random();
    if (randomDifficulty < 0.8) {
      // Normal zombie
      zombie.color = "red";
      zombie.shapecolor = "red";
      zombie.speed = 2;
      zombie.difficulty = 1;
      zombie.vie = 1;
    } else if (randomDifficulty < 0.9) {
      // Fast zombie
      zombie.color = "yellow";
      zombie.shapecolor = "yellow";
      zombie.speed = 4;
      zombie.difficulty = 2;
      zombie.vie = 1;
    } else if (randomDifficulty < 0.99) {
      // Heavy zombie
      zombie.color = "blue";
      zombie.shapecolor = "blue";
      zombie.speed = 1;
      zombie.difficulty = 3;
      zombie.vie = 2;
    } else {
      // Boss zombie
      let hasBossZombie = zombies.some((z) => z.difficulty === 4);
      if (!hasBossZombie && activity !== "daily") {
        zombie.color = "purple";
        zombie.shapecolor = "purple";
        zombie.speed = 2;
        zombie.difficulty = 4;
        zombie.vie = 5;
      } else {
        // If a boss zombie is already present, spawn a normal zombie instead
        zombie.color = "red";
        zombie.shapecolor = "red";
        zombie.speed = 2;
        zombie.difficulty = 1;
        zombie.vie = 1;
      }
    }
  
    zombies.push(zombie); // Ajoute le zombie au tableau
  }
  
  // Appeler spawnZombie toutes les 4 secondes
  setInterval(() => {
      
  
      if (activity === 'daily') {
    let hasBossZombie = zombies.some((zombie) => zombie.difficulty === 4);
    if (hasBossZombie) {
      if (timerseconde % 7 === 0) {
        spawnZombie();
      }
    } else {
      if (timerseconde % 4 === 0) {
        spawnZombie();
        console.log("spawn");
        console.log(zombies)
        
      }
    }
  }
  
  if (activity === 'night') {
    let hasBossZombie = zombies.some((zombie) => zombie.difficulty === 4);
    if (hasBossZombie) {
      if (timerseconde % 5 === 0) {
        spawnZombie();
      }
    } else {
      if (timerseconde % 3 === 0) {
        spawnZombie();
      }
    }
  
  }
  if (activity === 'hard') {
    let hasBossZombie = zombies.some((zombie) => zombie.difficulty === 4);
    if (hasBossZombie) {
      if (timerseconde % 3 === 0) {
        spawnZombie();
      }
    } else {
      if (timerseconde % 2 === 0) {
        spawnZombie();
      }
    }
  }
  
  }, 1000);
  
  
function spawnItem() {
    let randomX, randomY;
    let validPosition = false;

    // Générer des coordonnées valides
    while (!validPosition) {
        randomX = random(100, canvasWidth - 100);
        randomY = random(100, canvasHeight - 100);

        validPosition = decorPositions.every(
            (pos) => dist(randomX, randomY, pos.x, pos.y) >= 120
        );
    }

    let item = new Sprite(randomX, randomY, 50, 50);
    item.collider = "none";
    item.rotationLock = true;
    item.layer = 1;

    // Définir le type d'item
    const itemTypes = [
        { color: "cyan", value: 1 }, // Valeur faible
        { color: "orange", value: 2 },
        { color: "blue", value: 3 }, // Valeur moyenne
        { color: "red", value: 4 }, // Valeur élevée
    ];

    const randomValue = random();
    const typeIndex =
        randomValue < 0.7 ? floor(random(0, 2)) : floor(random(2, 4));
    Object.assign(item, itemTypes[typeIndex]);

    items.push(item); // Ajouter l'item à la liste
}

// Appeler item toutes les 10 secondes
setInterval(() => {
    if (items.length < 6 && timerseconde % timerandom === 0) {
        timerandom = Math.floor(random(15, 31));
        console.log(timerandom);
        spawnItem();
    }
}, 1000);

  
  timermillieseconde = 0;
  timerseconde = 0;
  timerminute = 0;

  // Timer affiché
  time = new Sprite(160, 45, 0, 0);
  time.textSize = 40;
  time.text = "Time : 0min 0s";
  time.collider = "none";
  time.textColor = "white";

  reload = new Sprite(canvasWidth - 130, canvasHeight - 50, 0, 0);
  reload.textSize = 40;
  reload.text = "Reload : 0";
  reload.collider = "none";
  reload.textColor = "white";

  textmoney = new Sprite(canvasWidth - 130, 45, 0, 0);
  textmoney.textSize = 40;
  textmoney.text = "Score : " + scoremoney;
  textmoney.collider = "none";
  textmoney.textColor = "white";

  textscrach = new Sprite(canvasWidth - 130, 100, 0, 0);
  textscrach.textSize = 40;
  textscrach.text = "Scratch :" + scorescrach;
  textscrach.collider = "none";
  textscrach.textColor = "white";

  if (ammoquantity === 0) {
    textammo = new Sprite(300, canvasHeight - 50, 0, 0);
    textammo.textSize = 40;
    textammo.text = "Out of Ammo";
    textammo.collider = "none";
    textammo.textColor = "white";
  } else {
    textammo = new Sprite(300, canvasHeight - 50, 0, 0);
    textammo.textSize = 40;
    textammo.text = "Ammo :" + ammoquantity;
    textammo.collider = "none";
    textammo.textColor = "white";
  }

  const activities = ["daily", "night", "hard"];
  activity = activities[Math.floor(Math.random() * activities.length)];

  textactivity = new Sprite(canvasWidth / 2, canvasHeight - 50, 0, 0);
  textactivity.textSize = 40;
  textactivity.text = "Activity :" + activity;
  textactivity.collider = "none";
  textactivity.textColor = "white";

  // Joueur
  player = new Sprite(centerX, centerY, 50, 50);
  player.vel.x = 0;
  player.vel.y = 0;
  player.rotationLock = true;
  player.friction = 0;
  player.layer = 10;


   


  // Spawn 6 random decor

  for (let i = 0; i < 6; i++) {
    let validPosition = false;
    let randomX, randomY;

    while (!validPosition) {
      randomX = random(100, canvasWidth - 100);
      randomY = random(100, canvasHeight - 100);

      validPosition = true;

      // Check distance from borders
      if (
        randomX < 150 ||
        randomX > canvasWidth - 150 ||
        randomY < 150 ||
        randomY > canvasHeight - 150
      ) {
        validPosition = false;
      }

      // Check distance from other decor
      for (let pos of decorPositions) {
        let distance = dist(randomX, randomY, pos.x, pos.y);
        if (distance < 250) {
          validPosition = false;
          break;
        }
      }
    }

    decorPositions.push({ x: randomX, y: randomY });

    let randomDecor = new Sprite(randomX, randomY, 150, 100);
    randomDecor.color = "blue";
    randomDecor.collider = "static";
    randomDecor.layer = 1;
  }

  // Projectile
  ammo = new Sprite(player.x, player.y, 10, 10);
  ammo.opacity = 0;
  ammo.overlaps(player, false);
  ammo.layer = 5;
  ammo.color = "white";

  // Trajectoire
  trajectoire = new Sprite(player.x, player.y, 10, 10);
  trajectoire.opacity = 0;
  trajectoire.collider = "none";
  trajectoire.shape = "circle";
  trajectoire.color = "white";

  trajectoire1 = new Sprite(player.x, player.y, 10, 10);
  trajectoire1.opacity = 0;
  trajectoire1.collider = "none";
  trajectoire1.shape = "circle";
  trajectoire1.color = "white";

  trajectoire2 = new Sprite(player.x, player.y, 10, 10);
  trajectoire2.opacity = 0;
  trajectoire2.collider = "none";
  trajectoire2.shape = "circle";
  trajectoire2.color = "white";

  

  
}

function mousePressed() {
  if (timereload === 0) {
    isMousePressed = true;
  }
  player.speed = 0;
  player.direction = 0;
}

function mouseReleased() {
  if (isMousePressed && timereload === 0 && ammoquantity > 0) {
    // Vérifier si la souris est proche du joueur lors du relâchement
    let distanceToPlayer = dist(mouseX, mouseY, player.x, player.y);
    if (distanceToPlayer < 200) {
      // Ajustez cette valeur selon la distance souhaitée
      // Tirer le projectile
      ammo.x = player.x;
      ammo.y = player.y;
      ammo.direction = createVector(
        mouseX - player.x,
        mouseY - player.y
      ).heading();
      ammo.speed = 10;
      ammo.opacity = 1;
      ammo.collider = "dynamic";
      ammoquantity = ammoquantity - 1;
      textammo.text = "Ammo :" + ammoquantity;

      timereload = timerealoadlimite; // Temps de rechargement
    }
  }
  isMousePressed = false;
}

function update() {
  background(0);

  allSprites.draw();

  // Gestion du timer
  timermillieseconde += deltaTime / 1000;
  if (timermillieseconde >= 1) {
    timermillieseconde = 0;
    timerseconde++;
    if (timerseconde >= 60) {
      timerseconde = 0;
      timerminute++;
    }
  }
  time.text = `Time : ${timerminute}min ${timerseconde}s`;

  // Gestion du rechargement
  if (timereload > 0) {
    timereload -= deltaTime / 1000;
    if (timereload < 0) timereload = 0;
  }
  reload.text = `Reload : ${Math.ceil(timereload)}`;

  // Mise à jour de la trajectoire
  if (isMousePressed && timereload === 0) {
    let distanceToPlayer = dist(mouseX, mouseY, player.x, player.y);
    let maxDistance = 600;
    let factor = max(0, 1 - distanceToPlayer / maxDistance);

    let angle = atan2(mouseY - player.y, mouseX - player.x);
    trajectoire.x = player.x + cos(angle) * (50 * factor);
    trajectoire.y = player.y + sin(angle) * (50 * factor);
    trajectoire.opacity = 1;
    trajectoire1.x = player.x + cos(angle) * (90 * factor);
    trajectoire1.y = player.y + sin(angle) * (90 * factor);
    trajectoire1.opacity = 1;
    trajectoire2.x = player.x + cos(angle) * (130 * factor);
    trajectoire2.y = player.y + sin(angle) * (130 * factor);
    trajectoire2.opacity = 1;
  } else {
    trajectoire.opacity = 0;
    trajectoire1.opacity = 0;
    trajectoire2.opacity = 0;
  }

  if (ammoquantity === 0) {
    textammo.text = "Out of Ammo";

    textammo.textColor = "red";
  }
  // Gestion des projectiles
  if (ammo.opacity === 1) {
    ammo.move();
    for (let zombie of zombies) {
      if (
        ammo.overlaps(zombie) &&
        (zombie.shapecolor === "red" ||
          zombie.shapecolor === "yellow" ||
          zombie.shapecolor === "blue" ||
        zombie.shapecolor === "purple")
      ) {
        zombie.vie = zombie.vie - 1;
        ammo.opacity = 0;
        if(zombie.shapecolor === "blue" || zombie.shapecolor === "purple"){
          zombie.stunnedTime = 5;
        }
      } 
      


  

      if (zombie.vie === 0) {
        zombie.color = "green";
        zombie.shapecolor = "green";
        zombie.collider = "none";
        zombie.speed = 0;
      }
    }

    if (
      ammo.overlaps(borderTop) ||
      ammo.overlaps(borderBottom) ||
      ammo.overlaps(borderLeft) ||
      ammo.overlaps(borderRight)
    ) {
      ammo.opacity = 0;
    }
  } else {
    ammo.x = player.x;
    ammo.y = player.y;
  }


  // Mise à jour des zombies
for (let zombie of zombies) {
    if (
      zombie.shapecolor === "red" ||
      zombie.shapecolor === "yellow" ||
      zombie.shapecolor === "blue" ||
      zombie.shapecolor === "purple"
    ) {
      let distance = dist(zombie.x, zombie.y, player.x, player.y);
      let minDistance = player.width / 2 + zombie.width / 2;
  
      // Si le zombie est étourdi, il ne bouge pas
      if (zombie.stunnedTime > 0) {
        zombie.stunnedTime -= deltaTime / 300;  // Diminuer le temps de l'étourdissement
        zombie.speed = 0;
      } else {
        if (distance > minDistance) {
          zombie.direction = atan2(player.y - zombie.y, player.x - zombie.x);
          
          // Définir la vitesse en fonction de la difficulté du zombie
          if (zombie.difficulty === 1 || zombie.difficulty === 4) {
            zombie.speed = 2;
          } else if (zombie.difficulty === 2) {
            zombie.speed = 3;
          } else {
            zombie.speed = 1;
          }
        } else {
          zombie.speed = 0;  // Arrêt lorsqu'il est trop proche du joueur
        }
      }
    }
  }

  
  for (let item of items) {
    if (player.overlaps(item)) {
      if (item.value === 1) {
        scoremoney = scoremoney + 25;
        textmoney.text = "Score : " + scoremoney;
        item.opacity = 0;
        item.value = 0;
        let index = items.indexOf(item);
        if (index > -1) {
          items.splice(index, 1);
        }
      }
      if (item.value === 3) {
        scoremoney = scoremoney + 50;
        textmoney.text = "Score : " + scoremoney;
        item.opacity = 0;
        item.value = 0;
        let index = items.indexOf(item);
        if (index > -1) {
          items.splice(index, 1);
        }
      }
      if (item.value === 2) {
        scorescrach = scorescrach + 10;
        textscrach.text = "Scratch : " + scorescrach;
        item.opacity = 0;
        item.value = 0;
        let index = items.indexOf(item);
        if (index > -1) {
          items.splice(index, 1);
        }
      }
      if (item.value === 4) {
        scorescrach = scorescrach + 200;
        textscrach.text = "Scratch : " + scorescrach;
        item.opacity = 0;
        item.value = 0;
        let index = items.indexOf(item);
        if (index > -1) {
          items.splice(index, 1);
        }
      }
    }
  }

  // Déplacement joueur
  if (!isMousePressed) {
    if (kb.pressing("w")) {
      player.direction = 270;
      player.speed = playerSpeed;
    } 
    if (kb.pressing("s")) {
      player.direction = 90;
      player.speed = playerSpeed;
    } 
    if (kb.pressing("a")) {
      player.direction = 180;
      player.speed = playerSpeed;
    } 
    if (kb.pressing("d")) {
      player.direction = 0;
      player.speed = playerSpeed;
    } 
    if (kb.pressing("w") && kb.pressing("a")) {
      player.direction = 225;
      player.speed = playerSpeed;
    } 
    if (kb.pressing("w") && kb.pressing("d")) {
      player.direction = 315;
      player.speed = playerSpeed;
    } 
    if (kb.pressing("s") && kb.pressing("a")) {
      player.direction = 135;
      player.speed = playerSpeed;
    } 
    if (kb.pressing("s") && kb.pressing("d")) {
      player.direction = 45;
      player.speed = playerSpeed;
    } 
    if (
      !kb.pressing("w") &&
      !kb.pressing("s") &&
      !kb.pressing("a") &&
      !kb.pressing("d")
    ) {
      player.speed = 0;
      player.vel.x = 0;
      player.vel.y = 0;
    }
  }
  
}

createStartButton();

loop();
