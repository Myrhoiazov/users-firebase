import React from 'react';
import { Box } from '@mui/material';
import zxcvbn from 'zxcvbn';

const PasswordIndicator = ({ password }) => {
  const result = zxcvbn(password);

  const num = (result.score * 100) / 4;
  console.log('num: ', num);

  const progressColor = () => {
    switch (result.score) {
      case 0:
        return '#828282';

      case 1:
        return '#EA1111';

      case 2:
        return '#FFAD00';

      case 3:
        return '#9bc158';

      case 4:
        return '#00b500';

      default:
        return 'none';
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    backgroundColor: progressColor(),
    height: '5px',
  });

  return (
    <>
      <Box sx={{ height: '5px', width: '100%', backgroundColor: '#eff0eb' }}>
        <Box sx={changePasswordColor()}></Box>
      </Box>
    </>
  );
};

export default PasswordIndicator;
