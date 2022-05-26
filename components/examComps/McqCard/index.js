import Button from '../../common/Button';
import styles from './mcqCard.module.scss';
import McqOption from './McqOption';
import {Box, Grid} from "@mui/material";
import Image from "next/image";

const McqCard = ({ each, setIsQuestion, setOption, data, setData, current, setCurrent }) => {
  const obj = {
    option: 'a',
    hint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
  };
  obj.src = '/images/courses/1.png';
  // obj.quesSrc = '/images/courses/1.png';

  const handleChange = () => {
    return data.map(function (obj) {
      if (obj.id === each.id) {
        return {
          ...obj,
          isVisited: true,
        };
      }
      else {
        return {...obj};
      }
    });
  }

  const isImage = !!each.question?.image;

  return (
    <>
      <div className={`${styles.mcq_container}`} onClick={() => {
        setCurrent(data.filter(e => e.id === (each.id))[0])
        setData(handleChange());
        setOption(data.filter(e => e.id === (each.id))[0]?.selectedOption)
        setIsQuestion(false)
      }}>
        <div className={`${styles.qcontent}`}>
          <p className={`${styles.span_element}`}>
            {/* TODO : Add difficulty lebel */}
            <span>Q{each.id}.</span>
            <span>{each.question.text}</span>
          </p>
        </div>
        {
            isImage && (
                <Box width={'100%'} display={'flex'} justifyContent={'center'} mb={4}>
                  <Image src={each.question?.image} width="150px" height="90px" />
                </Box>
            )
        }
        {/* <div className={`${styles.span_element}`}>Options:</div> */}
        <section className={`${styles.option_container}`}>
          {each.options.map((option) => (
              <McqOption optionData={option} checked={each.selectedOption}/>
          ))}
          {/* <McqOption
            obj={{ ...obj, text: 'Wrong Answer', src: undefined, option: 'a' }}
          />
          <McqOption
            obj={{ ...obj, text: 'Wong Answer', src: undefined, option: 'b' }}
          />
          <McqOption
            obj={{ ...obj, text: 'Correct Answer', src: undefined, option: 'c', checked: true }}
          />
          <McqOption
            obj={{ ...obj, text: 'Not Correct Answer', src: undefined, option: 'd'  }}
          /> */}
          {/* <McqOption obj={{ ...obj, option: 'c', src: '/images/Back.png' }} />
          <McqOption obj={{ ...obj, option: 'd' }} /> */}
        </section>
        <span className={`${styles.span_element}`}>Hint:</span>
        <div className={`${styles.hint}`}>{obj.hint}</div>
        {/*{isButtonVisible && (*/}
        {/*  <div className={`${styles.btn}`}>*/}
        {/*    <Button text={'Edit'} />*/}
        {/*    <Button text={'Cancel'} />*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </>
  );
};

export default McqCard;
