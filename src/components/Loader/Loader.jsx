import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => {
  return (
    <Backdrop
      open={true}
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 3 }}
    >
      <CircularProgress color="grey" />
    </Backdrop>
  );
};

export default Loader;
