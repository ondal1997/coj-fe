import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { OurLink, ourFetchAndJson } from '../OurLink';

const serverAddress = 'http://192.168.0.100:3000';

const StyledProblem = styled.div`
  width: 100%;
  padding: 3%;
  background-color: pink;
`;

const StyledExampleContainer = styled.div`
  font-size: larger;
  width: 45%;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;

const StyledTextField = styled.input`
  height: 50px;
`;

const Problem = ({ problemKey }) => {
  const [problem, setProblem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchProblem = async () => {
    console.log(problemKey);
    try {
      const fetchedProblem = await ourFetchAndJson(`${serverAddress}/api/problems/${problemKey}`);

      setProblem(fetchedProblem);
      setIsLoaded(true);
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
  <OurLink to={`/solutionForm/${problemKey}`}>제출</OurLink>
  <h1>
  {`NO. ${problemKey} ${problem.title}`}
  </h1>
  <div>
    <span style={{ fontWeight: 700 }}>시간제한&nbsp;</span>
    {`${problem.timeLimit / 1000}초`}
    </div>
  <div>
    <span style={{ fontWeight: 700 }}>메모리제한&nbsp;</span>
  {`${problem.memoryLimit}MB`}
  </div>
  <div>
  <span style={{ fontWeight: 700 }}>카테고리&nbsp;</span>
  {problem.categories.map((category) => <span>{category}&nbsp;</span>)}
  </div>
  </div>
  <div>
  <span style={{ fontWeight: 700 }}>설명&nbsp;</span>
  {problem.description}
  </div>
  <div style={{ margin: '5% 0' }}>
  {problem.examples.map((example, index) => <StyledExampleContainer>
  <div>
  <div>
  예제 입력 {index + 1}
  </div>
  <StyledTextField type='text' value={example.input} readOnly/>
  </div>
  <div>
  <div>
  예제 출력 {index + 1}
  </div>
  <StyledTextField type='text' value={example.output} readOnly/>
  </div>
  </StyledExampleContainer>)}
  </div>
  </StyledProblem>
  ) : (
    <div>Loading...</div>
  ));
};

export default Problem;