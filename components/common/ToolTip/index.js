import React from 'react';
import { Tooltip } from '@mui/material';
import Fade from '@mui/material/Fade';

const ToolTip = ({ children, placement, title, image }) => {
  return (
    <>
      <Tooltip
        title={
          <>
            <div style={{ fontSize: '18px', padding: '10px', maxWidth: '150px', wordWrap: 'wrap' }}>
              {image && (
                <div>
                  <img src={image} alt="" />
                </div>
              )}
              <div>{title}</div>
              <div></div>
            </div>
          </>
        }
        placement={placement}
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}>
        {children}
      </Tooltip>
    </>
  );
};

export default ToolTip;
