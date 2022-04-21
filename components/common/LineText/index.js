import style from './lineText.module.scss'
const LineText = ({ text }) => {
    return (
      <>
        <div className={`${style.lineheader}`}>
          <div className={`${style.heading}`}>
            <h2>{text}</h2>
          </div>
          {/* <div className={`${style.description}`}>
            <p>
              {description || (
                <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={30} width={500} />
              )}
            </p>
          </div> */}
        </div>
      </>
    );
}
 
export default LineText;