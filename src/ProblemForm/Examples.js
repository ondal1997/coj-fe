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
    left: '91%',
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

const Examples = ({ examples, updateExamples }) => {
  const onChangeInput = (e, i) => {
    const newExamples = [...examples];
    newExamples[i][e.target.name] = e.target.value;
    updateExamples(newExamples);
  };

  const onClickDeleteItem = (i) => {
    if (examples.length === 1) return;
    const newExamples = examples.filter((e, index) => index !== i);
    updateExamples(newExamples);
  };

  const addExample = () => {
    const newExamples = [...examples];
    newExamples.push({
      input: '',
      output: '',
    });
    updateExamples(newExamples);
  };

  return <>
    {examples.map((example, number) => <>
      <StyledContainer key={number + 1} fullWidth>
        <div className='area-container'>
          <div>
           예제 입력 {number + 1}
          </div>
          <StyledTextField name="input"
          variant='outlined' row={5} maxRow={Infinity} multiline
          value={example.input} onChange={(e) => onChangeInput(e, number)}/>
        </div>
        <div className='area-container'>
          <div>
           예제 출력 {number + 1}
          </div>
          <StyledTextField name="output"
          variant='outlined' row={5} maxRow={Infinity} multiline
          value={example.output} onChange={(e) => onChangeInput(e, number)}/>
        </div>
       </StyledContainer>
      <StyledDeleteButton onClick={() => onClickDeleteItem(number)}>✖</StyledDeleteButton>
      </>)}
    <div>
      <StyledButton onClick={addExample}>예제 추가</StyledButton>
    </div>
    </>;
};

export default Examples;