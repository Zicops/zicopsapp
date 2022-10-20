import React from 'react';
import { Tooltip } from '@mui/material';
import Fade from '@mui/material/Fade';
import { makeStyles } from '@material-ui/core';

const ToolTip = ({ children, placement, title = "", image, buttonName }) => {
  const useTooltipStyles = makeStyles((theme) => ({
    tooltip: {
      backgroundColor: '#4b5c6b',
    },
    arrow: {
      '&.MuiTooltip-arrow::before': {
        background: '#4b5c6b',
      }
    }
  }));

  const tooltipClass = useTooltipStyles();

  return (
    <>
      <Tooltip
        title={title?.length > 0?
          <>
            <div
              style={{
                fontSize: '13px',
                fontWeight:'600',
                padding: '5px',
                maxWidth: '150px',
                wordWrap: 'wrap',
                textAlign: 'center'
              }}>
              {image && (
                <div>
                </div>
              )}
               <div>{title}</div>
              <div>{buttonName && <button>{buttonName}</button>}</div>
            </div>
          </> : ""
        }
        placement={placement}
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        classes={tooltipClass}
        enterDelay={1000} 
        // leaveDelay={1000}
      >
        {children}
      </Tooltip>
    </>
  );
};

export default ToolTip;
