import React from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledContainer = withStyles({
  root: {
    margin: '0 auto',
    padding: '0.5% 0%',
    display: 'flex',
    justifyContent: 'space-between',
    '& .area-container': {
      padding: '0 0',
      width: '500px',
    },
  },
  maxWidthLg: {
    width: '100%',
  },
})(Container);

const StyledButton = withStyles({
  root: {
    color: 'white',
    backgroundColor: 'black',
    left: '86%',
    margin: '1%',
    padding: '1%',
    fontSize: 'medium',
    '&:hover': {
      backgroundColor: '#CE2727',
    },
  },
})(Button);

const StyledDeleteButton = withStyles({
  root: {
    color: 'gray',
    padding: '0 0',
    left: '96.5%',
    fontSize: 'medium',
    '&:hover': {
      color: 'black',
      backgroundColor: 'white',
    },
  },
})(Button);

const StyledTextField = withStyles({
  root: {
    width: '100%',
    marginTop: '1%',
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

const Testcases = ({ testcases, updateTestcases }) => {
  const onChangeInput = (e, i) => {
    const newTestcases = [...testcases];
    newTestcases[i][e.target.name] = e.target.value;
    updateTestcases(newTestcases);
  };

  const onClickDeleteItem = (i) => {
    if (testcases.length === 1) return;
    const newTestcases = testcases.filter((e, index) => index !== i);
    updateTestcases(newTestcases);
  };

  const addTestcase = () => {
    const newTestcases = [...testcases];
    newTestcases.push({
      input: '',
      output: '',
    });
    updateTestcases(newTestcases);
  };

  return <>
 {testcases.map((testcase, number) => <>
  <StyledContainer key={number + 1} fullWidth>
       <div className='area-container'>
        <div>
          테스트케이스 입력 {number + 1}
        </div>
          <StyledTextField name="input"
          variant='outlined' row={5} maxRow={Infinity} multiline
          value={testcase.input} onChange={(event) => onChangeInput(event, number)}
          />
        </div>
        <div className='area-container'>
          <div>
          테스트케이스 출력 {number + 1}
          </div>
          <StyledTextField name="output"
          variant='outlined' row={5} maxRow={Infinity} multiline
          value={testcase.output} onChange={(event) => onChangeInput(event, number)}
          />
        </div>
      </StyledContainer>
      <StyledDeleteButton onClick={() => onClickDeleteItem(number)}>✖</StyledDeleteButton>
      </>)}
      <div>
        <StyledButton onClick={addTestcase}>테스트케이스 추가</StyledButton>
      </div>
  </>;
};

export default Testcases;