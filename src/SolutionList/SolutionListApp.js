import React, { useState, useEffect } from 'react';
import { Container, Typography, withStyles } from '@material-ui/core';
import SolutionList from './SolutionList';
// import data from '../mock/solutionList'; // data
import PagenumberList from '../ProblemList/PagenumberList'; // 공통적으로 사용되니 나중에 빼기
import { ourFetch } from '../OurLink';

const serverAddress = 'http://192.168.0.100:3000';

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
  const [solutions, setSolutions] = useState([]); // 해당 문제에 해당하는 거 중에 10개씩 자름.

  const fetchSolutions = async (page) => {
    const pos = (page - 1) * size;

    try {
      let res;

      if (problemNo !== undefined) {
        res = await ourFetch(`${serverAddress}/api/problems/${problemNo}/solutions?pos=${pos}&count=${size}`, {
          method: 'GET',
        });
      } else {
        res = await ourFetch(`${serverAddress}/api/solutions?pos=${pos}&count=${size}`, {
          method: 'GET',
        });
      }

      const json = await res.json();

      setSolutions(json.solutions);
      setCurpage(page);
      console.log(json.totalCount);
      setTotalpage(Math.ceil(json.totalCount / size));
    } catch (error) {
      console.error(error);
    }
  };

  const updatePage = (page) => {
    fetchSolutions(page);
  };

  useEffect(() => {
    updatePage(curPage);
  }, []);

  return <div>
        {
          problemNo !== undefined ? (
          <StyledTypography align='center'>NO. {problemNo}</StyledTypography>
          ) : (
             <StyledTypography align='center'>전체 풀이 현황{problemNo}</StyledTypography>
          )
        }
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