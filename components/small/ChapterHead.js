
const ChapterHead = ({children}) =>{
    return(
        <>
        <div className="chapter_header">
        {children}
        </div>
        <style jsx>{`
        .chapter_header{
            color: #ffffff;
            margin-bottom: 50px;
            background-color:#000000;
        }`}
            
        </style>
        </>
    )
}
export default ChapterHead