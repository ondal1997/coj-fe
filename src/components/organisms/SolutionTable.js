import { Tooltip } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Table, TableData, TableHeader, TableRow } from '../atoms/Table';
import { pureFetchAndJson } from '../../OurLink';
import judgeState from '../../judgeState';
import AuthenticationContext from '../../contexts/authentication';

function ProblemRepo() {
  this.subscribers = {};
  this.isLoading = {};
  this.problems = {};
}

ProblemRepo.prototype = { // prototype시 여러 객체를 만들 때 함수가 한 번만 생성될 수 있음.
  subscribe: function (problemKey, callback) {
    if (!this.subscribers[problemKey]) { // 구독 등록
      this.subscribers[problemKey] = [];
    }
    const targetCallbackArray = this.subscribers[problemKey];
    targetCallbackArray.push(callback);

    this.update(problemKey);
  },
  unsubscribe: function (problemKey, callback) {
    const targetCallbackArray = this.subscribers[problemKey];
    targetCallbackArray.splice(targetCallbackArray.indexOf(callback), 1);
    if (targetCallbackArray.length === 0) {
      delete this.subscribers[problemKey];
      delete this.isLoading[problemKey];
      delete this.problems[problemKey];
    }
  },
  update: async function (problemKey) {
    if (this.isLoading[problemKey]) {
      return;
    }
    this.isLoading[problemKey] = true;
    let result;
    try {
      result = await pureFetchAndJson(`/api/problems/${problemKey}/brief`);
    } catch {
      return;
    }
    this.problems[problemKey] = result.problem || {};
    this.isLoading[problemKey] = false;
    this.notify(problemKey);
  },
  notify: function (problemKey) {
    if (!this.subscribers[problemKey]) {
      return;
    }
    const targetCallbackArray = this.subscribers[problemKey];
    targetCallbackArray.forEach((callback) => {
      callback(this.problems[problemKey]);
    });
  },
};

const problemRepo = new ProblemRepo();

const ProblemLabel = ({ problemKey }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const handleProblemChange = (problem) => {
      setTitle(problem.title || '삭제된 문제');
    };

    problemRepo.subscribe(problemKey, handleProblemChange);

    return () => { // clean up
      problemRepo.unsubscribe(problemKey, handleProblemChange);
    };
  }, []);

  return (<Tooltip title={title}>
    <div style={{ color: '#444444' }}>{problemKey}</div>
  </Tooltip>);
};

const SolutionTable = (props) => {
  // const [userId] = useContext(AuthenticationContext);
  const highlight = new URLSearchParams(useLocation().search).get('highlight');
  const history = useHistory();

  const { solutions } = props;

  return (
    <Table>
      <TableRow>
        <TableHeader width="7%">번호</TableHeader>
        <TableHeader width="13%">제출자</TableHeader>
        <TableHeader width="7%">문제</TableHeader>
        <TableHeader width="13%">상태</TableHeader>
        <TableHeader width="10%">언어</TableHeader>
        <TableHeader width="10%">시간</TableHeader>
        <TableHeader width="10%">메모리</TableHeader>
        <TableHeader width="10%">코드</TableHeader>
        <TableHeader width="20%">제출 시간</TableHeader>
      </TableRow>
      {solutions.map((solution) => (
        <TableRow key={solution.key}
          style={
            highlight === solution.ownerId ? (
              { backgroundColor: '#DDEEFF' }) : {}
          }
        >
          <TableData>{solution.key}</TableData>
          <TableData hover onClick={() => { history.push(`/users/${solution.ownerId}`); }}>
            <div style={{ color: '#5DADE2' }}>
              {solution.ownerId}
            </div>
          </TableData>
          <TableData hover onClick={() => { history.push(`/problems/${solution.problemKey}`); }}>
            <ProblemLabel problemKey={solution.problemKey} />
          </TableData>
          <TableData>
            <strong style={{ color: judgeState[solution.state].color }}>
              {judgeState[solution.state].name}
            </strong>
          </TableData>
          <TableData>{solution.language}</TableData>
          <TableData>
            {
              +solution.state === 2 ? (
                `${solution.maxTime}ms`
              ) : (
                '-'
              )
            }
          </TableData>
          <TableData>
            {
              +solution.state === 2 ? (
                `${solution.maxMemory}MB`
              ) : (
                '-'
              )
            }
          </TableData>
          {
            solution.accessable ? (
              <TableData hover onClick={() => { history.push(`/solutions/${solution.key}`); }}>
                <div style={{ color: '#5DADE2' }}>
                  {solution.byteLength}B
                </div>
              </TableData>
            ) : (
              <TableData>
                  {solution.byteLength}B
              </TableData>
            )
          }
          <TableData>
            {new Date(solution.uploadTime).toLocaleTimeString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </TableData>
        </TableRow>
      ))}
    </Table>
  );
};

export default SolutionTable;
