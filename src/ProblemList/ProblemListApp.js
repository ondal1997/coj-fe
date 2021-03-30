import React, { useEffect, useState } from 'react';
import { Container, withStyles } from '@material-ui/core';
import ProblemList from './ProblemList';
import PagenumberList from './PagenumberList';
// import data from '../mock/problemList';

const serverAddress = 'http://192.168.0.100:3000';
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

const Body = () => {
  const [curPage, setCurpage] = useState(1);
  const [totalPage, setTotalpage] = useState(0);
  // const [problemData, setProblemData] = useState(data.slice(0, size));
  const [problemData, setProblemData] = useState([]);

  const fetchProblems = (page) => {
    /* local test code */
    // setProblemData(data.slice((page - 1) * size, page * size));
    // setCurpage(page);
    // setTotalpage(Math.floor(data.length / size) + 1);

    const pos = (page - 1) * size;
    fetch(`${serverAddress}/api/problems?pos=${pos}&count=${size}`, {
      // 비동기
      method: 'GET',
    }).then((res) => res.json())
      .then(({ problems, totalCount }) => {
        setProblemData(problems);
        setCurpage(page);
        setTotalpage(Math.floor(totalCount / size) + 1);
      }, (error) => console.log(error));
  };

  useEffect(() => {
    fetchProblems(curPage);
  }, []);

  const updatePage = (page) => {
    fetchProblems(page);
  };

  return <div>
        <div style={{ height: '950px' }}>
        <ProblemList problems={problemData}/>
        </div>
        <StyledContainer>
          <PagenumberList curPage={curPage} totalPage={totalPage}
          updatePage={updatePage}/>
        </StyledContainer>
        </div>;
};

export default Body;