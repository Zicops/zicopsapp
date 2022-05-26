import styles from '../questionPaperPreview.module.scss';

const QuestionStatus = ({ each }) => {
  const { info_button_boxes_attempted, info_button_boxes_marked, info_button_boxes_unattempted, info_button_boxes_unvisited } = styles;
  let obj = {
    qStyle: null,
    text: '',
  } ;
  if(each.isVisited===false) {
    obj.qStyle = info_button_boxes_unvisited
    obj.text = 'Unvisited'
  }else if(each.isVisited===true && each.isMarked){
    obj. qStyle=info_button_boxes_marked ;
    obj.text = 'Marked'
  }else if(each.isVisited===true && each.selectedOption){
    obj.qStyle=info_button_boxes_attempted ;
    obj.text = 'Attempted'
  }else if(each.isVisited === true){
    obj.qStyle= info_button_boxes_unattempted ;
    obj.text = 'Unattempted'
  }
  return (
    <>
      <div className={`${styles.qStyle_coontainer}`}>
        <div className={`${styles.info_button_boxes} ${obj.qStyle}`}></div>
        {obj.text}
      </div>
    </>
  );
};

export default QuestionStatus;
