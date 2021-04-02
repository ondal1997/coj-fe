import React from 'react';
import { TableRow, TableCell, Button, withStyles } from '@material-ui/core';
import Category from './Category';
import { OurLink } from '../OurLink';

const StyledButton = withStyles({
  root: {
    color: 'white',
    backgroundColor: 'black',
    margin: '1%',
    padding: '1%',
    fontSize: 'medium',
    '&:hover': {
      backgroundColor: '#CE2727',
    },
  },
})(Button);

const StyledTableCell = withStyles({
  root: {
    width: '200px',
    height: '40px',
    fontSize: '16px',
  },
})(TableCell);

const ProblemItem = ({ info }) => (
  <>
  <TableRow>
  <StyledTableCell align="center">{info.key}</StyledTableCell>
    <StyledTableCell align="center">
      <OurLink to={`/problem/${info.key}`} style={{ textDecoration: 'none' }}>
        <span style={{ color: '#000000' }}>
     {info.title}
     </span>
      </OurLink>
    {info.categories.map((item) => <Category name={item} />)}
    </StyledTableCell>
    <StyledTableCell align="center">
      <OurLink to={`/solutions/${info.key}/${info.title}/1`} style={{ textDecorationLine: 'none' }}>
        <StyledButton>GO!</StyledButton>
      </OurLink>
    </StyledTableCell>
  </TableRow>
  </>
);

export default ProblemItem;