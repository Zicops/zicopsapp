import {Box} from "@mui/material";


export default function Folder({isDrag}){

    // let isDrag = true;
    return(
        <>
            <Box position={'relative'}>
                <img src={'images/backFolder.png'} alt={'folder'}/>
                <Box position={'absolute'} top={40} left={15}>
                    <img src={'images/part1Folder.png'} alt={'folder'}/>
                </Box>
                <Box position={'absolute'} top={40} right={116}>
                    <img src={'images/part2Folder.png'} alt={'folder'}/>
                </Box>
                <Box position={'absolute'} top={40} right={15}>
                    <img src={'images/part3Folder.png'} alt={'folder'}/>
                </Box>
                <Box height={'114px'} width={'398px'} position={'absolute'} top={60} sx={{
                    background: isDrag ? 'rgba(0, 0, 0, 0.77)' : '',
                    filter: isDrag ? 'blur(28px)' : '',
                    borderRadius: '5px',
                    transition: 'background 0.2s, filter 0.2s'
                }} />
                <Box position={'absolute'} bottom={0} right={-5} sx={{
                    transform: isDrag ? 'rotateX(30deg)' : '',
                    boxShadow : isDrag ? '0px 1px 0px rgba(110, 205, 205, 0.17)' : '',
                    transformOrigin: 'bottom',
                    transition: 'transform 0.2s, boxShadow 0.2s'
                }}>
                    <img src={'images/frontFolder.png'} alt={'folder'}/>
                </Box>

            </Box>
        </>
    )
}