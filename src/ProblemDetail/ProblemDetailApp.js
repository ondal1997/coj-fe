import React from 'react';
import styled from 'styled-components';
import Problem from './Problem';

const StyledProblemDetailApp = styled.div`
  width: 100%;
`;

const ProblemDetailApp = ({ match }) => <StyledProblemDetailApp>
      <Problem problemKey={match.params.problemKey} />
      </StyledProblemDetailApp>;

export default ProblemDetailApp;