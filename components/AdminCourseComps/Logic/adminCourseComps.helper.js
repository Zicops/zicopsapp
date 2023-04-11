import { UPLOAD_TOPIC_RESOURCE } from '@/api/Mutations';
import { mutateData } from '@/helper/api.helper';
import About from '../About';
import Commercials from '../Commercials';
import Configuration from '../Configuration';
import CourseDetails from '../CourseDetails';
import CourseMaster from '../CourseMaster';
import Topics from '../Topics';

// admin course tabs
export const courseTabs = {
  courseMaster: { name: 'Course Master', component: <CourseMaster /> },
  details: { name: 'Details', component: <CourseDetails /> },
  about: { name: 'About', component: <About /> },
  topics: { name: 'Topics', component: <Topics /> },
  commercials: { name: 'Commercials', component: <Commercials />, isHidden: true },
  configuration: { name: 'Configuration', component: <Configuration /> },
};

// default state objects
export function getModuleDataObject(data = {}) {
  return {
    id: data?.id || null,
    courseId: data?.courseId || null,
    sequence: data?.sequence || 1,
    name: data?.name || '',
    description: data?.description || '',
    level: data?.level || '',
    isChapter: data?.isChapter || false,

    duration: data?.duration || 0,

    owner: data?.owner || '',
    setGlobal: data?.setGlobal || false,
  };
}

export function getChapterDataObject(data = {}) {
  return {
    id: data?.id || null,
    courseId: data?.courseId || null,
    moduleId: data?.moduleId || null,
    sequence: data?.sequence || 1,
    name: data?.name || '',
    description: data?.description || '',
  };
}

export function getTopicDataObj(data = {}) {
  return {
    courseId: data?.courseId || null,
    moduleId: data?.moduleId || null,
    chapterId: data?.chapterId || null,
    id: data?.id || null,

    sequence: data?.sequence || 1,
    name: data?.name || '',
    description: data?.description || '',
    type: data?.type || '',
  };
}

export function getTopicContentDataObj(data = {}) {
  return {
    id: data?.id || null,
    topicId: data?.topicId || null,
    courseId: data?.courseId || null,
    contentUrl: data?.contentUrl || null,
    type: data?.type || null,
    language: data?.language || '',
    duration: data?.duration || '',
    isDefault: data?.isDefault || false,
    file: data?.file || '',
  };
}

export function getTopicAssessmentObj(data = {}) {
  return {
    id: data?.id || null,
    topicId: data?.topicId || null,
    courseId: data?.courseId || null,
    examId: data?.examId || null,
    language: data?.language || '',
    category: data?.category || '',
    subCategory: data?.subCategory || '',
  };
}

// common mutations
export async function addTopicResources(topicResources = []) {
  const errorMsg = [];

  for (let index = 0; index < topicResources?.length; index++) {
    const resource = topicResources[index];
    // check if all required data is present
    if (!resource?.isNew) continue;
    if (!resource.topicId) {
      errorMsg.push(`No Topic Id Found in resource ${resource?.name}`);
      continue;
    }
    if (!resource.courseId) {
      errorMsg.push(`No Course Id Found in resource ${resource?.name}`);
      continue;
    }

    const sendData = {
      name: resource.name,
      type: resource.type,
      topicId: resource.topicId,
      courseId: resource?.courseId,
    };
    if (resource.file && resource.type !== 'LINK') sendData.file = resource.file;
    if (resource.type === 'LINK') sendData.url = resource.url;

    await mutateData(UPLOAD_TOPIC_RESOURCE, sendData).catch((err) => {
      console.log(err);
      errorMsg.push(`${sendData.name} Resource Upload Failed`);
    });
  }

  return errorMsg;
}
