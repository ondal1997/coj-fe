import React, { useEffect, useState } from 'react';
import { Container, Paper, Chip, Divider, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import { OurLink, ourFetchAndJson } from '../OurLink';
import { insertNextline } from './utils';
import './reset.css';

const serverAddress = 'http://192.168.0.100:3000';

const pColor = '#ECECED';

const StyledProblem = styled.div`
  padding: 2%;
  background-color: white;
`;

const StyledExampleContainer = styled.div`
  font-size: larger;
  display: flex;
  justify-content: space-between;
`;

const StyledItemTitle = styled.span`
  font-weight: 700;
  font-size: 23px;
`;

const StyledChipContainer = withStyles({
  root: {
    padding: '0',
    '& ul': {
      listStyle: 'none',
      padding: '0',
    },
    '& ul > li': {
      listStyle: 'none',
      display: 'inline',
      margin: '0.3%',
    },
    display: 'inline',
  },
})(Container);

const StyledChip = withStyles({
  root: {
    fontSize: 'medium',
    backgroundColor: '#4995F2',
    '&:focus': {
      backgroundColor: '#4995F2',
    },
  },
  colorPrimary: {
  },
})(Chip);

const StyledDivider = withStyles({
  root: {
    margin: '1% 0',
  },
})(Divider);

const StyledLimitPaper = withStyles({
  root: {
    backgroundColor: pColor,
    width: '150px',
    margin: '1%',
    textAlign: 'center',
    display: 'inline-block',
  },
  elevation: 1,
})(Paper);

const StyledExamplePaper = withStyles({
  root: {
    backgroundColor: pColor,
    padding: '5%',
    margin: '2% 0',
  },
  elevation: 2,
})(Paper);

const Problem = (props) => {
  const problemKey = props.problemKey || 1009; // 임시

  const [problem, setProblem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchProblem = async () => {
    console.log(problemKey);
    try {
      const fetchedProblem = await ourFetchAndJson(`${serverAddress}/api/problems/${problemKey}`);

      setProblem(fetchedProblem);
      setIsLoaded(true);
      insertNextline();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  return (isLoaded ? (
    <StyledProblem>
  <div>
    <span style={{ fontSize: '50px' }}>
      {`${problemKey}번 ${problem.title}`}
    </span>
  <OurLink to={`/solutionForm/${problemKey}/${problem.title}`}>
    <span style={{ color: '#4995F2', fontSize: 'larger', float: 'right' }}>
    문제 풀러가기
    </span>
  </OurLink>
    <StyledChipContainer>
        <ul>
          {problem.categories.map((category) => <li><StyledChip label={category} color="primary"/></li>)}
        </ul>
    </StyledChipContainer>
    <StyledDivider />
    <div>
      <StyledLimitPaper>
      <div>
        <StyledItemTitle>시간제한&nbsp;</StyledItemTitle>
      </div>
      <div>
        {`${problem.timeLimit / 1000}초`}
      </div>
      </StyledLimitPaper>
      <StyledLimitPaper>
      <div>
        <StyledItemTitle>메모리제한&nbsp;</StyledItemTitle>
      </div>
      <div>
      {`${problem.memoryLimit}MB`}
      </div>
      </StyledLimitPaper>
    </div>
  </div>
  <div>
  <StyledDivider />
  <StyledItemTitle>문제 설명&nbsp;</StyledItemTitle>
  <div style={{ fontSize: '20px' }}>
  <Paper className='texts' elevation={2} style={{ backgroundColor: pColor, padding: '1%', marginTop: '1%' }}>
    {problem.description}
  </Paper>
  </div>
  </div>
  <StyledDivider />
  <div style={{ margin: '2% 0' }}>
  {problem.examples.map((example, index) => <StyledExampleContainer>
  <div style={{ width: '45%' }}>
    <div>
    <StyledItemTitle>예제 입력 {index + 1}</StyledItemTitle>
    </div>
    <StyledExamplePaper className='texts'>
    {example.input}
    </StyledExamplePaper>
    <div style={{ wordBreak: 'break-word' }}>
    </div>
  </div>
  <div style={{ width: '45%' }}>
    <div>
    <StyledItemTitle>예제 출력 {index + 1}</StyledItemTitle>
    </div>
    <StyledExamplePaper className='texts'>
      {example.output}
    </StyledExamplePaper>
  </div>
  </StyledExampleContainer>)}
  </div>
  </StyledProblem>
  ) : (
    <div>Loading...</div>
  ));
};

export default Problem;