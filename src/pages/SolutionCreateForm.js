import React, { useEffect, useState } from 'react';
import { fetchAndJson } from '../OurLink';
import Error from '../Error/Error';
import _handleFetchRes from '../Error/utils';
import SolutionForm from '../templates/SolutionForm';

const SolutionCreateForm = (props) => {
  const { problemKey } = props.match.params;
  const { history } = props;

  const [problem, setProblem] = useState({});
  const [solution, setSolution] = useState({});
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchLanguages = async () => {
    const result = await fetchAndJson('/api/availableLanguages');
    _handleFetchRes(result.status, setError, () => {
      setLanguages(result.availableLanguages);
    });
  };

  const fetchProblem = async () => {
    const result = await fetchAndJson(`/api/problems/${problemKey}`);

    _handleFetchRes(result.status, setError, () => {
      setProblem(result.problem);
      setIsLoaded(true);
    });
  };

  const fetchJudgeResult = async (solutionKey, updateOpen, updateProgress) => {
    const result = await fetchAndJson(`/api/solutions/${solutionKey}`);
    const { testcaseHitCount, testcaseSize } = result.solution;
    updateProgress((testcaseHitCount / testcaseSize) * 100);

    if (result.solution.state > 1) {
      setTimeout(() => {
        updateOpen(false);
        history.push(`/solutions?problemNo=${problem.key}&page=1`);
      }, 2000);
    } else {
      setTimeout(() => { fetchJudgeResult(solutionKey, updateOpen, updateProgress); }, 16);
    }
  };

  const fetchSolution = async (data, updateSubmitting, updateOpen, updatProgress) => {
    updateSubmitting(true);

    const result = await fetchAndJson('/api/solutions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    _handleFetchRes(result.status, setError, () => {
      updateSubmitting(false);
      updateOpen(true);
      fetchJudgeResult(result.solution.key, updateOpen, updatProgress);
    });
  };

  useEffect(() => {
    (async () => {
      const loginData = await fetchAndJson('/api/auth');
      console.log(loginData);
      if (!loginData.isAuthenticated) {
        window.location.replace(`https://codersit.co.kr/bbs/login.php?url=%2Foj/submit/${problemKey}`);
        return;
      }
      // 풀이 수정 시 solution정보만 추가적으로 fetch해오면 됨.
      // solution전달 시, 최초 제출할 때는 빈 값을 전달하고
      // 재제출 할 때는 채워진 데이터 전달 + 추가로, 재제출 시, query string으로 solution id함께 전달 받는다.
      // ex)
      // setSolution({
      // key: 340846,
      // problemKey,
      // language: 'python3',
      // sourceCode: '이거슨 파이썬 코드!!!',
      // });
      setSolution({
        key: null,
        problemKey,
        language: '',
        sourceCode: '',
      });
      fetchLanguages();
      fetchProblem();
      // setSolution 관련은 나중에
    })();
  }, []);

  if (error) {
    return <Error error={error} />;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (<SolutionForm problem={problem} solution={solution} languages={languages}
            fetchSolution={fetchSolution} />);
};

export default SolutionCreateForm;
