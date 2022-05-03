import {Box} from "@mui/material";


export default function Card({title, topic, tag, boxShadow, rotate}){
    return(
        <Box width={'100%'} color={'#FFF'} height={'100%'} position={'relative'} sx={{borderRadius: '5px', transform: `${rotate}`}} overflow={'hidden'} boxShadow={boxShadow}>
            <img src={'/images/dnd1.jpg'} alt={'dnd'} width={'100%'} height={'100%'} />
            <Box position={'absolute'} bgcolor={'#000'} top={6} right={4} fontSize={'12px'} px={1} py={0.3} sx={{borderRadius: '7px'}}>
                {tag}
            </Box>
            <Box position={'absolute'} bottom={20} left={20}>
                <Box>
                    {title}
                </Box>
                <Box fontSize={'22px'} fontWeight={600}>
                    {topic}
                </Box>
            </Box>
        </Box>
    )
}