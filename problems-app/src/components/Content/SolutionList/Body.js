import React, { useState, useEffect } from 'react';
import SolutionList from './SolutionList';
import data from '../../../mock/solutionList'; // data
import PagenumberList from '../ProblemList/PagenumberList'; // 공통적으로 사용되니 나중에 빼기

const serverAddress = 'http://192.168.0.13:3000';

// 전체 리스트 보여주기랑 특정 문제에 따라 보여주는거로 분기
const Body = ({ problemNo }) => {
  const [curPage, setCurpage] = useState(1);
  const [totalPage, setTotalpage] = useState(0);
  const [solutions, setSolutions] = useState(
    data.filter((solution) => solution.problemKey === Number(problemNo))
      .slice((curPage - 1) * 10, curPage * 10),
  ); // 해당 문제에 해당하는 거 중에 10개씩 자름.

  const fetchSolutions = () => {
    const filteredList = data.filter((solution) => solution.problemNo
    === Number(problemNo));
    setTotalpage(Math.floor(filteredList.length / 10) + 1);
    // 한 번에 10개의 item
    // 처음 데이터 요청 시 전체 데이터 개수와
    // 처음 10개의 데이터를 요청
    fetch(`${serverAddress}/api/problems`, {
      method: 'GET',
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        // setTotalpage(Math.floor(res.length / 10) + 1);
        // setSolutions(res);
      }, (error) => console.log(error));
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  const updatePage = (page) => {
    // page에 따라
    setCurpage(page);
    const newSolutions = data.filter((solution) => solution.problemKey
    === Number(problemNo))
      .slice((page - 1) * 10, page * 10);
    // 서버에 해당 범위만큼의 데이터 요청
    setSolutions(newSolutions);
    // fetch(`${serverAddress}/api/problems`, {
    //   method: 'GET',
    // }).then((res) => res.json())
    //   .then((res) => setProblems(res), (error) => console.log(error));
  };

  return <div>
        <h1>{problemNo}번 {solutions[0].problemName}</h1>
        <SolutionList solutions={solutions}/>
        <PagenumberList curPage={curPage} totalPage={totalPage}
        updatePage={updatePage}/>
        </div>;
};

export default Body;