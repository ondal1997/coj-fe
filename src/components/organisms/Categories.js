import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ChipContainer from '../molecules/ChipContainer';

const StyledTextField = withStyles({
  root: {
    marginTop: '1%',
    '& label.Mui-focused': {
      color: '#4995F2',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#4995F2',
      },
    },
  },
})(TextField);

const Categories = ({ categories, updateCategories }) => {
  const handleDeleteCategory = (i) => {
    const newCategories = categories.filter((e, index) => index !== i);

    updateCategories(newCategories);
  };

  const handleEnterInput = (e) => {
    const newCategories = [...categories];
    if (e.target.value === '') return;
    newCategories.push(e.target.value);
    updateCategories(newCategories);
    e.target.value = '';
  };

  return <Grid container direction='column'>
    <Grid item style={{ margin: '0.5% 0' }}>
      <StyledTextField label='카테고리' variant='outlined' placeholder='카테고리 작성 후 엔터를 입력하세요.'
        onKeyPress={(e) => { if (e.charCode === 13) handleEnterInput(e); }} />
    </Grid>
    <Grid item container direction='row' style={{ margin: '0.5% 0' }}>
      <ChipContainer categories={categories} handleDeleteCategory={handleDeleteCategory} />
    </Grid>
  </Grid>;
};

export default Categories;