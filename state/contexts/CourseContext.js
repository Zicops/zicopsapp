import { createContext, useState, useReducer, useEffect } from 'react';
import courseReducer from '../reducers/CourseReducer';

export const courseContext = createContext();

const CourseContextProvider = (props) => {

  // const [course, dispatch] = useReducer(courseReducer, []);
  const [tab, setTab] = useState('tab1');
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

  return (
    <courseContext.Provider value={{ tab, course, setTab, addCourseMaster }}>
      {props.children}
    </courseContext.Provider>
  );
}
 
export default CourseContextProvider;