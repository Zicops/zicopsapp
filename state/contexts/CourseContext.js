import { createContext, useState, useReducer, useEffect } from 'react';
import { tabData } from '../../components/Tabs/Logic/tabs.helper';

export const courseContext = createContext();

const CourseContextProvider = (props) => {
  const [tab, setTab] = useState(tabData[0].name);

  const [courseVideo, setCourseVideo] = useState({ upload: 0, courseId: '' });
  const [courseImage, setCourseImage] = useState({ upload: 0, courseId: '' });
  const [courseTileImage, setCourseTileImage] = useState({ upload: 0, courseId: '' });
  const [isDataLoaded, setIsDataLoaded] = useState(null);

  const [fullCourse, updateCourse] = useState({
    id: '',
    name: '',
    description: '',
    summary: '',
    instructor: '',
    image: '',
    previewVideo: '',
    tileImage: '',
    owner: '',
    duration: 0,
    expertise_level: '',
    language: [],
    benefits: [],
    outcomes: [],
    created_at: '',
    updated_at: '',
    type: '',
    prequisites: [],
    goodFor: [],
    mustFor: [],
    related_skills: [],
    publish_date: '',
    expiry_date: '',
    expected_completion: '',
    qa_required: false,
    approvers: [],
    created_by: '',
    updated_by: '',
    status: '',
    is_display: false,
    is_active: true,
    category: '',
    sub_category: '',
    sub_categories: []
  });
  const updateCourseMaster = (data) => {
    const sub_categories_filtered = data.sub_categories.filter((s) => s.name);
    const sub_categories = [];
    sub_categories_filtered.forEach((s) => sub_categories.push({ name: s.name, rank: s.rank }));

    updateCourse({
      ...fullCourse,
      id: data.id,
      name: data.name,
      description: data.description,
      summary: data.summary,
      instructor: data.instructor,
      image: data.image,
      previewVideo: data.previewVideo,
      tileImage: data.tileImage,
      owner: data.owner,
      duration: data.duration,
      expertise_level: data.expertise_level,
      language: data.language,
      benefits: data.benefits,
      outcomes: data.outcomes,
      created_at: data.created_at,
      updated_at: data.updated_at,
      type: data.type,
      prequisites: data.prequisites,
      goodFor: data.goodFor,
      mustFor: data.mustFor,
      related_skills: data.related_skills,
      publish_date: data.publish_date,
      expiry_date: data.expiry_date,
      expected_completion: data.expected_completion,
      qa_required: data.qa_required,
      approvers: data.approvers,
      created_by: data.created_by,
      updated_by: data.updated_by,
      status: data.status,
      is_display: data.is_display,
      is_active: data.is_active,
      category: data.category,
      sub_category: data.sub_category,
      sub_categories: sub_categories //this is an array that contains objects
    });
  };
  return (
    <courseContext.Provider
      value={{
        tab,
        setTab,
        fullCourse,
        updateCourseMaster,
        courseVideo,
        setCourseVideo,
        courseImage,
        setCourseImage,
        courseTileImage,
        setCourseTileImage,
        isDataLoaded,
        setIsDataLoaded
      }}>
      {props.children}
    </courseContext.Provider>
  );
};

export default CourseContextProvider;
