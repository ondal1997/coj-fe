import React, { useEffect, useState } from 'react';
import ProblemList from './ProblemList';
import PagenumberList from './PagenumberList';
// import data from '../../../mock/problemList';

const serverAddress = 'http://192.168.0.13:3000';

const size = 10;

const Body = () => {
  const [curPage, setCurpage] = useState(1);
  const [totalPage, setTotalpage] = useState(0);
  const [problemData, setProblemData] = useState([]);

  const fetchProblems = (page) => {
    const pos = (page - 1) * size;
    console.log(pos);
    console.log(size);
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
        <ProblemList problems={problemData}/>
        <PagenumberList curPage={curPage} totalPage={totalPage}
        updatePage={updatePage}/>
        </div>;
};

export default Body;