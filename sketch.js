  let player = null;
  let baseSpeed = 5;
  let playerSpeed = 5;

  // Zombies
  let zombies = [];
  let zombie = null;

  // Canvas
  let canvasWidth = 1500;
  let canvasHeight = 900;
  let centerX = 1500 / 2;
  let centerY = 900 / 2;

  // Timer et score
  let timermillieseconde = 0;
  let timerseconde = 0;
  let timerminute = 0;
  let scoremoney = 0;
  let scorescrach = 0;

  // Items
  let items = [];
  let item = null;
  let decorPositions = [];
  let randomDecor = [];
  let decorSprites = [];

  let timerandom = 5;

  // Activité
  let activity = "daily";
  let ammoquantity = 500;

  // Rechargement
  let time = null;
  let timereload = 0;
  let timerealoadlimite = 2;

  // Border
  let borderTop = null;
  let borderBottom = null;
  let borderLeft = null;
  let borderRight = null;
  let borders = null;

  // Couleurs
  let colorfont = "#464646";

  // Clic souris
  let isMousePressed = false;

  // État du jeu
  let runstar = false;





function preload() {
    walkdownAnimation = loadAnimation('asset/arkaduis64x71.png', { width: 64, height: 71, frames: [7,8,9] });
    walkupAnimation = loadAnimation('asset/arkaduis64x71.png', { width: 64, height: 71, frames: [17,18] });
    walkrightAnimation = loadAnimation('asset/arkaduis64x71.png', { width: 64, height: 71, frames: [2,3,4] });
    walkleftAnimation = loadAnimation('asset/arkaduis64x71.png', { width: 64, height: 71, frames: [12,13,14] });

    walkdownrightAnimation = loadAnimation('asset/arkaduis64x71.png', { width: 64, height: 71, frames: [5,6] });
    walkdownleftAnimation = loadAnimation('asset/arkaduis64x71.png', { width: 64, height: 71, frames: [10,11] });
    walkuprightAnimation = loadAnimation('asset/arkaduis64x71.png', { width: 64, height: 71, frames: [0,1] });
    walkupleftAnimation = loadAnimation('asset/arkaduis64x71.png', { width: 64, height: 71, frames: [15,16] });

    // Charger les images
    downImage = loadImage('asset/ark/sprite_08.png');
    upImage = loadImage('asset/ark/sprite_17.png');
    rightImage = loadImage('asset/ark/sprite_03.png');
    leftImage = loadImage('asset/ark/sprite_12.png');
    downrightImage = loadImage('asset/ark/sprite_06.png');
    downleftImage = loadImage('asset/ark/sprite_10.png');
    uprightImage = loadImage('asset/ark/sprite_01.png');
    upleftImage = loadImage('asset/ark/sprite_15.png');


}

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

}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0); 
  
  createBorders();
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




function createStartButton() {
    let button = document.createElement("button");
    button.innerHTML = "Start";
    button.id = "startButton";
    button.style.position = "absolute";
    button.style.bottom = "10%";
    button.style.left = "50%";
    button.style.fontSize = "8rem";
    button.style.fontFamily = "'Jersey 15', serif";
    button.style.borderRadius = "10px";
    button.style.transform = "translateX(-50%)";
    button.style.zIndex = "1";
    document.body.appendChild(button);

    button.addEventListener("click", () => {
        button.remove(); // Supprime le bouton
        chooseDifficulty(); // Appelle la fonction pour afficher les options de difficulté
    });
}

