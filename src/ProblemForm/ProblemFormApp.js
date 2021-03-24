import React, { useRef, useState } from 'react';
import _ from 'lodash';
import { isValid } from './utils';
import Testcases from './Testcases';
import Examples from './Examples';
import Hashtags from './Hashtags';

const serverAddress = 'http://192.168.0.13:3000';

const Form = () => {
  const [inputs, setInputs] = useState({
    title: '',
    timeLimit: '',
    memoryLimit: '',
    desc: '',
  });

  const [examples, setExamples] = useState([
    {
      input: '',
      output: '',
      readOnly: false,
    },
  ]);

  const [testcases, setTestcases] = useState([
    {
      input: '',
      output: '',
      readOnly: false,
    },
  ]);

  const [hashtags, setHashtags] = useState([]);

  const { title, timeLimit, memoryLimit, desc } = inputs;

  const inputsRef = useRef([]);

  inputsRef.current = _.range(0, 4).map((index) => {
    inputsRef.current[index] = useRef(null);
    return inputsRef.current[index];
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submit = () => {
    let valid = true;

    inputsRef.current.every(({ current }) => { // 유효 X가 하나라도 있으면 종료
      const { name, value, style } = current;
      const res = isValid(name, value);
      if (!res) {
        valid = false;
        current.focus();
        style.outlineColor = 'red';
        setTimeout(() => { style.outlineColor = 'black'; }, 3000);
      }
      return res;
    });

    if (!valid) return;

    examples.every((example) => {
      if (example.input === '' || example.output === '') {
        alert('예제의 누락된 필드를 확인해주세요.');
        valid = false;
        return valid;
      }
      delete example.readOnly;
      return true;
    });

    if (!valid) return;

    testcases.every((testcase) => {
      if (testcase.input === '' || testcase.output === '') {
        valid = false;
        alert('테스트케이스의 누락된 필드를 확인해주세요.');
        return valid;
      }
      delete testcase.readOnly;
      return true;
    });

    if (!valid) return;

    const data = {
      title,
      description: desc,
      categories: hashtags,
      timeLimit: Number(timeLimit),
      memoryLimit: Number(memoryLimit),
      examples,
      testcases,
    };

    console.log('성공, 작성하신 문제 정보입니다.');
    console.log(data);
    fetch(`${serverAddress}/api/problems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => console.log(`server got new problem... ${res.status}`));
  };

  return (
    <>
    <div>
      <h3>Title</h3>
      <input name="title" onChange={(event) => onChange(event)} ref={inputsRef.current[0]}/>
      <h3>Time Limit</h3>
      <input name="timeLimit" onChange={(event) => onChange(event)} ref={inputsRef.current[1]}/>
      <h3>Memory Limit</h3>
      <input name="memoryLimit" onChange={(event) => onChange(event)} ref={inputsRef.current[2]}/>
      <h3>Describe</h3>
      <textarea name="desc" onChange={(event) => onChange(event)} ref={inputsRef.current[3]}/>
      <h3>Hashtag</h3>
      <Hashtags hashtags={hashtags} updateHashtags={setHashtags}/>
      <span style={ { fontWeight: 'bolder' } }>Example</span>
      <Examples examples={examples} updateExamples={setExamples}/>
      <span style={ { fontWeight: 'bolder' } }>Testcase</span>
      <Testcases testcases={testcases} updateTestcases={setTestcases} />
      </div>
    <button onClick={(event) => submit(event)}>Create</button>
    </>
  );
};

export default Form;