import React, { useEffect, useRef, useState } from 'react';
import { Divider, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import '../components/reset.css';
import { isProblemInputValid } from '../utils';
import Testcases from '../components/organisms/Testcases';
import Examples from '../components/organisms/Examples';
import Categories from '../components/organisms/Categories';
import MyEditor from '../components/atoms/MyEditor';
import BasicButton from '../components/atoms/BasicButton';
import TextField from '../components/atoms/TextField';

const StyledDivider = withStyles({
  root: {
    margin: '1% 0',
  },
})(Divider);

const Form = ({ problem, handleSubmit }) => {
  const [inputs, setInputs] = useState({
    title: problem.title,
    timeLimit: problem.timeLimit,
    memoryLimit: problem.memoryLimit,
  });
  const [description, setDescription] = useState(problem.description);
  const [inputDescription, setInputDescription] = useState(problem.inputDescription);
  const [outputDescription, setOutputDescription] = useState(problem.outputDescription);

  const [examples, setExamples] = useState(problem.examples);

  const [testcases, setTestcases] = useState(problem.testcases);

  const [categories, setCategories] = useState(problem.categories);

  const { title, timeLimit, memoryLimit } = inputs;

  const inputsRef = useRef([]);

  const [disabled, setDisabled] = useState(false);

  inputsRef.current = _.range(0, 3).map((index) => {
    inputsRef.current[index] = useRef(null);
    return inputsRef.current[index];
  });

  const handleChange = (event) => {
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

    handleSubmit(data);
  };

  useEffect(() => {
    inputsRef.current[0].current.value = problem.title;
    inputsRef.current[1].current.value = problem.timeLimit;
    inputsRef.current[2].current.value = problem.memoryLimit;
  }, []);

  return (
    <Grid container>
      <Grid container item direction='column' spacing={3}>
        <Grid item>
          <TextField
            name='title'
            label='문제명'
            fullWidth
            margin="normal"
            variant="outlined"
            handleChange={(event) => handleChange(event)} inputRef={inputsRef.current[0]} />
        </Grid>
        <Grid container item direction='row' spacing={2}>
          <Grid item>
            <TextField
              name='timeLimit'
              label='시간 제한 (ms)'
              margin="normal"
              type="number"
              variant="outlined"
              defaultValue={timeLimit}
              handleChange={(event) => handleChange(event)} inputRef={inputsRef.current[1]} />
          </Grid>
          <Grid item>
            <TextField
              name='memoryLimit'
              label='메모리 제한 (MB)'
              margin="normal"
              type="number"
              variant="outlined"
              defaultValue={memoryLimit}
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
            disabled={disabled} handleClick={() => submit()} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Form;