type EventHandler = (...args: any[]) => void;

type EventNames =
  | "loading"
  | "banned"
  | "dialogue"
  | "backToSpawn"
  | "lostConnection"
  | "playCutscene"
  | "preventClose"
  | "unmountUI"
  | "showQuestsTracker";

class EventManager {
  private listeners: { [eventName: string]: EventHandler[] } = {};

  public on(eventName: EventNames, cb: EventHandler) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(cb);
  }

  public off(eventName: EventNames, cb: EventHandler) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      const index = eventListeners.indexOf(cb);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  public emit(eventName: EventNames, ...args: any[]) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach((cb) => cb(...args));
    }
  }
}

export const eventManager = new EventManager();
