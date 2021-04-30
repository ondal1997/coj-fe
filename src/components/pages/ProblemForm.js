import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { Divider, Grid, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchAndJson } from '../../OurLink';
import Error from '../atoms/Error';
import { isProblemInputValid, _handleFetchRes } from '../../utils';
import '../../css/reset.css';
import Testcases from '../organisms/Testcases';
import Examples from '../organisms/Examples';
import Categories from '../organisms/Categories';
import MyEditor from '../atoms/MyEditor';
import BasicButton from '../atoms/BasicButton';
import TextField from '../atoms/TextField';
import PageTemplate from '../templates/PageTemplate';

const StyledDivider = withStyles({
  root: {
    margin: '1% 0',
  },
})(Divider);

const ProblemForm = (props) => {
  const { problemKey } = props.match.params;
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState(2000);
  const [memoryLimit, setMemoryLimit] = useState(512);

  const [description, setDescription] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [outputDescription, setOutputDescription] = useState('');

  const [examples, setExamples] = useState([]);
  const [testcases, setTestcases] = useState([]);

  const [categories, setCategories] = useState([]);

  const inputsRef = useRef([]);

  const [disabled, setDisabled] = useState(false);

  inputsRef.current = _.range(0, 3).map((index) => {
    inputsRef.current[index] = useRef(null);
    return inputsRef.current[index];
  });

  const fetchProblem = async (data) => { // 등록 수정 분기
    let url = '/api/problems';
    let method = '';
    if (problemKey !== undefined) {
      method = 'PUT';
      url += `/${problemKey}`;
    } else method = 'POST';

    const result = await fetchAndJson(`${url}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    _handleFetchRes(result.status, setError, () => {
      props.history.push('/problems');
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') setTitle(value);
    else if (name === 'timeLimit') setTimeLimit(value);
    else setMemoryLimit(value);
  };

  const handleSubmit = async () => {
    let valid = true;
    inputsRef.current.every(({ current }) => { // 유효 X가 하나라도 있으면 종료
      const { name, value } = current;
      const res = isProblemInputValid(name, value);
      if (!res) {
        valid = false;
        current.focus();
      }
      return res;
    });

    if (!valid) return;

    examples.every((example) => {
      if (example.input === '' || example.output === '') {
        alert('예제의 누락된 필드를 확인해주세요.');
        valid = false;
        return valid;
      }
      return true;
    });

    if (!valid) return;

    testcases.every((testcase) => {
      if (testcase.input === '' || testcase.output === '') {
        valid = false;
        alert('테스트케이스의 누락된 필드를 확인해주세요.');
        return valid;
      }
      return true;
    });

    if (!valid) return;

    if (testcases.length === 0) {
      alert('적어도 하나이상의 테스트케이스를 입력해야합니다. ');
      return;
    }

    setDisabled(true);

    const data = {
      title,
      description,
      categories: categories,
      timeLimit: Number(timeLimit),
      memoryLimit: Number(memoryLimit),
      examples,
      testcases,
      inputDescription,
      outputDescription,
    };

    fetchProblem(data);
  };

  useEffect(async () => {
    const loginData = await fetchAndJson('/api/auth');
    if (!loginData.isAuthenticated) {
      window.location.replace('https://codersit.co.kr/bbs/login.php?url=%2Foj/new');
      return;
    }

    if (problemKey === undefined) {
      setIsLoaded(true);
      return;
    }
    const result = await fetchAndJson(`/api/problems/${problemKey}/all`);
    const { status, problem } = result;
    _handleFetchRes(status, setError, () => {
      setTitle(problem.title);
      setTimeLimit(problem.timeLimit);
      setMemoryLimit(problem.memoryLimit);
      setDescription(problem.description);
      setInputDescription(problem.inputDescription);
      setOutputDescription(problem.outputDescription);
      setCategories(problem.categories);
      setExamples(problem.examples);
      setTestcases(problem.testcases);

      setIsLoaded(true);
    });
  }, []);

  if (error) {
    return <Error error={error} />;
  }

  return (<PageTemplate content={ !isLoaded
    ? (<Grid style={{ height: '100vh' }} container direction='row' justify='center' alignItems='center'>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>)
    : (<Grid container>
    <Grid container item direction='column' spacing={3}>
      <Grid item>
        <TextField
          name='title'
          label='문제명'
          fullWidth
          margin="normal"
          variant="outlined"
          value={title}
          handleChange={(event) => handleChange(event)} inputRef={inputsRef.current[0]} />
      </Grid>
      <Grid container item direction='row' spacing={2}>
        <Grid item>
          <TextField
            name='timeLimit'
            label='시간 제한 (ms)'
            margin="normal"
            variant="outlined"
            value={timeLimit}
            handleChange={(event) => handleChange(event)} inputRef={inputsRef.current[1]} />
        </Grid>
        <Grid item>
          <TextField
            name='memoryLimit'
            label='메모리 제한 (MB)'
            margin="normal"
            variant="outlined"
            value={memoryLimit}
            handleChange={(event) => handleChange(event)} inputRef={inputsRef.current[2]} />
        </Grid>
      </Grid>
      <Grid item>
        <p>문제 설명</p>
        <MyEditor value={description} onChange={(res) => { setDescription(res); }} />
      </Grid>
      <Grid item>
        <p>입력 형식 설명(선택)</p>
        <MyEditor value={inputDescription} onChange={(res) => { setInputDescription(res); }} />
      </Grid>
      <Grid item>
        <p>출력 형식 설명(선택)</p>
        <MyEditor value={outputDescription} onChange={(res) => { setOutputDescription(res); }} />
      </Grid>
      <Grid item>
        <Categories categories={categories} updateCategories={setCategories} />
      </Grid>
      <Grid item>
        <Examples examples={examples} updateExamples={setExamples} />
      </Grid>
      <Grid item>
        <Testcases testcases={testcases} updateTestcases={setTestcases} />
      </Grid>
      <Grid item>
        <StyledDivider variant="fullWidth" />
      </Grid>
      <Grid item style={{ marginTop: '2%', textAlign: 'right' }}>
        <BasicButton label='확인' variant='contained'
          disabled={disabled} handleClick={handleSubmit} />
      </Grid>
    </Grid>
  </Grid>)} />
  );
};

export default ProblemForm;