import React from 'react';
import { Tooltip } from '@mui/material';

const MyTooltip = ({ children, ...props }) => {
  return (
    <Tooltip {...props}>
      <span> {children}</span>
    </Tooltip>
  );
};

export default MyTooltip;
