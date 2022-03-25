const CardCourseRow = ({children}) => {

    return ( 
        <>
        <div className="compo_row">
            {children}
        </div>
        <style jsx>
            {`
            .compo_row{
                display: flex;
                width: 100%;
                padding: 0 5.5%;
                font-size: 0.9vw;
            }
            `}
        </style>
        </>
     );
}
 
export default CardCourseRow;