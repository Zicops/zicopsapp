const AboutTabSmallSection = () => {
    return ( 
        <>
        <div className="small_section">
            <div className="tab_small_section">
                <div className="row">
                    <div className="col_50 small-compo"style={{margin:'0 20px 0 0'}}>
                        <div className="tab_heading">
                            Learning Objectivies
                        </div>
                        <div className="tab_section_summery">
                            <ul>
                                <li>Learn the core Java skills needed to apply for Java developer positions in just </li>
                                <li>Learn all the essential Java keywords, operators, statements, and expressions needed to fully understand exactly what you’re coding and why - making programming easy to grasp and less frustrating</li>
                                <li>Able to write clean and generic java program.</li>
                                <li>Learn the latest version of java</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col_50 small-compo"style={{margin:'0 0 0 20px'}}>
                        <div className="tab_heading">
                            Benifits
                        </div>
                        <div className="tab_section_summery">
                            <ul>
                                <li>By the end of this course, you will be able to find out the fundamental Java abilities you'll need to succeed in your job search for Java developer jobs </li>
                                <li>Be able to show your knowledge.</li>
                                <li>If youwill choose, you will be abke to sit for and pass the Oracle Java Certificate test.</li>
                                <li>Learn the latest version of java</li>
                            </ul>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
        <style jsx>{`
          .tab_small_section{
           margin:40px 80px;
        }
        .small-compo{
            background-color:#323232;
            padding:25px;
            border-radius:5px;
            min-height:220px;
        }
        .tab_heading{
            color: rgb(81, 190, 188);
            font-size:1.5em;
            padding-bottom:15px;
            font-weight:700;
            
        }
        .tab_section_summery{
            color: rgb(189, 182, 182);
            font-size:1em;
           
         }
         .tab_section_summery ul{
             padding:0px 15px 15px 15px;
         }
        `}

        </style>
        </>
     );
}
 
export default AboutTabSmallSection;