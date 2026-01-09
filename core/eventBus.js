export const EventBus = {
  events: {},
  on(event, cb) {
    (this.events[event] ||= []).push(cb);
  },
  emit(event, data) {
    (this.events[event] || []).forEach(cb => cb(data));
  }
};
