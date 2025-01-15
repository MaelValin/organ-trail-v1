

// Importer les modules nécessaires
import { createStartButton } from './element/createstartbutton.js';
import { chooseDifficulty } from './element/difficulty.js';
import { runstart } from './element/runstart.js';


// Regrouper et exporter tout dans un objet unique
const element = {
    createStartButton,
    chooseDifficulty,
    runstart,
   
};

// Exporter l'objet centralisé
export default element;
