import { State } from "./state.js";
import { EventBus } from "./eventBus.js";

export function spawnTarget() {
  const t = {
    id: "T-" + Math.floor(Math.random() * 900),
    r: Math.random(),
    a: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.002,
    hostile: Math.random() > 0.5,
    createdAt: Date.now()
  };
  State.targets.push(t);
  EventBus.emit("target:new", t);
}

export function updateTargets() {
  State.targets.forEach(t => {
    t.a += t.vr;
  });
}

export function cleanupTargets() {
  const now = Date.now();
  const maxAge = 60000; // 60 secondes
  const maxDistance = 1.5; // au-delà de la portée radar
  
  State.targets = State.targets.filter(t => {
    const tooOld = (now - t.createdAt) > maxAge;
    const tooFar = t.r > maxDistance || t.r < 0;
    return !tooOld && !tooFar;
  });
}
