import React from 'react';
import { Tooltip } from '@mui/material';
import Fade from '@mui/material/Fade';
import { makeStyles } from '@material-ui/core';
import styles from '../productTour.module.scss';

const ProductTooltip = ({
  children,
  placement,
  title = '',
  image,
  buttonName,
  tooltipIsOpen = true
}) => {
  const useTooltipStyles = makeStyles((theme) => ({
    tooltip: {
      // backgroundColor: '#737373',
      backgroundColor: 'rgb(75,92,107)'
      // outline: '1px solid #b5b5b5'
    },
    arrow: {
      '&.MuiTooltip-arrow::before': {
        background: 'rgb(75,92,107)'
        // outline: '1px solid #b5b5b5'
      }
    }
  }));

  const tooltipClass = useTooltipStyles();
  // console.log(tooltipIsOpen);
  return (
    <>
      <Tooltip
        open={tooltipIsOpen}
        title={
          title?.length > 0 ? (
            <div className={styles.tooltip}>
              <div>{buttonName && <button className={styles.infoBtn}>{buttonName}</button>}</div>
              <div
                style={{
                  fontSize: '14px',
                  padding: '5px',
                  maxWidth: '750px',
                  wordWrap: 'wrap'
                  // textAlign: 'center'
                }}>
                {image && <div></div>}
                <div>{title}</div>
              </div>
            </div>
          ) : (
            ''
          )
        }
        placement={placement}
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        classes={tooltipClass}
        // enterDelay={1000}
        // leaveDelay={1000000}
      >
        {children}
      </Tooltip>
    </>
  );
};

export default ProductTooltip;
