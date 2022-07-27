export function addCallbackToEvent(element, eventCallbackArrObj) {
  eventCallbackArrObj.forEach((callbackObj) => {
    element?.addEventListener(callbackObj.event, callbackObj.callback);
  });
}

export const NOTE_CARD_SIZE = 150;
export const BOX = ['subtitles', 'resources', 'discussion', 'bookmark', 'notes', 'quiz'];

export function getNoteCardObj(data) {
  return {
    id: data?.id || 0,
    index: data?.index || 0,
    note: data?.note || '',
    isPinned: data?.isPinned || false,
    isOpen: data?.isOpen || true
  };
}
