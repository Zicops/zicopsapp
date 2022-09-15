import React from 'react';
import { Tooltip } from '@mui/material';
import Fade from '@mui/material/Fade';
import { makeStyles } from '@material-ui/core';

const ToolTip = ({ children, placement, title, image, buttonName }) => {
  const useTooltipStyles = makeStyles((theme) => ({
    tooltip: {
      backgroundColor: '#484848',
      outline: '1px solid #b5b5b5'
    },
    arrow: {
      '&.MuiTooltip-arrow::before': {
        background: '#484848',
        outline: '1px solid #b5b5b5'
      }
    }
  }));

  const tooltipClass = useTooltipStyles();
  return (
    <>
      <Tooltip
        title={
          <>
            <div
              style={{
                fontSize: '12px',
                padding: '5px',
                maxWidth: '150px',
                wordWrap: 'wrap',
                textAlign: 'center'
              }}>
              {image && (
                <div>
                  <img src={image} alt="" />
                </div>
              )}
               <div>{title}</div>
              <div>{buttonName && <button>{buttonName}</button>}</div>
            </div>
          </>
        }
        placement={placement}
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        classes={tooltipClass}
        // enterDelay={100} leaveDelay={10000000}
      >
        {children}
      </Tooltip>
    </>
  );
};

export default ToolTip;
