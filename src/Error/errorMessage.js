const errorMessage = [
  {
    statusCode: 400,
    message: 'Bad Request',
  },
  {
    statusCode: 401,
    message: 'Unauthorized',
  },
  {
    statusCode: 403,
    message: 'Forbidden',
  },
  {
    statusCode: 404,
    message: 'Not found',
  },
  {
    statusCode: 500,
    message: 'Internal server error',
  },
  {
    statusCode: -1,
    message: 'Uncaught error',
  },
];

export default errorMessage;