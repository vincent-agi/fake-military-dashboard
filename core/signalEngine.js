import { State } from "./state.js";
import { send } from "./bus.js";

const bands = [
  { name:"DRONE", min:400, max:500 },
  { name:"GSM", min:800, max:950 },
  { name:"WIFI", min:2400, max:2500 }
];

export function generateSignals() {
  State.signals = [];

  State.targets.forEach(t=>{
    if (t.hostile) {
      const band = bands[Math.floor(Math.random()*bands.length)];
      State.signals.push({
        freq: band.min + Math.random()*(band.max-band.min),
        power: Math.random()*0.8 + 0.2,
        source: t.id,
        band: band.name
      });
    }
  });

  send("signals:update", State.signals);
}

setInterval(() => {
  generateSignals();
  send("signals:update", State.signals);
}, 1200);
