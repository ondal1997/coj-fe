import React from 'react';
import { TableRow, TableCell, Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Category from './Category';

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
  },
})(TableCell);

const ProblemItem = ({ info }) => (
  <>
  <TableRow>
  <StyledTableCell align="center">{info.key}</StyledTableCell>
    <StyledTableCell align="center">
      <Link to={`/problemDetail/${info.key}`} style={{ textDecoration: 'none' }}>
     {info.title}
      </Link>
    {info.categories.map((item) => <Category name={item} />)}
    </StyledTableCell>
    <StyledTableCell align="center">
      <Link to={`/solutions/${info.key}`} style={{ textDecorationLine: 'none' }}>
        <StyledButton>GO!</StyledButton>
      </Link>
    </StyledTableCell>
  </TableRow>
  </>
);

export default ProblemItem;