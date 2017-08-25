export default class ListenerService {
  constructor() {
    this.listeners = {};
  }

  registerListener(callback) {
    var id = Math.random() * (new Date()).getTime();
    this.listeners[id] = callback;
    return id;
  }

  unRegisterListener(id) {
    delete this.listeners[id];
  }

  notifyListeners() {
    for (var id in this.listeners) {
      this.listeners[id]();
    }
  }
}
