import React, { useEffect, useState } from 'react';

const serverAddress = 'http://192.168.0.13:3000';

const fetchLanguages = async () => {
  const res = await fetch(`${serverAddress}/api/availableLanguages`);
  const json = await res.json();
  return json;
};

const Form = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [languages, setLanguages] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sourceCode, setSourceCode] = useState('');

  useEffect(() => {
    (async () => {
      const fetchedLanguages = await fetchLanguages();

      setLanguages(fetchedLanguages);
      setIsLoaded(true);
    })();
  }, []);

  return (
    <div className="App">
      <h2>Solution Submit</h2>
      <hr></hr>

      <h3>언어</h3>
      {isLoaded ? (
         <select value={selectedLanguage} onChange={(event) => {
           setSelectedLanguage(event.target.value);
         }}>
          <option value='' disabled>언어 선택</option>
            {languages.map((language) => (
            <option key={language} value={language}>{language}</option>
            ))}
          </select>
      )
        : (<div>Loading...</div>)
      }

      <h3>소스 코드</h3>
      <textarea value={sourceCode} onChange={(event) => {
        setSourceCode(event.target.value);
      }}></textarea>

      <hr></hr>
      <button onClick={() => {
        if (!selectedLanguage) {
          alert('언어를 선택해주세요');
          return;
        }
        alert(`[언어]${selectedLanguage}[소스 코드]${sourceCode}`);
      }}>
          <h2>풀이 출력하기</h2></button>
    </div>
  );
};

export default Form;