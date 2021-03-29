import React, { useState, useEffect } from 'react';
import { Container, Typography, withStyles } from '@material-ui/core';
import SolutionList from './SolutionList';
import data from '../mock/solutionList'; // data
import PagenumberList from '../ProblemList/PagenumberList'; // 공통적으로 사용되니 나중에 빼기

const serverAddress = 'http://192.168.0.13:3000';

const StyledTypography = withStyles({
  root: {
    color: '#4995F2',
    fontSize: '30px',
    margin: '2% 0',
  },
})(Typography);

const StyledContainer = withStyles({
  root: {
    color: 'white',
    fontSize: 'medium',
  },
  maxWidthLg: {
    width: '100%',
  },
})(Container);

const size = 10;
// 전체 리스트 보여주기랑 특정 문제에 따라 보여주는거로 분기
const Body = ({ problemNo }) => {
  const [curPage, setCurpage] = useState(1);
  const [totalPage, setTotalpage] = useState(0);
  const [solutions, setSolutions] = useState(
    data.filter((solution) => solution.problemKey === Number(problemNo))
      .slice((curPage - 1) * size, curPage * size),
  ); // 해당 문제에 해당하는 거 중에 10개씩 자름.

  const fetchSolutions = () => {
    const filteredList = data.filter((solution) => solution.problemNo
    === Number(problemNo));
    setTotalpage(Math.floor(filteredList.length / size) + 1);

    fetch(`${serverAddress}/api/solutions`, {
      method: 'GET',
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        // setTotalpage(Math.floor(res.length / 10) + 1);
        // setSolutions(res);
      }, (error) => console.log(error));
  };

  setTimeout(fetchSolutions, 1000);

  useEffect(() => {
    fetchSolutions();
  }, []);

  const updatePage = (page) => {
    // page에 따라
    setCurpage(page);
    const newSolutions = data.filter((solution) => solution.problemKey
    === Number(problemNo))
      .slice((page - 1) * size, page * size);
    // 서버에 해당 범위만큼의 데이터 요청
    setSolutions(newSolutions);
    // fetch(`${serverAddress}/api/problems`, {
    //   method: 'GET',
    // }).then((res) => res.json())
    //   .then((res) => setProblems(res), (error) => console.log(error));
  };

  return <div>
        <StyledTypography align='center'>NO. {problemNo}</StyledTypography>
        <div style={{ height: '950px' }}>
          <SolutionList solutions={solutions}/>
        </div>
        <StyledContainer>
          <PagenumberList curPage={curPage} totalPage={totalPage}
          updatePage={updatePage}/>
        </StyledContainer>
        </div>;
};

export default Body;