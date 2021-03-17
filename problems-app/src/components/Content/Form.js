import React, { useState } from 'react';
import Testcases from './Testcases';
import Examples from './Examples';
import Hashtags from './Hashtags';

const Form = () => {
  const [inputs, setInputs] = useState({
    title: '',
    tlimit: '',
    mlimit: '',
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

  const { title, tlimit, mlimit, desc } = inputs;

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submit = () => {
    alert(`문제명: ${title}\n`
    + `시간제한: ${tlimit}ms\n`
    + `메모리제한: ${mlimit}KB\n`
    + `설명: ${desc}\n`
    + `해시태그: ${hashtags.map((item) => item.name).join(' ')}\n`
    + `예제: ${examples.map((item) => `${item.input}, ${item.output}`).join('\n')}\n`
    + `테스트케이스: ${testcases.map((item) => `${item.input}, ${item.output}`).join('')}\n`);
  };

  return (
    <>
    <div>
      <h3>Title</h3>
      <input name="title" onChange={(event) => onChange(event)}/>

      <h3>Time Limit</h3>
      <input name="tlimit" onChange={(event) => onChange(event)} />

      <h3>Memory Limit</h3>
      <input name="mlimit "onChange={(event) => onChange(event)} />
      <h3>Describe</h3>
      <textarea name="desc" onChange={(event) => onChange(event)} />
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