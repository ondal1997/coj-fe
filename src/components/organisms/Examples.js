import React from 'react';
import Grid from '@material-ui/core/Grid';
import Example from '../molecules/Example';
import BasicButton from '../atoms/BasicButton';

const Examples = ({ examples, updateExamples }) => {
  const handleChangeInput = (e, i) => {
    const newExamples = [...examples];
    newExamples[i][e.target.name] = e.target.value;
    updateExamples(newExamples);
  };

  const handleClickDeleteItem = (i) => {
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

  return (<Grid container direction='column' spacing={2}>
    {examples.map((example, index) => <Example example={example} index={index}
      handleChangeInput={(event) => { handleChangeInput(event, index); }}
      handleClickDeleteItem={() => { handleClickDeleteItem(index); }} />)}
    <Grid item style={{ textAlign: 'right' }}>
      <BasicButton label='예제 추가' handleClick={addExample} />
    </Grid>
  </Grid>);
};

export default Examples;