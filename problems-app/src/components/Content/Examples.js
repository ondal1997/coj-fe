import React, { useState } from 'react';
import styled from 'styled-components';

const StyledExample = styled.div`
  width: 500px;
  margin: 1%;
  border-bottom: 1px solid gray;
`;

const Examples = ({ examples, updateExamples }) => {
  const [focusIdx, setFocusidx] = useState(0);

  const setFocusAndUpdate = (arr, target) => {
    const newExamples = [...arr];
    newExamples[focusIdx].readOnly = true;
    newExamples[target].readOnly = false;
    setFocusidx(target);
    updateExamples(newExamples);
  };

  const onChangeInput = (e, i) => {
    const newExamples = [...examples];
    newExamples[i][e.target.className] = e.target.value;
    updateExamples(newExamples);
  };

  const onClickUpdateItem = (i) => {
    const newExamples = [...examples];
    setFocusAndUpdate(newExamples, i);
  };

  const onClickDeleteItem = (i) => {
    if (examples.length === 1) return;
    const newExamples = examples.filter((e, index) => index !== i);
    updateExamples(newExamples);
  };

  const addExample = () => {
    const newExamples = [...examples];
    newExamples.push({
      input: '',
      output: '',
      readOnly: false,
    });
    setFocusAndUpdate(newExamples, newExamples.length - 1);
  };

  return <>
    <button onClick={addExample}>Add Example</button>
    {examples.map((example, number) => <StyledExample key={number + 1}>
    <span>예제 {number + 1}</span>
        <p>
          입력 {number + 1}
          <textarea className="input"
          value={example.input}
          readOnly={example.readOnly}
          onChange={(e) => onChangeInput(e, number)}
          />
          출력 {number + 1}
          <textarea className="output"
          value={example.output}
          readOnly={example.readOnly}
          onChange={(e) => onChangeInput(e, number)}
          />
          <button onClick={() => onClickUpdateItem(number)}>수정</button>
          <button onClick={() => onClickDeleteItem(number)}>삭제</button>
        </p>
      </StyledExample>)}
    </>;
};

export default Examples;