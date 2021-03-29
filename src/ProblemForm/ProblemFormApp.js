import React, { useRef, useState } from 'react';
import { Container, Button, TextField, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { isValid } from './utils';
import Testcases from './Testcases';
import Examples from './Examples';
import Hashtags from './Hashtags';

// const serverAddress = 'http://192.168.0.13:3000';

const StyledForm = withStyles({
  root: {
    minHeight: '700px',
    backgroundColor: 'white',
    borderRadius: '15px',
    margin: '0 auto',
    padding: '2%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  maxWidthLg: {
    width: '100%',
  },
})(Container);

const StyledButton = withStyles({
  root: {
    color: 'white',
    backgroundColor: 'black',
    left: '94%',
    margin: '1%',
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

const Form = () => {
  const [inputs, setInputs] = useState({
    title: '',
    timeLimit: '',
    memoryLimit: '',
    desc: '',
  });

  const [examples, setExamples] = useState([
    {
      input: '',
      output: '',
    },
  ]);

  const [testcases, setTestcases] = useState([
    {
      input: '',
      output: '',
    },
  ]);

  const [hashtags, setHashtags] = useState([]);

  const { title, timeLimit, memoryLimit, desc } = inputs;

  const inputsRef = useRef([]);

  inputsRef.current = _.range(0, 4).map((index) => {
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

  const submit = () => {
    let valid = true;
    inputsRef.current.every(({ current }) => { // 유효 X가 하나라도 있으면 종료
      const { name, value } = current;
      const res = isValid(name, value);
      if (!res) {
        valid = false;
        current.focus();
        // style.borderColor = 'red';
        // setTimeout(() => { style.borderColor = 'black'; }, 3000);
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

    const data = {
      title,
      description: desc,
      categories: hashtags,
      timeLimit: Number(timeLimit),
      memoryLimit: Number(memoryLimit),
      examples,
      testcases,
    };

    alert('문제가 성공적으로 등록되었습니다.');
    console.log(data);
    // fetch(`${serverAddress}/api/problems`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // }).then((res) => console.log(`server got new problem... ${res.status}`));
  };

  return (
    <StyledForm>
    <div>
    <StyledTextField
      name='title'
      label='문제명'
      fullWidth
      margin="normal"
      variant="outlined"
      onChange={(event) => onChange(event)} inputRef={inputsRef.current[0]} />
      <StyledTextField
      name='timeLimit'
      label='시간 제한'
      margin="normal"
      variant="outlined"
      style={{ marginRight: '1%' }}
      onChange={(event) => onChange(event)} inputRef={inputsRef.current[1]} />
      <StyledTextField
      name='memoryLimit'
      label='메모리 제한'
      margin="normal"
      variant="outlined"
      onChange={(event) => onChange(event)} inputRef={inputsRef.current[2]} />
      <StyledTextField
      name='description'
      label='설명'
      fullWidth
      margin="normal"
      variant="outlined"
      multiline
      rows={20}
      rowsMax={Infinity}
      onChange={(event) => onChange(event)} inputRef={inputsRef.current[3]} />
      <Hashtags hashtags={hashtags} updateHashtags={setHashtags}/>
      <Examples examples={examples} updateExamples={setExamples}/>
      <Testcases testcases={testcases} updateTestcases={setTestcases} />
      </div>
      <div>
      <StyledDivider variant="fullWidth"/>
      <StyledButton onClick={(event) => submit(event)}>확인</StyledButton>
      </div>
    </StyledForm>
  );
};

export default Form;