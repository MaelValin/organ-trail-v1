import element from '../element.js';

import { globalState } from '../global.js';
import "https://q5js.org/q5.js";
import "https://p5play.org/v3/planck.min.js";
import "https://p5play.org/v3/p5play.js";


export function chooseDifficulty() {
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
      globalState.activity = "daily";
      buttondaily.remove();
      buttonnight.remove();
      buttonhard.remove();
      element.runstart(); // Start the game
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