function chooseDifficulty() {
  let buttondaily = document.createElement("button");
  buttondaily.innerHTML = "Daily";
  buttondaily.id = "dailyButton";
  buttondaily.style.position = "absolute";
  buttondaily.style.bottom = "30rem";
  buttondaily.style.left = "50%";
  buttondaily.style.fontSize = "8rem";
  buttondaily.style.fontFamily = "'Jersey 15', serif";
  buttondaily.style.borderRadius = "10px";
  buttondaily.style.transform = "translateX(-50%)";
  buttondaily.style.zIndex = "1";
  document.body.appendChild(buttondaily);

  buttondaily.addEventListener("click", () => {
    activity = "daily";
    buttondaily.remove();
    buttonnight.remove();
    buttonhard.remove();
    runstart(); // Start the game
    loop(); // Start the update loop
  });

  let buttonnight = document.createElement("button");
  buttonnight.innerHTML = "Night";
  buttonnight.id = "nightButton";
  buttonnight.style.position = "absolute";
  buttonnight.style.bottom = "20rem";
  buttonnight.style.left = "50%";
  buttonnight.style.fontSize = "8rem";
  buttonnight.style.fontFamily = "'Jersey 15', serif";
  buttonnight.style.borderRadius = "10px";
  buttonnight.style.transform = "translateX(-50%)";
  buttonnight.style.zIndex = "1";
  document.body.appendChild(buttonnight);

  buttonnight.addEventListener("click", () => {
    globalState.activity = "night";
    buttondaily.remove();
    buttonnight.remove();
    buttonhard.remove();
    element.runstart(); // Start the game
    loop(); // Start the update loop
  });

  let buttonhard = document.createElement("button");
  buttonhard.innerHTML = "Hard";
  buttonhard.id = "hardButton";
  buttonhard.style.position = "absolute";
  buttonhard.style.bottom = "10rem";
  buttonhard.style.left = "50%";
  buttonhard.style.fontSize = "8rem";
  buttonhard.style.fontFamily = "'Jersey 15', serif";
  buttonhard.style.borderRadius = "10px";
  buttonhard.style.transform = "translateX(-50%)";
  buttonhard.style.zIndex = "1";
  document.body.appendChild(buttonhard);

  buttonhard.addEventListener("click", () => {
    globalState.activity = "hard";
    buttondaily.remove();
    buttonnight.remove();
    buttonhard.remove();
    element.runstart(); // Start the game
    loop(); // Start the update loop
  });

}


