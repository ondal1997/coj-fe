import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const StyledTextField = withStyles({
  root: {
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

const MyTextField = ({ name, label, fullWidth, margin, type,
  defaultValue, variant, row, maxRow, multiline, value, handleChange, inputRef, InputProps }) => (
  <StyledTextField name={name}
    label={label}
    fullWidth={fullWidth}
    margin={margin}
    type={type}
    defaultValue={defaultValue}
    variant={variant}
    row={row}
    maxRow={maxRow}
    multiline={multiline}
    value={value}
    onChange={handleChange}
    inputRef={inputRef}
    InputProps={InputProps}
  />
);

export default MyTextField;