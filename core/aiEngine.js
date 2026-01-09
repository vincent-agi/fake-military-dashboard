import { send } from "./bus.js";
import { State } from "./state.js";

let lastHostiles = 0;
let reportedTargets = new Set();

// Message de démarrage
setTimeout(() => {
  send("ai:message", "Tactical AI system online");
}, 500);

// Message de test répété
setInterval(() => {
  send("ai:message", `System status: ${State.targets.length} contacts tracked`);
}, 5000);

setInterval(()=>{
  const hostiles = State.targets.filter(t=>t.hostile);
  const friendlies = State.targets.filter(t=>!t.hostile);

  // Rapport sur changement de nombre d'hostiles
  if(hostiles.length !== lastHostiles){
    if(hostiles.length > lastHostiles) {
      send("ai:message", `New hostile contact detected - Total: ${hostiles.length}`);
    } else {
      send("ai:message", `Hostile contact lost - Remaining: ${hostiles.length}`);
    }
    lastHostiles = hostiles.length;
  }

  // Analyser chaque cible hostile
  hostiles.forEach(t=>{
    // Avertissement zone critique
    if(t.r < 0.3 && !reportedTargets.has(t.id + ':critical')){
      send("ai:message", `⚠️ ALERT: ${t.id} entering critical zone at ${Math.floor(t.r*100)}km`);
      reportedTargets.add(t.id + ':critical');
    }
    
    // Menace proche
    if(t.r < 0.5 && !reportedTargets.has(t.id + ':threat')){
      send("ai:message", `Threat detected: ${t.id} at ${Math.floor(t.r*100)}km`);
      reportedTargets.add(t.id + ':threat');
    }

    // Mouvement rapide
    if(Math.abs(t.vr) > 0.0015 && !reportedTargets.has(t.id + ':fast')){
      send("ai:message", `Fast-moving target: ${t.id} detected`);
      reportedTargets.add(t.id + ':fast');
    }
  });

  // Rapport système périodique
  if(State.targets.length > 0 && Math.random() < 0.1) {
    send("ai:message", `Tracking ${State.targets.length} contacts (${hostiles.length} hostile, ${friendlies.length} friendly)`);
  }

  // Nettoyage des targets rapportées qui n'existent plus
  const currentIds = new Set(State.targets.map(t => t.id));
  reportedTargets.forEach(key => {
    const id = key.split(':')[0];
    if(!currentIds.has(id)) {
      reportedTargets.delete(key);
    }
  });

},1000);
