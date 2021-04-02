import React, { useState, useEffect } from 'react';
import { Container, Typography, withStyles } from '@material-ui/core';
import SolutionList from './SolutionList';
// import data from '../mock/solutionList'; // data
import PagenumberList from '../ProblemList/PagenumberList'; // 공통적으로 사용되니 나중에 빼기
import { ourFetchAndJson } from '../OurLink';

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
const Body = (props) => {
  const { problemNo, problemTitle, pageNum, history } = props;
  const [totalPage, setTotalpage] = useState(0);
  const [solutions, setSolutions] = useState([]); // 해당 문제에 해당하는 거 중에 10개씩 자름.

  const fetchSolutions = async () => {
    const pos = (pageNum - 1) * size;

    try {
      let json;

      if (problemNo !== undefined) {
        json = await ourFetchAndJson(`${serverAddress}/api/problems/${problemNo}/solutions?pos=${pos}&count=${size}`, {
          method: 'GET',
        });
      } else {
        json = await ourFetchAndJson(`${serverAddress}/api/solutions?pos=${pos}&count=${size}`, {
          method: 'GET',
        });
      }

      console.log('솔루션 리스트 조회');
      console.log(json);

      setSolutions(json.solutions);
      console.log(json.totalCount);
      setTotalpage(Math.ceil(json.totalCount / size));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSolutions(pageNum);
  }, [pageNum]);

  return <div>
        {
          problemNo !== undefined ? (
          <StyledTypography align='center'>{problemNo}번 {problemTitle}</StyledTypography>
          ) : (
             <StyledTypography align='center'>전체 풀이 현황{problemNo}</StyledTypography>
          )
        }
        <div>
          <SolutionList solutions={solutions}/>
        </div>
        <StyledContainer>
          <PagenumberList curPage={pageNum} totalPage={totalPage}
          preUrl={`solutions/${problemNo}/${problemTitle}`} history={history}/>
        </StyledContainer>
        </div>;
};

export default Body;