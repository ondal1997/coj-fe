import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const PageButton = styled.button`
  color: white;
  background-color: red;
`;

const PageAnchor = styled.a`
  color: black;
  margin: 1%;
`;

const PagenumberList = ({ curPage, problems, updateCurpage, updateProblems }) => (<>
  {_.range(1, problems.length / 5 - 1).map((n) => {
    if (n === curPage) { return <PageButton onClick={() => updateCurpage(n)}>{n}</PageButton>; }
    return <PageAnchor onClick={() => {
      updateProblems(problems.slice((n - 1) * 10, n * 10));
      updateCurpage(n);
    }}>{n}</PageAnchor>;
  })}
  </>
);

export default PagenumberList;