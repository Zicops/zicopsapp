import { Box } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { IconButton } from '@material-ui/core';
import ToolTip from '@/components/common/ToolTip';
import { LEARNER_SELF_LANDING } from '@/components/common/ToolTip/tooltip.helper';

export default function Folder({ isDrag, total, handleClick = () => {} }) {
  // let isDrag = true;
  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Box position={'relative'}>
        <img src={'images/backFolder.png'} alt={'folder'} />
        <Box position={'absolute'} top={40} left={15}>
          <img src={'images/part1Folder.png'} alt={'folder'} />
        </Box>
        <Box position={'absolute'} top={40} right={116}>
          <img src={'images/part2Folder.png'} alt={'folder'} />
        </Box>
        <Box position={'absolute'} top={40} right={15}>
          <img src={'images/part3Folder.png'} alt={'folder'} />
        </Box>
        <Box
          height={'114px'}
          width={'398px'}
          position={'absolute'}
          top={60}
          sx={{
            background: isDrag ? 'rgba(0, 0, 0, 0.77)' : '',
            filter: isDrag ? 'blur(28px)' : '',
            borderRadius: '5px',
            transition: 'background 0.2s, filter 0.2s'
          }}
        />
        <Box
          position={'absolute'}
          bottom={0}
          right={-5}
          sx={{
            transform: isDrag ? 'rotateX(30deg)' : '',
            // boxShadow: isDrag ? '0px 1px 0px rgba(110, 205, 205, 0.17)' : '',
            transformOrigin: 'bottom',
            transition: 'transform 0.2s, boxShadow 0.2s'
          }}>
          <ToolTip title={LEARNER_SELF_LANDING.courseFolder}>
            <img src={'images/frontFolder.png'} alt={'folder'} />
          </ToolTip>
        </Box>
        <Box
          fontWeight={600}
          p={3}
          position={'absolute'}
          bottom={0}
          width={'100%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Box>
            <Box mb={0.5}>Course Folder</Box>
            <Box ml={1.5} fontSize={'14px'} sx={{ opacity: 0.5 }}>
              {total} Course in Folder
            </Box>
          </Box>
          {/* <IconButton> */}
          <ArrowForwardIosRoundedIcon sx={{ color: 'white' }} />
          {/* </IconButton> */}
        </Box>
      </Box>
    </div>
  );
}
