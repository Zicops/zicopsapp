export function addCallbackToEvent(element, eventCallbackArrObj) {
  eventCallbackArrObj.forEach((callbackObj) => {
    element?.addEventListener(callbackObj.event, callbackObj.callback);
  });
}

export const NOTE_CARD_SIZE = 150;