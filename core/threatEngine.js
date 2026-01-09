import { State } from "./state.js";
import { EventBus } from "./eventBus.js";

export function computeDefcon() {
  const hostile = State.targets.filter(t => t.hostile).length;

  let newDefcon = 5;
  if (hostile > 2) newDefcon = 4;
  if (hostile > 5) newDefcon = 3;
  if (hostile > 8) newDefcon = 2;

  if (newDefcon !== State.defcon) {
    State.defcon = newDefcon;
    EventBus.emit("defcon:change", newDefcon);
  }
}
