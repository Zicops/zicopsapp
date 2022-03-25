const CardCourseAbout = ({children}) => {

    return ( 
        <>
        <div className="CardCourseAbout">
            {children}
        </div>
        <style jsx>
            {`
            .CardCourseAbout{
                margin: 50px calc(5.5% + 25px) 25px;
                background-color:#323232;
                padding:50px;
                border-radius:5px;
            }
            `}
        </style>
        </>
     );
}
 
export default CardCourseAbout;