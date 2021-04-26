import React, { useEffect, useState } from 'react';
import { fetchAndJson } from '../OurLink';
import Error from '../Error/Error';
import _handleFetchRes from '../Error/utils';
import ProblemForm from '../templates/ProblemForm';

const ProblemUpdateForm = (props) => {
  const { problemKey } = props.match.params;
  const [isLoaded, setIsLoaded] = useState(false);
  const [problem, setProblem] = useState({});
  const [error, setError] = useState(null);

  const fetchProblem = async (data) => {
    const result = await fetchAndJson(`/api/problems/${problemKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    _handleFetchRes(result.status, setError, () => {
      props.history.push('/problems');
    });
    return result;
  };

  useEffect(async () => {
    const loginData = await fetchAndJson('/api/auth');
    console.log(loginData);
    if (!loginData.isAuthenticated) {
      window.location.replace('https://codersit.co.kr/bbs/login.php?url=%2Foj/new');
      return;
    }
    const result = await fetchAndJson(`/api/problems/${problemKey}/all`);
    _handleFetchRes(result.status, setError, () => {
      setProblem(result.problem);
      setIsLoaded(true);
    });
  }, []);

  if (error) {
    return <Error error={error} />;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <ProblemForm problem={problem} handleSubmit={fetchProblem} />
  );
};

export default ProblemUpdateForm;