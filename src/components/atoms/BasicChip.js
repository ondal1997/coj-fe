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

const BasicChip = ({ label, size, color, handleClick, handleDelete }) => (
  handleDelete ? (<StyledChip
    label={label}
    color={color}
    size={size}
    onDelete={handleDelete} />)
    : (<StyledChip
        label={label}
        color={color}
        size={size}
        onClick={handleClick} />)
);

export default BasicChip;