function runstart() {
  runstar=true;
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
  if (activity === "daily") {
    let hasBossZombie = zombies.some((zombie) => zombie.difficulty === 4);
    if (hasBossZombie) {
      if (timerseconde % 7 === 0) {
        spawnZombie();
      }
    } else {
      if (timerseconde % 4 === 0) {
        spawnZombie();
      }
    }
  }

  if (activity === "night") {
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
  if (activity === "hard") {
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
  if (items.length < 6 && runstar===true) {
    timerandom = Math.floor(random(10, 31));
    console.log(timerandom);
    spawnItem();
  }
}, timerandom * 1000);


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

//random activity choisir la difficulté
/*const activities = ["daily", "night", "hard"];
activity = activities[Math.floor(Math.random() * activities.length)];*/

textactivity = new Sprite(canvasWidth / 2, canvasHeight - 50, 0, 0);
textactivity.textSize = 40;
textactivity.text = "Activity :" + activity;
textactivity.collider = "none";
textactivity.textColor = "white";

// Joueur
player = new Sprite(centerX, centerY, 15, 20);
player.vel.x = 0;
player.vel.y = 0;
player.rotationLock = true;
player.friction = 0;
player.layer = 10;
player.scale=2.5;

  player.addAnimation("walkdown", walkdownAnimation, {width: 64, height: 71});
  player.addAnimation("walkup", walkupAnimation, {width: 64, height: 71});
  player.addAnimation("walkright", walkrightAnimation, {width: 64, height: 71});
  player.addAnimation("walkleft", walkleftAnimation, {width: 64, height: 71});
  player.addAnimation("walkdownright", walkdownrightAnimation, {width: 64, height: 71});
  player.addAnimation("walkdownleft", walkdownleftAnimation, {width: 64, height: 71});
  player.addAnimation("walkupright", walkuprightAnimation, {width: 64, height: 71});
  player.addAnimation("walkupleft", walkupleftAnimation, {width: 64, height: 71});

  


// Spawn 6 random decor

// Dans la fonction pour créer les décors
for (let i = 0; i < 6; i++) {
  let validPosition = false;
  let randomX, randomY;

  while (!validPosition) {
    randomX = random(100, canvasWidth - 100);
    randomY = random(100, canvasHeight - 100);

    validPosition = true;

    // Vérifier la distance par rapport aux bordures
    if (
      randomX < 150 ||
      randomX > canvasWidth - 150 ||
      randomY < 150 ||
      randomY > canvasHeight - 150
    ) {
      validPosition = false;
    }

    // Vérifier la distance par rapport aux autres décors
    for (let pos of decorPositions) {
      let distance = dist(randomX, randomY, pos.x, pos.y);
      if (distance < 250) {
        validPosition = false;
        break;
      }
    }
  }

  decorPositions.push({ x: randomX, y: randomY });

  // Créer le sprite du décor
  let randomDecor = new Sprite(randomX, randomY, 150, 100);
  randomDecor.color = "blue";
  randomDecor.collider = "static";
  randomDecor.layer = 1;

  // Ajouter le sprite à une collection si nécessaire
  decorSprites.push(randomDecor); // Supposons que tu as un tableau decorSprites pour stocker les sprites
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

function update() {
    if (runstar===true) {
       
  background(0);

  for (let zombie of zombies) {
    if (player.overlaps(zombie) && zombie.vie > 0) {
        runstar=false;
        noLoop();
        textammo.remove();
        textactivity.remove();
        textmoney.remove();
        textscrach.remove();
        reload.remove();
        time.remove();
        player.remove();
        trajectoire.remove();
    trajectoire1.remove();
    trajectoire2.remove();
        if (ammo.opacity === 1) {
          ammo.remove();
        }
        zombies.forEach((zombie) => zombie.remove());
        for (let i = 0; i < items.length; i++) {
          items[i].remove();
        }
        items = [];
    
        zombies = [];
    
        decorSprites.forEach((decor) => decor.remove()); // On appelle remove sur chaque décor
        decorSprites = [];
    
        
       
    
        endbadGame();
        return;
    }
  }

  if (timerminute === 1 && timerseconde === 30) {
    runstar=false;
    noLoop();
    textammo.remove();
    textactivity.remove();
    textmoney.remove();
    textscrach.remove();
    reload.remove();
    time.remove();
    player.remove();
    trajectoire.remove();
    trajectoire1.remove();
    trajectoire2.remove();
    if (ammo.opacity === 1) {
      ammo.remove();
    }
    zombies.forEach((zombie) => zombie.remove());
    for (let i = 0; i < items.length; i++) {
      items[i].remove();
    }
    items = [];

    zombies = [];

    decorSprites.forEach((decor) => decor.remove()); // On appelle remove sur chaque décor
    decorSprites = [];

    timereload = 0;
    timerseconde = 0;
    timerminute = 0;
   

    endgoodGame();
    return;
  }

  // Gestion du timer
  if (timermillieseconde === 60) {
    timermillieseconde = 0;
    timerseconde++;
    if (timerseconde >= 60) {
      timerseconde = 0;
      timerminute++;
    }
  } else {
    timermillieseconde++;
  }
  time.text = `Time : ${timerminute}min ${timerseconde}s`;
  console.log(time.text);

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
  
    // Gestion des animations
    console.log("Angle:", angle);
    if (angle >= -22.5 && angle < 22.5) {
      console.log("Direction: Droite");
      player.animation = "walkright"; // Droite
    } else if (angle >= 22.5 && angle < 67.5) {
      console.log("Direction: Bas-droite");
      player.animation = "walkdownright"; // Bas-droite
    } else if (angle >= 67.5 && angle < 112.5) {
      console.log("Direction: Bas");
      player.animation = "walkdown"; // Bas
    } else if (angle >= 112.5 && angle < 157.5) {
      console.log("Direction: Bas-gauche");
      player.animation = "walkdownleft"; // Bas-gauche
    } else if (angle >= 157.5 || angle < -157.5) {
      console.log("Direction: Gauche");
      player.animation = "walkleft"; // Gauche
    } else if (angle >= -157.5 && angle < -112.5) {
      console.log("Direction: Haut-gauche");
      player.animation = "walkupleft"; // Haut-gauche
    } else if (angle >= -112.5 && angle < -67.5) {
      console.log("Direction: Haut");
      player.animation = "walkup"; // Haut
    } else if (angle >= -67.5 && angle < -22.5) {
      console.log("Direction: Haut-droite");
      player.animation = "walkupright"; // Haut-droite
    }


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
        if (zombie.shapecolor === "blue" || zombie.shapecolor === "purple") {
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
        zombie.stunnedTime -= deltaTime / 300; // Diminuer le temps de l'étourdissement
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
          zombie.speed = 0; // Arrêt lorsqu'il est trop proche du joueur
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
      player.animation="walkup";
    }
    if (kb.pressing("s")) {
      player.direction = 90;
      player.speed = playerSpeed;
        player.animation="walkdown";
    }
    if (kb.pressing("a")) {
      player.direction = 180;
      player.speed = playerSpeed;
        player.animation="walkleft";
    }
    if (kb.pressing("d")) {
      player.direction = 0;
      player.speed = playerSpeed;
        player.animation="walkright";
    }
    if (kb.pressing("w") && kb.pressing("a")) {
      player.direction = 225;
      player.speed = playerSpeed;
        player.animation="walkupleft";
    }
    if (kb.pressing("w") && kb.pressing("d")) {
      player.direction = 315;
      player.speed = playerSpeed;
        player.animation="walkupright";
    }
    if (kb.pressing("s") && kb.pressing("a")) {
      player.direction = 135;
      player.speed = playerSpeed;
        player.animation="walkdownleft";
    }
    if (kb.pressing("s") && kb.pressing("d")) {
      player.direction = 45;
      player.speed = playerSpeed;
        player.animation="walkdownright";
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
      player.animation = false;

    if (player.direction === 270) {
      player.image = downImage;
    } else if (player.direction === 90) {
      player.image = upImage;
    } else if (player.direction === 180) {
      player.image = leftImage;
    } else if (player.direction === 0) {
      player.image = rightImage;
    } else if (player.direction === 225) {
      player.image = upleftImage;
    } else if (player.direction === 315) {
      player.image = uprightImage;
    } else if (player.direction === 135) {
      player.image = downleftImage;
    } else if (player.direction === 45) {
      player.image = downrightImage;
    }
    


    }
  }
}
}


function endbadGame() {
    background(0);


  
    let textgameover = document.createElement("div");
    textgameover.innerHTML = "Game Over";
    textgameover.style.position = "absolute";
    textgameover.style.top = "15%";
    textgameover.style.left = "50%";
    textgameover.style.fontSize = "12rem";
    textgameover.style.fontFamily = "'Jersey 15', serif";
    textgameover.style.transform = "translate(-50%, -50%)";
    textgameover.style.zIndex = "1";
    textgameover.style.color = "white";
    textgameover.style.width = "max-content";
    document.body.appendChild(textgameover);
  
    let textscoreEnd = document.createElement("div");
    textscoreEnd.innerHTML = "Score : " + scoremoney;
    textscoreEnd.style.position = "absolute";
    textscoreEnd.style.top = "35%";
    textscoreEnd.style.left = "50%";
    textscoreEnd.style.fontSize = "8rem";
    textscoreEnd.style.fontFamily = "'Jersey 15', serif";
    textscoreEnd.style.transform = "translate(-50%, -50%)";
    textscoreEnd.style.zIndex = "1";
    textscoreEnd.style.color = "white";
    document.body.appendChild(textscoreEnd);
  
    let textscrachEnd = document.createElement("div");
    textscrachEnd.innerHTML = "Scratch : " + scorescrach;
    textscrachEnd.style.position = "absolute";
    textscrachEnd.style.top = "50%";
    textscrachEnd.style.left = "50%";
    textscrachEnd.style.fontSize = "8rem";
    textscrachEnd.style.fontFamily = "'Jersey 15', serif";
    textscrachEnd.style.transform = "translate(-50%, -50%)";
    textscrachEnd.style.zIndex = "1";
    textscrachEnd.style.color = "white";
    document.body.appendChild(textscrachEnd);

    let textTimeEnd = document.createElement("div");  
    textTimeEnd.innerHTML = "Time : " + timerminute + "min " + timerseconde + "s";
    textTimeEnd.style.position = "absolute";
    textTimeEnd.style.top = "65%";
    textTimeEnd.style.left = "50%";
    textTimeEnd.style.fontSize = "8rem";
    textTimeEnd.style.fontFamily = "'Jersey 15', serif";
    textTimeEnd.style.transform = "translate(-50%, -50%)";
    textTimeEnd.style.zIndex = "1";
    textTimeEnd.style.color = "white";
    document.body.appendChild(textTimeEnd);
  
    let buttonbadmenu = document.createElement("button");
    buttonbadmenu.innerHTML = "Menu";
    buttonbadmenu.id = "restartbuttonbad";
    buttonbadmenu.style.position = "absolute";
    buttonbadmenu.style.bottom = "5%";
    buttonbadmenu.style.left = "50%";
    buttonbadmenu.style.fontSize = "8rem";
    buttonbadmenu.style.fontFamily = "'Jersey 15', serif";
    buttonbadmenu.style.borderRadius = "10px";
    buttonbadmenu.style.transform = "translateX(-50%)";
    buttonbadmenu.style.zIndex = "1";
    document.body.appendChild(buttonbadmenu);
  
    buttonbadmenu.addEventListener("click", () => {
      textgameover.remove();
      textscoreEnd.remove();
      textscrachEnd.remove();
      textTimeEnd.remove();
      
  
      timereload = 0;
      timerseconde = 0;
      timerminute = 0;
      scoremoney = 0;
      scorescrach = 0;

    });
  }

function endgoodGame() {
  background(0);

  let textgameover = document.createElement("div");
  textgameover.innerHTML = "You survivied";
  textgameover.style.position = "absolute";
  textgameover.style.top = "15%";
  textgameover.style.left = "50%";
  textgameover.style.fontSize = "12rem";
  textgameover.style.fontFamily = "'Jersey 15', serif";
  textgameover.style.transform = "translate(-50%, -50%)";
  textgameover.style.zIndex = "1";
  textgameover.style.color = "white";
  textgameover.style.width = "max-content";
  document.body.appendChild(textgameover);

  let textscoreEnd = document.createElement("div");
  textscoreEnd.innerHTML = "Score : " + scoremoney;
  textscoreEnd.style.position = "absolute";
  textscoreEnd.style.top = "40%";
  textscoreEnd.style.left = "50%";
  textscoreEnd.style.fontSize = "8rem";
  textscoreEnd.style.fontFamily = "'Jersey 15', serif";
  textscoreEnd.style.transform = "translate(-50%, -50%)";
  textscoreEnd.style.zIndex = "1";
  textscoreEnd.style.color = "white";
  document.body.appendChild(textscoreEnd);

  let textscrachEnd = document.createElement("div");
  textscrachEnd.innerHTML = "Scratch : " + scorescrach;
  textscrachEnd.style.position = "absolute";
  textscrachEnd.style.top = "55%";
  textscrachEnd.style.left = "50%";
  textscrachEnd.style.fontSize = "8rem";
  textscrachEnd.style.fontFamily = "'Jersey 15', serif";
  textscrachEnd.style.transform = "translate(-50%, -50%)";
  textscrachEnd.style.zIndex = "1";
  textscrachEnd.style.color = "white";
  document.body.appendChild(textscrachEnd);

  let button = document.createElement("button");
  button.innerHTML = "Menu";
  button.id = "restartButton";
  button.style.position = "absolute";
  button.style.bottom = "5%";
  button.style.left = "50%";
  button.style.fontSize = "8rem";
  button.style.fontFamily = "'Jersey 15', serif";
  button.style.borderRadius = "10px";
  button.style.transform = "translateX(-50%)";
  button.style.zIndex = "1";
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    textgameover.remove();
    textscoreEnd.remove();
    textscrachEnd.remove();
    
    timereload = 0;
    timerseconde = 0;
    timerminute = 0;
    scoremoney = 0;
    scorescrach = 0;
    ammoquantity = 10;

    button.remove(); // Remove the button
    location.reload();
    
  });
}

createStartButton();

