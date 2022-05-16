export function getQuestionBankQuestionObject(data = {}) {
  return {
    description: data.description || '',
    type: data.type || '',
    difficulty: data.difficulty || 0,
    hint: data.hint || '',

    file: data.file || null,
    attachmentType: data.attachmentType || '',

    qbmId: data.qbmId || null,
    status: data.status || null
  };
}

export function getQuestionOptionsObject(data = {}) {
  return {
    description: data.description || '',
    isCorrect: data.isCorrect || false,

    attachmentType: data.attachmentType || '',
    file: data.file || null,

    qmId: data.qmId || null,
    isActive: data.isActive || false
  };
}
