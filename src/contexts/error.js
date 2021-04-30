import React, { useState } from 'react';
import Error from '../components/pages/Error';

const ErrorContext = React.createContext(null);

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <ErrorContext.Provider value={[error, setError]}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;

export { ErrorProvider };
