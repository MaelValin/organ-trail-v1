


import { globalState } from '../global.js';

import  element  from './element.js';

import { runstart } from './element/runstart.js';



let canvasWidth = globalState.canvasWidth;
let canvasHeight = globalState.canvasHeight;
let centerX = globalState.centerX;
let centerY = globalState.centerY;




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

element.createStartButton();

