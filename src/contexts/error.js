import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Error from '../components/pages/Error';

const ErrorContext = React.createContext(null);

const ErrorProvider = ({ children }) => {
  const history = useHistory();

  const [error, setError] = useState(null);

  useEffect(() => {
    const unlisten = history.listen(() => {
      setError(null);
      window.scrollTo(0, 0);
    });

    return () => {
      unlisten();
    };
  }, [history]);

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
