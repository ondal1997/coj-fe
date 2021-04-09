import React from 'react';
import { Container, Chip, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledChipContainer = withStyles({
  root: {
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
    backgroundColor: '#4995F2',
    '&:focus': {
      backgroundColor: '#4995F2',
    },
  },
  colorPrimary: {
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

  return <div>
      <StyledTextField label='카테고리' variant='outlined' placeholder='카테고리 작성 후 엔터를 입력하세요.'
      onKeyPress={(e) => { if (e.charCode === 13) onEnterInput(e); }} />
    <StyledChipContainer>
      <ul>
        {hashtags.map((hashtag, number) => <li><StyledChip label={hashtag} color="primary"
        onDelete={() => deleteHashtag(number)}/>
        </li>)}
      </ul>
    </StyledChipContainer>
    </div>;
};

export default Hashtags;