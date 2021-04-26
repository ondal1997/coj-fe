import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import errorMessage from './errorMessage';

const Error = (props) => {
  const { status } = props.error;
  return (<Grid style={{ textAlign: 'center' }}>
      <Typography variant='h2'>
        {status === -1 ? '😓' : status}
      </Typography>
      <Typography variant='h2'>
        {(() => {
          let msg;
          errorMessage.some(({ statusCode, message }) => {
            msg = message;
            return (status === statusCode);
          });
          return msg;
        })()
        }
      </Typography>
  </Grid>);
};

export default Error;