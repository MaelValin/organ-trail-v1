import { chooseDifficulty } from './difficulty.js'; // Import direct pour éviter les cycles

export function createStartButton() {
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
