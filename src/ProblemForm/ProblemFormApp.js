import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField, Divider, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { isValid } from './utils';
import Testcases from './Testcases';
import Examples from './Examples';
import Hashtags from './Hashtags';
import MyEditor from './MyEditor';
import { fetchAndJson } from '../OurLink';
import './reset.css';

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

const StyledDivider = withStyles({
  root: {
    margin: '1% 0',
  },
})(Divider);

const Form = (props) => {
  const [inputs, setInputs] = useState({
    title: '',
    timeLimit: '2000',
    memoryLimit: '512',
  });

  const [isLoaded, setIsLoaded] = useState(false);

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
    console.log(description);
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

    await fetchAndJson('/api/problems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    props.history.push('/problems');
  };

  useEffect(async () => {
    const loginData = await fetchAndJson('/api/auth');
    console.log(loginData);
    if (!loginData.isAuthenticated) {
      window.location.href = 'https://codersit.co.kr/bbs/login.php?url=%2Foj/new/';
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
  <Grid container style={{ padding: '10% 15%' }}>
    <Grid container item direction='column' spacing={1}>
      <Grid item>
          <StyledTextField
            name='title'
            label='문제명'
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(event) => onChange(event)} inputRef={inputsRef.current[0]} />
      </Grid>
      <Grid container item direction='row' spacing={2}>
        <Grid item>
          <StyledTextField
          name='timeLimit'
          label='시간 제한 (ms)'
          margin="normal"
          type="number"
          variant="outlined"
          defaultValue={timeLimit}
          onChange={(event) => onChange(event)} inputRef={inputsRef.current[1]} />
        </Grid>
        <Grid item>
          <StyledTextField
          name='memoryLimit'
          label='메모리 제한 (MB)'
          margin="normal"
          type="number"
          variant="outlined"
          defaultValue={memoryLimit}
          onChange={(event) => onChange(event)} inputRef={inputsRef.current[2]} />
        </Grid>
      </Grid>
      <Grid item style={{ margin: '2% 0' }}>
        <p>문제 설명</p>
        <MyEditor value={description} onChange={(res) => { setDescription(res); }} />
      </Grid>
      <Grid item style={{ margin: '2% 0' }}>
        <p>입력 형식 설명(선택)</p>
        <MyEditor value={inputDescription} onChange={(res) => { setInputDescription(res); }} />
      </Grid>
      <Grid item style={{ margin: '2% 0' }}>
        <p>출력 형식 설명(선택)</p>
        <MyEditor value={outputDescription} onChange={(res) => { setOutputDescription(res); }} />
      </Grid>
      <Grid item>
        <Hashtags hashtags={hashtags} updateHashtags={setHashtags}/>
      </Grid>
      <Grid item>
        <Examples examples={examples} updateExamples={setExamples}/>
      </Grid>
      <Grid item>
        <Testcases testcases={testcases} updateTestcases={setTestcases} />
      </Grid>
      <Grid item>
        <StyledDivider variant="fullWidth"/>
      </Grid>
      <Grid item style={{ marginTop: '2%', textAlign: 'right' }}>
        <StyledButton onClick={() => submit()}>확인</StyledButton>
      </Grid>
    </Grid>
  </Grid>
  );
};

export default Form;