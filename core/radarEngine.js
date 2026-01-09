import { State } from "./state.js";
import { EventBus } from "./eventBus.js";

export function updateRadarScan(angle) {
  State.targets.forEach(t => {
    const diff = Math.abs(t.a - angle);
    if (diff < 0.03) {
      EventBus.emit("radar:lock", t);
    }
  });
}
