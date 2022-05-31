import styles from './answerSingleOption.module.scss';
import {Box, Grid} from "@mui/material";

const AnswerSingleOption = ({ optionData, currentData,  option, setOption }) => {
  return (
    <Grid item lg={6} md={6} sm={6} xs={6}>
        <Box
            display={'flex'} color={'#FFF'} width={'100%'} height={'100%'}
            onClick={() => {setOption(optionData.id)}}>
            <span className={`${styles.answer_single_option_count}`}>{optionData.id.toUpperCase()} : </span>
            <div className={`${styles.answer_single_option_info} ${option === optionData.id ? styles.answer_single_option_info_selected : ''}`}>
                {
                    optionData.image && (
                        <div className={`${styles.answer_single_option_img_container}`}>
                            <img
                                className={` ${styles.answer_single_option_img} `}
                                src={`${optionData.image}`}
                                alt="refresh"
                            />
                        </div>
                    )
                }
                <p>{optionData.text}</p>
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam velit aliquid reiciendis omnis reprehenderit minima atque nostrum hic molestiae magnam.</p> */}
            </div>
        </Box>
    </Grid>
  );
};

export default AnswerSingleOption;
