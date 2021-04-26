import React from 'react';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

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

const DeleteButton = ({ onClick }) => (<StyledDeleteButton onClick={onClick}>
  ✖</StyledDeleteButton>);

export default DeleteButton;