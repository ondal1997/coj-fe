import React, { useEffect, useState } from 'react';
import ProblemList from './ProblemList';
import PagenumberList from './PagenumberList';
import problemList from '../../../mock/problemList';

const serverAddress = 'http://192.168.0.13:3000';

const Body = () => {
  const [curPage, setCurpage] = useState(1);
  const [problems, setProblems] = useState([]); // problemList.slice(0, curPage * 10)

  useEffect(() => { // componentDidMount / 생성될 때 한 번만 수행
    fetch(`${serverAddress}/api/problems`, {
      method: 'GET',
    }).then((res) => res.json()).then((res) => setProblems(res));
  }, []);

  return <div>
        <ProblemList problems={problems} curPage={curPage}/>
        <PagenumberList curPage={curPage} problems={problemList}
        updateCurpage={setCurpage} updateProblems={setProblems}/>
        </div>;
};

export default Body;