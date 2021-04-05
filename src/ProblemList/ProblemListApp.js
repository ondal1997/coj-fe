import React, { useEffect, useState } from 'react';
import { Container, withStyles } from '@material-ui/core';
import ProblemList from './ProblemList';
import PagenumberList from './PagenumberList';
import { ourFetchAndJson } from '../OurLink';

const serverAddress = 'http://192.168.0.100:3000';
const StyledContainer = withStyles({
  root: {
    color: 'white',
    fontSize: 'medium',
    marginTop: '1%',
  },
  maxWidthLg: {
    width: '100%',
  },
})(Container);

const size = 10;

const Body = (props) => {
  const { pageNum } = props.match.params;

  const [totalPage, setTotalpage] = useState(0);
  const [problemData, setProblemData] = useState([]);

  const fetchProblems = async () => {
    const pos = (pageNum - 1) * size;
    try {
      const { problems, totalCount } = await ourFetchAndJson(`${serverAddress}/api/problems?pos=${pos}&count=${size}`, {
        // 비동기
        method: 'GET',
      });
      setProblemData(problems);
      setTotalpage(Math.floor(totalCount / size) + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [props]);

  return <div>
        <div>
        <ProblemList problems={problemData}/>
        </div>
        <StyledContainer>
          <PagenumberList curPage={pageNum} totalPage={totalPage} preUrl='problems' history={props.history}/>
        </StyledContainer>
        </div>;
};

export default Body;