export function getMinCourseAssignDate(suggestedCompletionDays = 1) {
  const date = new Date();
  date.setDate(date.getDate() + +suggestedCompletionDays || 1);

  return date;
}

export function getCourseAssignDataObj(data = {}) {
  return {
    endDate: data?.endDate || new Date(),
    isMandatory: data?.isMandatory || false,
    courseId: data?.courseId || null,
    courseType: data?.courseType || null
  };
}
