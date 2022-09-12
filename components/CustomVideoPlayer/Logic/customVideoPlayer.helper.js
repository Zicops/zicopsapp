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
    user_notes_id: data?.user_notes_id || null,
    user_lsp_id: data?.user_lsp_id || null,
    user_id: data?.user_id || null,

    course_id: data?.course_id || null,
    module_id: data?.module_id || null,
    topic_id: data?.topic_id || null,

    sequence: data?.sequence || 0,
    details: data?.details || '',

    isPinned: data?.isPinned || false,
    isOpen: data?.isOpen || true,
    isSelected: data?.isSelected || false,

    status: data?.status || null,
    is_active: data?.is_active == null ? true : !!data?.is_active
  };
}
