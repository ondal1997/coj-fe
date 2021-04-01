import React from 'react';
import styled from 'styled-components';
import Problem from './Problem';

const StyledProblemDetailApp = styled.div`
  width: 100%;
`;

const ProblemDetailApp = ({ history, match }) => <StyledProblemDetailApp>
      <Problem problemKey={match.params.problemKey} history={history}/>
      </StyledProblemDetailApp>;

export default ProblemDetailApp;