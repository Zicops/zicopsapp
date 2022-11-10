import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Card({
  hover,
  isDrag,
  id,
  dragId,
  title,
  topic,
  tag,
  boxShadow,
  rotate,
  scale,
  img
}) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/course/${id}`)}>
      {id === dragId && isDrag && hover && (
        // <Box width={'30px'} height={'30px'} position={'absolute'} top={17} right={17} bgcolor={'red'} />
        <div
          style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            zIndex: '10',
            //backgroundColor: 'orange',
            //   background: 'rgb(0,255,0)',
            //   background:
            // '-moz-radial-gradient(circle, rgba(0,255,0,1) 28%, #333333 71%, #868686 100%)',
            //   background:
            // '-webkit-radial-gradient(circle, rgba(0,255,0,1) 28%, #333333 71%, #868686 100%)',
            background:
              'radial-gradient(circle, var(--dark_one) 20%, var(--dark_one) 90%, var(--primary) 100%)',
            //   filter:
            //     'progid:DXImageTransform.Microsoft.gradient(startColorstr="#00ff00",endColorstr="#000000",GradientType=1)',
            borderRadius: '50%',
            height: '60px',
            width: '60px',
            padding: '15px',
            boxShadow: '0 0 30px 0 var(--primary)'
          }}>
          <Image src={'/images/plus_big.png'} height={30} width={30} alt="" />
        </div>
      )}
      <Box
        width={'100%'}
        color={'#FFF'}
        backgroundColor={'#333'}
        height={'22vh'}
        position={'relative'}
        sx={{
          borderRadius: '5px',
          transform: `${rotate} ${scale}`,
          transition: 'transform 0.2s'
        }}
        overflow={'hidden'}
        boxShadow={boxShadow}>
        <img src={img || '/images/dnd1.jpg'} alt={'dnd'} width={'100%'} height={'100%'} />
        <Box
          position={'absolute'}
          bgcolor={'#000'}
          top={6}
          right={4}
          fontSize={'12px'}
          px={1}
          py={0.3}
          sx={{ borderRadius: '7px' }}>
          {tag}
        </Box>
        <Box position={'absolute'} bottom={20} left={20}>
          <Box>{title}</Box>
          <Box fontSize={'22px'} fontWeight={600}>
            {topic}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
