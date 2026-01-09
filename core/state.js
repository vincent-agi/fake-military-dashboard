import { send } from "./bus.js";

export const State = {
  targets: [],
  defcon: 5,
  signals: []
};

export function publish(){
  send("state:update", {
    targets: State.targets,
    defcon: State.defcon
  });
}
