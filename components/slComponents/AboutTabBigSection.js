const AboutTabBigSection = () => {
return(
    <>
        <div className="tab_big_section">
            <div className="tab_heading">
                About this course
            </div>
            <div className="row">
                <div className="tab_section_summery">
                You will learn the most in-demand and essential components for becoming a Core Java developer in this course, which is intended to help you master them. This is especially true if you're going on a job interview or working on a Java project that requires your best effort. There is no pre-requisite for this course; thus, you will go from zero to hero in no time! In addition, I've included a particular emphasis on Object Orientation in Java for this Complete Java Programming Course, which I believe is underemphasized in other Java classes, therefore I've placed a strong emphasis on it throughout the lectures. Writing classes and interfaces, as well as numerous methods including loops and if else statements, exception handling, and file processing, as well as learning how to debug software using Eclipse, will all be covered in detail in this course. You'll also learn how to use the collections framework and go deep into the world of java generics. You'll learn all there is to know about multi-threading as well as the JDBC API, which is used to interact with a MySQL database. There are also practical tasks sprinkled throughout the course to allow you to put the ideas you are learning into practice as you are learning them. Another task includes processing files containing stock market data, as is the case with one of the projects, which involves developing
                <p>a management system for auto dealerships. </p>
                </div>
            </div>
        </div>
        <style jsx>{`
        .tab_big_section{
            background-color:#323232;
            padding:25px;
            margin:40px 80px;
            border-radius:5px;
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
     
          
      
          
        `}

        </style>
            

    </>
)}
export default AboutTabBigSection