import React from 'react';
import { Grid } from '@material-ui/core';
// import { serverAddress } from '../config';

const Error = (props) => {
  const { status } = props.error;
  return (<Grid>
    {status}
  </Grid>);
};

export default Error;