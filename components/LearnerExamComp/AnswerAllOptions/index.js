import AnswerSingleOption from '../AnswerSingleOption';
import styles from './answerAllOptions.module.scss';
import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
const AnswerAllOptions = ({
  data,
  setData,
  current,
  setCurrent,
  filter,
  setFilter,
  option,
  setOption,
  submitPaper
}) => {
  const [nextTrigger, setNextTrigger] = useState(false);
  const [previousTrigger, setPreviousTrigger] = useState(false);
  const [markTrigger, setMarkTrigger] = useState(false);
  const [mark, setMark] = useState(false);
  const router = useRouter();

  const handleChange = (temp) => {
    return data.map(function (obj) {
      if (obj.id === current.id + temp) {
        return {
          ...obj,
          isVisited: true
        };
      } else {
        return { ...obj };
      }
    });
  };
  const handleMarked = () => {
    return data.map(function (obj) {
      if (obj.id === current.id) {
        return {
          ...obj,
          isMarked: mark
        };
      } else {
        return { ...obj };
      }
    });
  };

  useEffect(() => {
    setData(handleOptionChange());
  }, [option]);
  const handleOptionChange = () => {
    return data.map(function (obj) {
      if (obj.id === current.id) {
        return {
          ...obj,
          selectedOption: option
        };
      } else {
        return { ...obj };
      }
    });
  };

  useEffect(() => {
    if (nextTrigger) {
      setData(handleChange(1));
      // setData(changeOption());
      if (data.length !== current.id)
        setCurrent(data.filter((each) => each.id === current.id + 1)[0]);
      setNextTrigger(false);
    }
    if (previousTrigger) {
      // setData(changeOption());
      setData(handleChange(-1));
      if (current.id !== 1) setCurrent(data.filter((each) => each.id === current.id - 1)[0]);
      setPreviousTrigger(false);
    }
    if (markTrigger) {
      setData(handleMarked());
      // setData(changeMarked());
      setMarkTrigger(false);
    }
    if (current.id !== 0 && data.length !== current.id) {
      setOption(current?.selectedOption);
    }
  }, [nextTrigger, previousTrigger, markTrigger]);

  useEffect(() => {
    setMark(current?.isMarked || false);
  }, [current]);

  let index = 0;

  return (
    <>
      <Box p={4} width={'100%'} mb={10}>
        <Grid
          spacing={4}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start">
          {current.options.slice(0, 2).map((each) => (
            <AnswerSingleOption
              handleChange={handleOptionChange}
              currentData={current}
              optionData={each}
              index={index++}
              option={option}
              setOption={setOption}
            />
          ))}
          {current.options.slice(2, 4).map((each) => (
            <AnswerSingleOption
              handleChange={handleOptionChange}
              currentData={current}
              optionData={each}
              option={option}
              index={index++}
              setOption={setOption}
            />
          ))}
        </Grid>
      </Box>
      <div className={`${styles.livePageFooter}`}>
        <div></div>
        <div className={`${styles.answer_all_options_buttons_container}`}>
          <button
            disabled={!option}
            onClick={() => {
              if (filter !== 'all') setFilter('all');
              setOption(null);
            }}
            className={`${styles.answer_all_options_button} ${
              option
                ? styles.answer_all_options_button_clear
                : styles.answer_all_options_button_clear_disabled
            }`}>
            Clear<span>all options</span>
          </button>
          <button
            onClick={() => {
              if (filter !== 'all') setFilter('all');
              setMark(!mark);
              setMarkTrigger(true);
            }}
            className={`${styles.answer_all_options_button} ${
              !mark
                ? styles.answer_all_options_button_unmark
                : styles.answer_all_options_button_mark
            }`}>
            {mark ? 'Unmark' : 'Mark'}
            <span>from review</span>
          </button>
          <button
            disabled={current.id === 1}
            onClick={() => {
              setPreviousTrigger(true);
            }}
            className={`${styles.answer_all_options_button} ${
              current.id === 1
                ? styles.answer_all_options_button_previous_disabled
                : styles.answer_all_options_button_previous
            }`}>
            Previous<span>Question</span>
          </button>
          <button
            onClick={() => {
              current.id === data.length ? submitPaper() : setNextTrigger(true);
            }}
            className={`${styles.answer_all_options_button} ${styles.answer_all_options_button_next}`}>
            {current.id === data.length ? (
              <>
                Submit
                <span>Paper</span>
              </>
            ) : (
              <>
                Next<span>Question</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AnswerAllOptions;
