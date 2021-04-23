import React from 'react';
import { Container, Chip, TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledChipContainer = withStyles({
  root: {
    margin: '0',
    padding: '0',
    '& ul': {
      listStyle: 'none',
      padding: '0',
    },
    '& ul > li': {
      listStyle: 'none',
      display: 'inline',
      margin: '0.3%',
    },
  },
  maxWidthLg: {
    width: '100%',
  },
})(Container);

const StyledChip = withStyles({
  root: {
    '&:focus': {
      backgroundColor: '#4995F2',
    },
  },
})(Chip);

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

const Hashtags = ({ hashtags, updateHashtags }) => {
  const deleteHashtag = (i) => {
    const newHashtags = hashtags.filter((e, index) => index !== i);

    updateHashtags(newHashtags);
  };

  const onEnterInput = (e) => {
    const newHashtags = [...hashtags];
    if (e.target.value === '') return;
    newHashtags.push(e.target.value);
    updateHashtags(newHashtags);
    e.target.value = '';
  };

  return <Grid container direction='column' spacing={1}>
      <Grid item>
        <StyledTextField label='카테고리' variant='outlined' placeholder='카테고리 작성 후 엔터를 입력하세요.'
        onKeyPress={(e) => { if (e.charCode === 13) onEnterInput(e); }} />
      </Grid>
      <Grid item container direction='row'>
        <StyledChipContainer>
          <ul>
            {hashtags.map((hashtag, number) => <li>
              <StyledChip label={hashtag} color="primary"
              onDelete={() => deleteHashtag(number)}/>
            </li>)}
          </ul>
        </StyledChipContainer>
      </Grid>
    </Grid>;
};

export default Hashtags;