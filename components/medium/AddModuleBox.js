import React, { useState } from 'react';
import styles from '../../styles/CourseMaster.module.css';

const AddModuleBox = ({title, body, set, foot, hideCross}) => {
    const modalClose = () => set(false);
    
    return (
      <>
        <div className={hideCross? "add_module_popup" : ''}>
          <div className="row">
            <div className="module_add">
              <div className="module_head">
                <div className="module_title">
                  {title}
                </div>
                <div className="cross_img">
                  {!hideCross && <img src="/images/circular-cross.png" alt="" onClick={modalClose} />}
                </div>
              </div>
              <div className="module_body">
                {body}
              </div>
              <div className="module_foot">
                {foot}
              </div>
            </div>
          </div>
        </div>
      <style jsx>{`
      .add_module_popup{
        width: 800px;
        position: fixed; 
        top: 50%; 
        left: 57%; 
        transform: translate(-50%, -50%);
      }
      .module_add{
        width: 100%;
        padding:20px ;
        border-radius: 10px;
        background-color: rgb(4, 4, 4);
        opacity: 0.95;
        box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.34),-5px -5px 5px 0px rgba(247, 241, 241, 0.16);
        // box-shadow: 16.564px -3.824px 26.95px 22.05px rgba(0, 0, 0, 0.34),9.027px -11.98px 34px 6px rgba(247, 241, 241, 0.16);
      }
      .module_head{
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
      .module_title{
          color: #858f8f;
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          margin: auto;
          margin-bottom: 15px;
      }
      .cross_img img{
          width: 20px;
          cursor: pointer;
      }
      // .module_body{
      //     // min-height: 300px;
      //     // padding: 10px;
      //     // border:1px solid #202222;
      //     border-radius: 10px;
      // }
      `}</style>
      </>
    )
}

export default AddModuleBox