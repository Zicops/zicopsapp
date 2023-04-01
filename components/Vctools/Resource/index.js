import { useState } from 'react';
import styles from '../vctoolMain.module.scss';
import CreateResource from './CreateResource';
import ResourcesQA from './ResourcesQA';

const ResourcePage = ({ hide = false }) => {
    const [resourceTitle,setResourceTitle]=useState('')
    function showResource(title)
    {
        if(title==="")return <>{resourceComps[0].component}</>
        const obj=resourceComps.find(objTitle=>objTitle.title===title);
        return obj?.component
    }
    const resourceComps=[
        {
            title:"CreateResource",
            component:(<CreateResource addResource={()=>
            {
                setResourceTitle('ResourcesQA')
            }}/>)
        },
        {
            title:"ResourcesQA",
            component:(<ResourcesQA backToResource={()=>
            {
                setResourceTitle('CreateResource')
            }}/>)
        }
    ]
  return (
    <div className={`${styles.resourceBar}`}>
      <div className={`${styles.resourceHead}`}>
        <div>Resources</div>
        <button
          onClick={() => {
            hide();
          }}>
          <img src="/images/svg/vctool/close.svg" />
        </button>
      </div>

      <div className={`${styles.resourceScreen}`}>
         {showResource(resourceTitle)}
      </div>
    </div>
  );
};
export default ResourcePage;
