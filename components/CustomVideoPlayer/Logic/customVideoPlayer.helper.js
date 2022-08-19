export function addCallbackToEvent(element, eventCallbackArrObj, isRemoveCallback) {
  eventCallbackArrObj.forEach((callbackObj) => {
    if (isRemoveCallback)
      return element?.removeEventListener(callbackObj.event, callbackObj.callback);

    element?.addEventListener(callbackObj.event, callbackObj.callback);
  });
}

export const NOTE_CARD_SIZE = 150;
export const BOX = ['subtitles', 'resources', 'discussion', 'bookmark', 'notes', 'quiz'];

export function getNoteCardObj(data) {
  return {
    id: data?.id || null,
    index: data?.index || 0,
    note: data?.note || '',
    isPinned: data?.isPinned || false,
    isOpen: data?.isOpen || true,
    isActive: data?.isActive || false
  };
}
