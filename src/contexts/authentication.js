import React, { useContext, useEffect, useState } from 'react';
import { pureFetchAndJson } from '../OurLink';
import ErrorContext from './error';

const AuthenticationContext = React.createContext(null);

const AuthenticationProvider = ({ children }) => {
  const [error, setError] = useContext(ErrorContext);
  const [userId, setUserId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      // result json 무결성 검사를 위한 방어적 코드는 생략
      let result;
      try {
        result = await pureFetchAndJson('/api/auth');
      } catch {
        setError({ message: 'Failed to connect with server' });
        return;
      }
      if (result.status !== 200) {
        setError({ status: result.status });
        return;
      }

      if (result.isAuthenticated) {
        setUserId(result.id);
      }
      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <AuthenticationContext.Provider value={[userId, setUserId]}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;

export { AuthenticationProvider };
