import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField, Divider, Grid } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { isValid } from './utils';
import Testcases from './Testcases';
import Examples from './Examples';
import Hashtags from './Hashtags';
import MyEditor from './MyEditor';
import { fetchAndJson } from '../OurLink';
import Error from '../Error/Error';
import './reset.css';
import _handleFetchRes from '../Error/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      margin: '0 0',
      padding: '0 1%',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 0',
      padding: '0 15%',
    },
  },
  children: {
    [theme.breakpoints.down('xs')]: {
      margin: '1% 0',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '1% 0',
    },
  },
}));

const StyledButton = withStyles({
  root: {
    color: 'white',
    backgroundColor: 'black',
    padding: '1%',
    '&:hover': {
      backgroundColor: '#CE2727',
    },
  },
  label: {
    fontSize: '17px',
  },
})(Button);

const StyledTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#4995F2',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#4995F2',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#4995F2',
      },
    },
  },
})(TextField);

const Form = (props) => {
  const classes = useStyles();

  const { problemKey } = props.match.params;
  const [isLoaded, setIsLoaded] = useState(false);
  const [problem, setProblem] = useState({});
  const [inputs, setInputs] = useState({
    title: '',
    timeLimit: '2000',
    memoryLimit: '512',
  });
  const [description, setDescription] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [outputDescription, setOutputDescription] = useState('');
  const [examples, setExamples] = useState([
    {
      input: '',
      output: '',
    },
  ]);
  const [testcases, setTestcases] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [error, setError] = useState(null);

  const { title, timeLimit, memoryLimit } = inputs;

  const inputsRef = useRef([]);

  inputsRef.current = _.range(0, 3).map((index) => {
    inputsRef.current[index] = useRef(null);
    return inputsRef.current[index];
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submit = async () => {
    let valid = true;
    inputsRef.current.every(({ current }) => { // 유효 X가 하나라도 있으면 종료
      const { name, value } = current;
      const res = isValid(name, value);
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

    const data = {
      title,
      description,
      categories: hashtags,
      timeLimit: Number(timeLimit),
      memoryLimit: Number(memoryLimit),
      examples,
      testcases,
      inputDescription,
      outputDescription,
    };

    // update method
    // 수정 시 정상적으로 연결 중인지도 같이 응답받고,
    // 로그인이 필요하면 로그인 창으로 이동
    const result = await fetchAndJson(`/api/problems/${problemKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    _handleFetchRes(result.status, setError, () => {
      props.history.push('/problems');
    });
  };

  useEffect(async () => {
    if (isLoaded) {
      inputsRef.current[0].current.value = problem.title;
      inputsRef.current[1].current.value = problem.timeLimit;
      inputsRef.current[2].current.value = problem.memoryLimit;
      setInputs({
        title: problem.title,
        timeLimit: problem.timeLimit,
        memoryLimit: problem.memoryLimit,
      });
      setDescription(problem.description);
      setInputDescription(problem.inputDescription || '');
      setOutputDescription(problem.outputDescription || '');
      setHashtags(problem.categories);
      setExamples(problem.examples);
      setTestcases(problem.testcases);
    } else {
      const result = await fetchAndJson(`/api/problems/${problemKey}/all`);
      console.log(result);

      _handleFetchRes(result.status, setError, () => {
        setIsLoaded(true);
        setProblem(result.problem);
      });
    }
  }, [problem]);

  if (error) {
    return <Error error={error} />;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
  <Grid className={classes.root} container>
    <Grid container item direction='column'>
      <Grid className={classes.children} item>
          <StyledTextField
            name='title'
            label='문제명'
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(event) => onChange(event)} inputRef={inputsRef.current[0]} />
      </Grid>
      <Grid className={classes.children} container item>
        <Grid container item justify="space-between" xs={5}>
          <StyledTextField
          name='timeLimit'
          label='시간 제한 (ms)'
          type="number"
          variant="outlined"
          defaultValue={timeLimit}
          onChange={(event) => onChange(event)} inputRef={inputsRef.current[1]} />
          <StyledTextField
          name='memoryLimit'
          label='메모리 제한 (MB)'
          type="number"
          variant="outlined"
          defaultValue={memoryLimit}
          onChange={(event) => onChange(event)} inputRef={inputsRef.current[2]} />
        </Grid>
      </Grid>
      <Grid className={classes.children} item>
        <p>문제 설명</p>
        <MyEditor value={description} onChange={(res) => { setDescription(res); }} />
      </Grid>
      <Grid className={classes.children} item>
        <p>입력 형식 설명(선택)</p>
        <MyEditor value={inputDescription} onChange={(res) => { setInputDescription(res); }} />
      </Grid>
      <Grid className={classes.children} item>
        <p>출력 형식 설명(선택)</p>
        <MyEditor value={outputDescription} onChange={(res) => { setOutputDescription(res); }} />
      </Grid>
      <Grid className={classes.children} item>
        <Hashtags hashtags={hashtags} updateHashtags={setHashtags}/>
      </Grid>
      <Grid className={classes.children} item>
        <Examples examples={examples} updateExamples={setExamples}/>
      </Grid>
      <Grid className={classes.children} item>
        <Testcases testcases={testcases} updateTestcases={setTestcases} />
      </Grid>
      <Grid className={classes.children} item>
        <Divider variant="fullWidth"/>
      </Grid>
      <Grid className={classes.children} item style={{ textAlign: 'right' }}>
        <StyledButton onClick={(event) => submit(event)}>확인</StyledButton>
      </Grid>
    </Grid>
  </Grid>
  );
};

export default Form;