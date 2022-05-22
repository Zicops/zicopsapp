import styles from './examAllQuestion.module.scss'
import Image from "next/image";
import {Box, Grid} from "@mui/material";


const ExamAllQuestions = ({current}) => {
    const isImage = !!current.question?.image;
  return (
      <>
          <Box bgcolor={'#040404'} color={'#FFF'} width={'100%'} pt={1} px={3} pb={4}>
              <Box mb={1} color={'#868f8f'} fontSize={'2rem'}>
                  {current.id}.
              </Box>
              <Grid container spacing={2} sx={{px: 1}}>
                  <Grid item lg={isImage ? 8 : 12} md={isImage ? 8 : 12} sm={isImage ? 8 : 12} xs={isImage ? 8 : 12}>
                      <Box>
                          {current.question?.text}
                      </Box>
                  </Grid>
                  {
                      isImage && (
                          <Grid item lg={4} md={4} sm={4} xs={4} sx={{mt: -2}}>
                            <Box width={'100%'} display={'flex'} justifyContent={'flex-end'}>
                                <Image src={current.question?.image} width="250px" height="150px" />
                            </Box>
                          </Grid>
                      )
                  }
              </Grid>
          </Box>
      </>
  )
}

export default ExamAllQuestions