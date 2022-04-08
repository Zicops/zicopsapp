import { useState } from "react"

const Binge = ({video}) => {
    const [check, setCheck] = useState(0);
    let videoSrc;
    if (video.file) {
         videoSrc = URL.createObjectURL(video.file);
    }
    return (
        <>
            <div className="row">
                <div className="form">
                    <div className="binge_setting">
                        <div className="binge_setting_title">
                                Skip Intro :
                        </div>
                        <div className="binge_setting_body">
                            <div className="newline">
                                <span className="label">
                                    Start Time
                                </span>
                                {/* <input type="number" className="value" value="2000" /> */}
                                <span className="value">
                                    20:00
                                </span>
                                <span className="after">
                                    (Mins: Secs)
                                </span>
                            </div>
                            <div className="newline">
                                <span className="label">
                                    Duration
                                </span>
                                <span className="value">
                                    00
                                </span>
                                <span className="after">
                                    (Seconds)
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="binge_setting">
                        <div className="binge_setting_title">
                                Text Topic :
                        </div>
                        <div className="binge_setting_body">
                            <div className="newline">
                                <span className="label">
                                    Start Time
                                </span>
                                <span className="value">
                                    00:15
                                </span>
                                <span className="after">
                                    (Mins: Secs)
                                </span>
                            </div>
                            
                        </div>
                    </div>
                    <div className="from_end">
                        <div className="checkbox_mark">
                            <label className="checkbox_container">
                                <input type="checkbox" onChange={()=>setCheck(!check)} checked={check} />
                                <span className="checkmark"></span>From End
                            </label>
                        </div>
                    </div>
                    
                </div>
                <div className="video_preview">
                <video controls>
                <source  src={videoSrc} id='video' type="video/mp4" />
                Your browser does not support HTML5 video.
                </video>
                </div>
            </div>
            <div className="center">
                <div className="checkbox_mark">
                    <label className="checkbox_label">
                        <input type="checkbox" />
                        <span className="checkmark_box"></span>Set as global binge setting for the Module
                    </label>
                </div>
            </div>
            <style jsx>{`
                .row{width: 100%; display: flex; align-items: center;}
                .binge_setting{
                    display: flex;
                    align-items: center;
                }
                .binge_setting_title{
                    font-size: 16px;
                    color: #ffffff;
                    width: 25%;
                }
                .binge_setting_body{
                    Width: 75%;
                    padding: 10px;
                }
                .newline{
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    margin-bottom: 5px;
                }
                .label{
                    min-width: 80px;
                    color: #868f8f;
                    font-size: 14px;
                    margin-right: 30px;
                }
                .value{
                    min-width: 60px;
                    color: #ffffff;
                    font-size: 20px;
                    border-bottom: 1px solid #ffffff;
                    border-radius: 3px;
                    text-align: center;
                }
                .after{
                    min-width: 80px;
                    color: #868f8f;
                    font-size: 12px;
                    margin-left: 30px;
                }
                .video_preview{
                    height: 170px;
                    width: 300px;
                    background-color: #8f8f8f;
                    margin-left: auto;
                    display: flex;
                }
                .from_end{
                    display:flex;
                    justify-content: center;
                    margin-left: 25%;
                }
                .checkbox_label{
                    font-size: 18px;
                    color: #ffffff;
                    margin:auto;
                }
                .center {
                    display: flex;
                    justify-content: center;
                    margin-top: 12px;
                  }
                
/* Customize the label (the container) */
.checkbox_container {
    display: block;
    position: relative;
    padding-left: 30px;
    /* margin-bottom: 10px; */
    cursor: pointer;
    font-size: 11px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* Hide the browser's default checkbox */
  .checkbox_container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: #202222;
    border: 1px solid #858f8f;
  }
  
  /* On mouse-over, add a grey background color */
  .checkbox_container:hover input ~ .checkmark {
    /* border: 2px solid #858f8f; */
    /* box-shadow: 0 0 1px 0 #FFFFFF; */
  }
  
  /* When the checkbox is checked, add a blue background */
  .checkbox_container input:checked ~ .checkmark {
    background-color: #202222;
  }
  
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Show the checkmark when checked */
  .checkbox_container input:checked ~ .checkmark:after {
    display: block;
  }
  
  /* Style the checkmark/indicator */
  .checkbox_container .checkmark:after {
    left: 3px;
    top: 0px;
    width: 4px;
    height: 8px;
    border: solid #858f8f;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
            `}</style>
        </>
    )
}
            export default Binge