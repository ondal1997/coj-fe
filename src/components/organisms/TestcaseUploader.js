import { Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import BasicButton from '../atoms/BasicButton';

// 이 컴포넌트가 결합된 동안에, handleTestcases가 변경되지 않으며 handleTestcases 호출이 안전하다는 가정 하에 안전합니다.
export default function TestcaseUploader({ testcases, handleTestcases }) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const isMounted = useRef(true);
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  const onUploadFile = (event) => {
    setIsLoading(true);

    const { files } = event.target;
    const testcasesBuilder = {};

    const reader = new FileReader();

    // 비동기 재귀 클로저
    function readFile(index) {
      // 종료 시점
      if (index === files.length) {
        handleTestcases(Object.values(testcasesBuilder));
        setIsLoading(false);
        return;
      }

      const file = files[index];

      const id = file.name.split('.')[0];
      let type = file.name.split('.')[1];
      if (!id || !type) {
        readFile(index + 1);
        return;
      }

      // type 필터링
      if (type.includes('in')) {
        type = 'input';
      } else if (type.includes('out')) {
        type = 'output';
      } else {
        readFile(index + 1);
        return;
      }

      // 콜백 정의
      reader.onload = () => {
        if (!isMounted.current) {
          return;
        }

        if (!testcasesBuilder[id]) {
          testcasesBuilder[id] = { input: '', output: '' };
        }
        testcasesBuilder[id][type] = reader.result;

        readFile(index + 1);
      };
      reader.readAsText(file);
    }

    readFile(0);
  };

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item style={{ textAlign: 'right' }}>
        { testcases && testcases.length ? `테스트케이스 ${testcases.length}개 있음` : '테스트케이스를 업로드해주세요.' }
        &nbsp;
        <BasicButton label='테스트케이스 업로드'
          handleClick={() => { fileInputRef.current.click(); }} disabled={isLoading}/>
        <input
          ref={fileInputRef}
          type="file"
          accept="text/plain"
          multiple
          onChange={onUploadFile}
          style={{ display: 'none' }}
        />
      </Grid>
  </Grid>
  );
}
