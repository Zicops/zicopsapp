import React, { useEffect, useState } from 'react';

const CoursePageTabs = () => {

    let list = ['Topics', 'Resources', 'Notes', 'Discussion', 'Mentor', 'About']
    const [active, setActive] = useState('')
    // const makeActive = (e) => {e.target.setActive('active')}

    useEffect(()=>{
        alert(active)
    }, [active])
    return (
        <>
            <div className="middle_tab">
                <div className="tabs">
                    <ul>
                        {list.map((li, index) => <li className={(active == index) ? "active" : ""} key={index} onClick={() => setActive(index)}>{li}</li>)}
                        {/* <li className="active">Topics</li>
                        <li>Resources</li>
                        <li>Notes</li>
                        <li>Discussion</li>
                        <li>Mentor</li>
                        <li>About</li> */}
                    </ul>
                </div>
            </div>
            <style jsx>
                {`
                .middle_tab{
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    /* margin-top: 15px; */
                    margin-bottom: 5px;
                    border-bottom: 1px solid #6bcfcf;
                }
                
                .middle_tab .tabs ul{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    list-style-type: none;
                
                    font-size: 14px;
                    font-weight: bold;
                    line-height: 30px;
                    color:#858f8f
                }
                .middle_tab .tabs li{
                    min-width: 150px;
                    text-align: center;
                    cursor: pointer;
                    padding: 5px 0;;
                    border: 1px solid transparent;
                    border-bottom: 2px solid #1a1a1a;
                }
                .middle_tab .tabs ul li:hover{
                    /* border: 1px solid #6bcfcf;
                    border-bottom: 2px solid #1a1a1a;
                    margin-bottom: -2px; */
                    color: #ffffff;
                }
                .middle_tab .tabs .active{
                    color: #6bcfcf;
                    border: 1px solid #6bcfcf;
                    border-bottom: 2px solid #1a1a1a;
                    margin-bottom: -2px;
                }
                `}
            </style>
        </>
    )
}

export default CoursePageTabs