import { State, publish } from "./state.js";
import { spawnTarget, updateTargets, cleanupTargets } from "./targetEngine.js";
import { computeDefcon } from "./threatEngine.js";
import "./aiEngine.js";
import "./signalEngine.js";

setInterval(() => {
  if (Math.random()<0.3) spawnTarget();
}, 2000);

setInterval(() => {
  updateTargets();
  computeDefcon();
  publish();
}, 50);

// Nettoyage périodique des targets obsolètes
setInterval(() => {
  cleanupTargets();
}, 5000);