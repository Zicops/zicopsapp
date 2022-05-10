export function addCallbackToEvent(element, eventCallbackArrObj) {
  eventCallbackArrObj.forEach((callbackObj) => {
    element?.addEventListener(callbackObj.event, callbackObj.callback);
  });
}
