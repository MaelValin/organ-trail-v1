export const globalState = {
    // Joueur
    player: null,
    baseSpeed: 5,
    playerSpeed: 5,

    // Zombies
    zombies: [],
    zombie: null,

    // Canvas
    canvasWidth: 1500,
    canvasHeight: 900,
    centerX: 1500 / 2,
    centerY: 900 / 2,

    // Timer et score
    timermillieseconde: 0,
    timerseconde: 0,
    timerminute: 0,
    scoremoney: 0,
    scorescrach: 0,

    // Items
    items: [],
    item: null,
    decorPositions: [],
    randomDecor: [],
    decorSprites: [],

    timerandom: 5,

    // Activité
    activity: "daily",
    ammoquantity: 500,

    // Rechargement
    time: null,
    timereload: 0,
    timerealoadlimite: 2,

    // Border
    borderTop: null,
    borderBottom: null,
    borderLeft: null,
    borderRight: null,
    borders: null,

    // Couleurs
    colorfont: "#464646",

    // Clic souris
    isMousePressed: false,

    // État du jeu
    runstar: false,
};
