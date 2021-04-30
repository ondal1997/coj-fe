import React from 'react';
import { Typography } from '@material-ui/core';

const defaultErrorMessages = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  500: 'Internal server error',
};

const Error = (props) => {
  const { status, message } = props.error;

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h2">{status || '😓'}</Typography>
      <Typography variant="h2">
        {message || defaultErrorMessages[status] || 'Uncaught error'}
      </Typography>
    </div>
  );
};

export default Error;
