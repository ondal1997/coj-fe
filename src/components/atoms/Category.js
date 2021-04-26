import React from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const StyledChip = withStyles({
  root: {
    '&:focus': {
      backgroundColor: '#4995F2',
    },
  },
})(Chip);

const Category = ({ category, handleDelete }) => (
  <StyledChip label={category} color="primary"
    onDelete={handleDelete} />);

export default Category;