export function getQuestionBankQuestionObject(data = {}) {
  return {
    id: data.id || null,
    description: data.description || '',
    type: data.type || '',
    difficulty: data.difficulty || 1,
    hint: data.hint || '',

    file: data.file || null,
    attachmentType: data.attachmentType || '',

    qbmId: data.qbmId || null,
    status: data.status || null,
    isUpdated: data?.isUpdated || false
  };
}

export function getQuestionOptionsObject(data = {}) {
  return {
    id: data.id || null,
    description: data.description || '',
    isCorrect: data.isCorrect || false,

    attachmentType: data.attachmentType || '',
    file: data.file || null,

    qmId: data.qmId || null,
    isActive: data.isActive || true
  };
}

export const acceptedFileTypes = [
  'image/png',
  'image/gif',
  'image/jpeg',
  'image/svg+xml',
  'audio/mpeg',
  'audio/mp3',
  'video/mp4'
];
