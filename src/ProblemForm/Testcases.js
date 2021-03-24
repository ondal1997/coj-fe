import React, { useState } from 'react';
import styled from 'styled-components';

const StyledTestcase = styled.div`
  width: 500px;
  margin: 1%;
  border-bottom: 1px solid gray;
`;

const Testcases = ({ testcases, updateTestcases }) => {
  const [focusIdx, setFocusidx] = useState(0);

  const setFocusAndUpdate = (arr, target) => {
    const newTestcases = [...arr];
    newTestcases[focusIdx].readOnly = true;
    newTestcases[target].readOnly = false;
    setFocusidx(target);
    updateTestcases(newTestcases);
  };

  const onChangeInput = (e, i) => {
    const newTestcases = [...testcases];
    newTestcases[i][e.target.className] = e.target.value;
    updateTestcases(newTestcases);
  };

  const onClickUpdateItem = (i) => {
    const newTestcases = [...testcases];
    setFocusAndUpdate(newTestcases, i);
  };

  const onClickDeleteItem = (i) => {
    if (testcases.length === 1) return;
    const newTestcases = testcases.filter((e, index) => index !== i);

    if (i === testcases.length - 1) {
      newTestcases[i - 1].readOnly = false;
      setFocusidx(i - 1);
    } else if (i === focusIdx) {
      newTestcases[i].readOnly = false;
    }
    updateTestcases(newTestcases);
  };

  const addTestcase = () => {
    const newTestcases = [...testcases];
    newTestcases.push({
      input: '',
      output: '',
      readOnly: false,
    });
    setFocusAndUpdate(newTestcases, newTestcases.length - 1);
  };

  return <>
 <button onClick={addTestcase}>Add testcase</button>
 {testcases.map((testcase, number) => <StyledTestcase>
    <span>테스트케이스 {number + 1}</span>
        <p>
          입력 {number + 1}
          <textarea className="input"
          value={testcase.input}
          readOnly={testcase.readOnly}
          onChange={(event) => onChangeInput(event, number)}
          />
          출력 {number + 1}
          <textarea className="output"
          value={testcase.output}
          readOnly={testcase.readOnly}
          onChange={(event) => onChangeInput(event, number)}
          />
          <button onClick={() => onClickUpdateItem(number)}>수정</button>
          <button onClick={() => onClickDeleteItem(number)}>삭제</button>
        </p>
      </StyledTestcase>)}
  </>;
};

export default Testcases;