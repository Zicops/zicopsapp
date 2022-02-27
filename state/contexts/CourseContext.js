import { createContext, useState, useReducer, useEffect } from 'react';
import courseReducer from '../reducers/CourseReducer';

export const courseContext = createContext();

const CourseContextProvider = (props) => {

  // const [course, dispatch] = useReducer(courseReducer, []);
  const [tab, setTab] = useState('tab1');
  const [fullCourse, updateCourse] = useState({
    id : '',
    name : '',
    description : '',
    summary : '',
    instructor : '',
    image : '',
    previewVideo : '',
    tileImage : '',
    owner : '',
    duration : '',
    expertise_level : '',
    language : '',
    benefits : '',
    created_at : '',
    updated_at : '',
    type : '',
    prequisites : '',
    goodFor : '',
    mustFor : '',
    related_skills : '',
    publish_date : '',
    expiry_date : '',
    expected_completion : '',
    qa_required : '',
    approvers : '',
    created_by : '',
    updated_by : '',
    status : '',
    is_display : '',
    category : '',
    sub_category : '',
    sub_categories : [{
      name : 'Java',
      rank : '4',
    },{
      name : 'Qwerty',
      rank : '3',
    }]
  });
  const [course, setCourse] = useState({
    id: '',
    name: '',
    description: '',
    summary: '',
    category: '',
    subcategory: '',
    owner: '',
    status: 'DRAFT'
  });

  const addCourseMaster = (data) => {
    setCourse({
      ...course, 
      id: data.id,
      name: data.name, 
      description: data.description,
      summary: data.summary,
      category: data.category, 
      subcategory: data.subcategory, 
      owner: data.owner, 
      status: data.status
    })
  }
  const updateCourseMaster = (data) => {
    updateCourse({
      ...fullCourse, 
      id : data.id,
      name : data.name,
      description : data.description,
      summary : data.summary,
      instructor : data.instructor,
      image : data.image,
      previewVideo : data.previewVideo,
      tileImage : data.tileImage,
      owner : data.owner,
      duration : data.duration,
      expertise_level : data.expertise_level,
      language : data.language,
      benefits : data.benefits,
      created_at : data.created_at,
      updated_at : data.updated_at,
      type : data.type,
      prequisites : data.prequisites,
      goodFor : data.goodFor,
      mustFor : data.mustFor,
      related_skills : data.related_skills,
      publish_date : data.publish_date,
      expiry_date : data.expiry_date,
      expected_completion : data.expected_completion,
      qa_required : data.qa_required,
      approvers : data.approvers,
      created_by : data.created_by,
      updated_by : data.updated_by,
      status : data.status,
      is_display : data.is_display,
      category : data.category,
      sub_category : data.sub_category,
      sub_categories : {
        name : data.sub_categories.name,
        rank : data.sub_categories.rank,
      }
    })
  }
  return (
    <courseContext.Provider value={{ tab, course, fullCourse, setTab, addCourseMaster, updateCourseMaster }}>
      {props.children}
    </courseContext.Provider>
  );
}
 
export default CourseContextProvider;