import React, { useEffect, useState } from 'react';
import {
  Button, Grid, FormControlLabel,
  FormLabel, RadioGroup, Radio, Backdrop,
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { fetchAndJson } from '../OurLink';
import CodeEditor from '../SolutionForm/CodeEditor';
import JudgeProgress from '../SolutionForm/JudgeProgress';
import Error from '../Error/Error';
import _handleFetchRes from '../Error/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 0',
      padding: '0 1%',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0 0',
      padding: '0 15%',
    },
  },
  children: {
    [theme.breakpoints.down('sm')]: {
      margin: '1% 0',
    },
    [theme.breakpoints.up('md')]: {
      margin: '1% 0',
    },
  },
}));

const StyledButton = withStyles({
  root: {
    width: '100px',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black',
    padding: '2% 1%',
    '&:hover': {
      backgroundColor: '#CE2727',
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
  const classes = useStyles();

  const { problemKey } = props.match.params;
  const { history } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [languages, setLanguages] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sourceCode, setSourceCode] = useState('');

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const [error, setError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchJudgeResult = async (solutionKey) => {
    const result = await fetchAndJson(`/api/solutions/${solutionKey}`);
    const { testcaseHitCount, testcaseSize } = result.solution;
    setProgress((testcaseHitCount / testcaseSize) * 100);

    if (result.solution.state > 1) {
      setTimeout(() => {
        setOpen(false);
        history.push(`/solutions/${problemKey}/1`);
      }, 2000);
    } else {
      setTimeout(() => { fetchJudgeResult(solutionKey); }, 16);
    }
  };

  const handleSubmit = async () => {
    if (!selectedLanguage) {
      alert('언어를 선택해주세요');
      return;
    }

    if (!sourceCode) {
      alert('코드를 입력해주세요');
      return;
    }

    setIsSubmitting(true);

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
      setIsSubmitting(false);
      setOpen(true);
      fetchJudgeResult(result.solution.key);
    });
  };

  useEffect(() => {
    (async () => {
      const loginData = await fetchAndJson('/api/auth');
      console.log(loginData);
      if (!loginData.isAuthenticated) {
        window.location.replace(`https://codersit.co.kr/bbs/login.php?url=%2Foj/solutionForm/${problemKey}/${title}`);
        return;
      }
      const fetchedLanguages = await fetchLanguages();
      setLanguages(fetchedLanguages);

      const result = await fetchAndJson(`/api/problems/${problemKey}`);
      setTitle(result.problem.title);
      setIsLoaded(true);
    })();
  }, []);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.children} item xs={12}>
        <h3 style={{ margin: '0 0' }}>{`${problemKey}. ${title}`}</h3>
      </Grid>
      <Grid className={classes.children} container item direction='column' xs={12}>
        {isLoaded ? (<div style={{
          backgroundColor: '#F8F8F8', padding: '1%',
        }}>
          <Grid item>
            <FormLabel component="legend">
              <strong>언어 선택</strong>
            </FormLabel>
          </Grid>
          <Grid item>
            <RadioGroup aria-label="language" name="language"
              onChange={(event) => { setSelectedLanguage(event.target.value); }}>
              {languages.map((language) => (
                <FormControlLabel key={language} value={language} label={language}
                  control={<Radio color="default" />} />
              ))}
            </RadioGroup>
          </Grid>
        </div>)
          : (<Grid item>Loading...</Grid>)
        }
      </Grid>
      <Grid className={classes.children} item xs={12}
        style={{ border: '1px solid #E0E0E0' }}>
        <CodeEditor language={selectedLanguage} updateCode={setSourceCode} />
      </Grid>
      <Grid className={classes.children} item container direction='row-reverse' xs={12}>
        <Grid item>
          <StyledButton variant='contained' disabled={isSubmitting}
            size='medium' onClick={handleSubmit}>
            {!isSubmitting ? '풀이 제출하기' : '제출 중'}
          </StyledButton>
        </Grid>
        <Backdrop open={open} style={{ zIndex: 9999 }}>
          <JudgeProgress progress={progress} />
        </Backdrop>
      </Grid>
    </Grid>
  );
};

export default Form;