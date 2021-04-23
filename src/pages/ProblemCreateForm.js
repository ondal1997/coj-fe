import React, { useEffect, useState } from 'react';
import { fetchAndJson } from '../OurLink';
import Error from '../Error/Error';
import _handleFetchRes from '../Error/utils';
import ProblemForm from '../templates/ProblemForm';

const ProblemCreateForm = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [problem, setProblem] = useState({});
  const [error, setError] = useState(null);

  const fetchProblem = async (data) => {
    const result = await fetchAndJson('/api/problems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log(result);

    _handleFetchRes(result.status, setError, () => {
      props.history.push('/problems');
    });
  };

  useEffect(async () => {
    const loginData = await fetchAndJson('/api/auth');
    console.log(loginData);
    if (!loginData.isAuthenticated) {
      window.location.replace('https://codersit.co.kr/bbs/login.php?url=%2Foj/new');
      return;
    }
    setProblem({
      title: '',
      description: '',
      categories: [],
      timeLimit: 2000,
      memoryLimit: 512,
      examples: [],
      testcases: [],
      inputDescription: '',
      outputDescription: '',
    });
    setIsLoaded(true);
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

export default ProblemCreateForm;