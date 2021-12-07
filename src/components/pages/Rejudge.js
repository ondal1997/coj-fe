import React, { useState } from 'react';
import { pureFetchAndJson } from '../../OurLink';

export default function Rejudge() {
  const [problemKey, setProblemKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <>
      <h1>재채점</h1>
      <input
        value={problemKey}
        onChange={(event) => {
          setProblemKey(event.target.value);
        }}
      />
      <button
        onClick={async () => {
          setIsProcessing(true);
          const res = await pureFetchAndJson(`/api/rejudge/${problemKey}`);
          alert(res.status);
          setIsProcessing(false);
        }}
        disabled={isProcessing}
      >
        재채점하기
      </button>
    </>
  );
}
