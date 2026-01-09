const channel = new BroadcastChannel("military-bus");

export function send(type, payload) {
  channel.postMessage({ type, payload });
}

export function on(type, cb) {
  channel.addEventListener('message', e => {
    if (e.data.type === type) cb(e.data.payload);
  });
}
