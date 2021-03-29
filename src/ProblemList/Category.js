import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const StyledChip = withStyles({
  root: {
    margin: '0.5%',
    backgroundColor: '#4995F2',
    '&:focus': {
      backgroundColor: '#4995F2',
    },
  },
  colorPrimary: {
  },
})(Chip);

const Category = (({ name }) => (<StyledChip label={`#${name}`} color="primary" />));

export default Category;