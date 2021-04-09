import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    color: 'white',
    backgroundColor: 'black',
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
    minWidth: '0',
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

  return <Grid container direction='column' spacing={2}>
    {examples.map((example, number) => <>
      <Grid container item key={number + 1} direction='row' justify='space-between'>
        <Grid item sm={5}>
          <div>
           예제 입력 {number + 1}
          </div>
          <StyledTextField name="input"
          variant='outlined' row={5} maxRow={Infinity} multiline
          value={example.input} onChange={(e) => onChangeInput(e, number)}/>
        </Grid>
        <Grid item sm={5}>
          <div>
           예제 출력 {number + 1}
          </div>
          <StyledTextField name="output"
          variant='outlined' row={5} maxRow={Infinity} multiline
          value={example.output} onChange={(e) => onChangeInput(e, number)}/>
        </Grid>
        <Grid container direction='row' justify='flex-end'>
          <Grid item>
            <StyledDeleteButton onClick={() => onClickDeleteItem(number)}>
              ✖</StyledDeleteButton>
            </Grid>
        </Grid>
       </Grid>
      </>)}
      <Grid item style={{ textAlign: 'right' }}>
        <StyledButton onClick={addExample}>예제 추가</StyledButton>
      </Grid>
    </Grid>;
};

export default Examples;