import React from 'react';
import styled from 'styled-components';

const StyledCategory = styled.button`
  color: white;
  background-color: green;
`;

const Category = (({ name }) => (<StyledCategory>{name}</StyledCategory>));

export default Category;