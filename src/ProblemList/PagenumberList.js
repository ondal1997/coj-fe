import React from 'react';
import { Container, Button, withStyles } from '@material-ui/core';
import _ from 'lodash';
import PageKey from './PageKey';

const StyledContainer = withStyles({
  root: {
    textAlign: 'center',
  },
})(Container);

const StyledPageButton = withStyles({
  root: {
    color: 'black',
    backgroundColor: 'white',
    margin: '1%',
    padding: '1%',
    fontSize: 'medium',
  },
})(Button);

const StyledCurPageButton = withStyles({
  root: {
    color: 'white',
    backgroundColor: 'black',
    margin: '1%',
    padding: '1%',
    fontSize: 'medium',
    '&:hover': {
      backgroundColor: '#000000',
    },
  },
})(Button);

const PagenumberList = ({ curPage, totalPage, updatePage }) => {
  const onMovepage = (page) => {
    if (page === 0 || page === totalPage + 1) return;
    updatePage(page);
  };

  return <StyledContainer>
    <PageKey direction='prev' curPage={curPage} onClick={onMovepage}/>
    {_.range(1, totalPage + 1).map((n) => {
      if (n === curPage) { return <StyledCurPageButton>{n}</StyledCurPageButton>; }
      return <StyledPageButton onClick={() => onMovepage(n)}>{n}</StyledPageButton>;
    })}
    <PageKey direction='next' curPage={curPage} onClick={onMovepage}/>
  </StyledContainer>;
};

export default PagenumberList;