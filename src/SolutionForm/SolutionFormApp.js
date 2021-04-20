import React, { useEffect, useState } from 'react';
import { Button, Grid, FormControlLabel,
  FormLabel, RadioGroup, Radio, Backdrop } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchAndJson } from '../OurLink';
import CodeEditor from './CodeEditor';
import JudgeProgress from './JudgeProgress';
import Error from '../Error/Error';
import _handleFetchRes from '../Error/utils';

const StyledGrid = withStyles({
  root: {
    backgroundColor: 'white',
    margin: '0 auto',
    padding: '0 15%',
  },
})(Grid);

const StyledButton = withStyles({
  root: {
    color: 'white',
    backgroundColor: 'black',
    padding: '1%',
    '&:hover': {
      backgroundColor: '#CE2727',
    },
    '& a': {
      fontSize: '20px',
    },
  },
})(Button);

const fetchLanguages = async () => {
  try {
    const json = await fetchAndJson('/api/availableLanguages');
    return json;
  } catch (error) {
    console.error(error);
  }
  return {};
};

const Form = (props) => {
  const { problemKey, problemTitle } = props.match.params;
  const { history } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [languages, setLanguages] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sourceCode, setSourceCode] = useState('');

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const [error, setError] = useState(null);

  const fetchJudgeResult = async (solutionKey) => {
    const result = await fetchAndJson(`/api/solutions/${solutionKey}`);
    const { testcaseHitCount, testcaseSize } = result.solution;
    setProgress((testcaseHitCount / testcaseSize) * 100);

    if (result.solution.state > 1) {
      setTimeout(() => {
        setOpen(false);
        history.push(`/solutions/${problemKey}/${problemTitle}/1`);
      }, 2000);
    } else {
      setTimeout(() => { fetchJudgeResult(solutionKey); }, 16);
    }
  };

  useEffect(() => {
    (async () => {
      const loginData = await fetchAndJson('/api/auth');
      console.log(loginData);
      if (!loginData.isAuthenticated) {
        window.location.replace(`https://codersit.co.kr/bbs/login.php?url=%2Foj/solutionForm/${problemKey}/${problemTitle}`);
        return;
      }
      const fetchedLanguages = await fetchLanguages();
      setLanguages(fetchedLanguages);
      setIsLoaded(true);
    })();
  }, []);

  if (error) {
    <Error error={error}/>;
  }

  return (
    <StyledGrid container direction='column' spacing={3}>
      <Grid container item direction='column' spacing={1}>
        <Grid container item>
        <h3 style={{ margin: '0 0' }}>{`${problemKey}번 ${problemTitle}`}</h3>
        </Grid>
        {isLoaded ? (<div style={{
          backgroundColor: '#F8F8F8', padding: '1%' }}>
          <Grid container item>
            <FormLabel component="legend">
              <strong>언어 선택</strong>
              </FormLabel>
          </Grid>
          <Grid container item>
            <RadioGroup aria-label="language" name="language"
                      onChange={(event) => { setSelectedLanguage(event.target.value); }}>
            {languages.map((language) => (
                      <FormControlLabel key={language} value={language} label={language}
                      control={<Radio color="default" />} />
            ))}
            </RadioGroup>
          </Grid>
        </div>)
          : (<Grid container item>Loading...</Grid>)
        }
      </Grid>
      <Grid container item>
        <CodeEditor language={selectedLanguage} updateCode={setSourceCode} />
      </Grid>
      <Grid container item direction='row-reverse'>
        <StyledButton variant='contained'
            size='medium' onClick={async () => {
              if (!selectedLanguage) {
                alert('언어를 선택해주세요');
                return;
              }

              if (!sourceCode) {
                alert('코드를 입력해주세요');
                return;
              }

              const result = await fetchAndJson('/api/solutions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  problemKey,
                  language: selectedLanguage,
                  sourceCode,
                }),
              });

              _handleFetchRes(result.status, setError, () => {
                setOpen(true);
                fetchJudgeResult(result.solution.key);
              });
            }}>
            풀이 제출하기
            </StyledButton>
            <Backdrop open={open} style={{ zIndex: 9999 }}>
              <JudgeProgress progress={progress} />
            </Backdrop>
        </Grid>
    </StyledGrid>
  );
};

export default Form;