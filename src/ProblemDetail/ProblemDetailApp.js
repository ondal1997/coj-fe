import React from 'react';
import styled from 'styled-components';
import Problem from './Problem';

const StyledProblemDetailApp = styled.div`
  border: 1px solid black;
  width: 100%;
  background-color: black;
`;

const ProblemDetailApp = ({ match }) => <StyledProblemDetailApp>
      <Problem problemKey={match.params.problemKey}/>
      </StyledProblemDetailApp>;

export default ProblemDetailApp;