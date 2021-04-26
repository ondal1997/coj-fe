import React, { useState } from 'react';
import {
  Button, Grid, FormControlLabel,
  FormLabel, RadioGroup, Radio, Backdrop,
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CodeEditor from '../components/atoms/CodeEditor';
import JudgeProgress from '../components/organisms/JudgeProgress';

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

const SolutionForm = (props) => {
  const classes = useStyles();

  const { problem, solution, languages, fetchSolution } = props;

  const [selectedLanguage, setSelectedLanguage] = useState(solution.language);
  const [sourceCode, setSourceCode] = useState(solution.sourceCode);

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedLanguage) {
      alert('언어를 선택해주세요');
      return;
    }

    if (!sourceCode) {
      alert('코드를 입력해주세요');
      return;
    }

    const data = {
      problemKey: problem.key,
      language: selectedLanguage,
      sourceCode,
    };

    fetchSolution(data, setIsSubmitting, setOpen, setProgress);
  };

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.children} item xs={12}>
        <h3 style={{ margin: '0 0' }}>{`${problem.key}. ${problem.title}`}</h3>
      </Grid>
      <Grid className={classes.children} container item direction='column' xs={12}>
        <div style={{
          backgroundColor: '#F8F8F8', padding: '1%',
        }}>
          <Grid item>
            <FormLabel component="legend">
              <strong>언어 선택</strong>
            </FormLabel>
          </Grid>
          <Grid item>
            <RadioGroup aria-label="language" name="language"
              value={selectedLanguage}
              onChange={(event) => {
                setSelectedLanguage(event.target.value);
              }}>
              {languages.map((language) => (
                <FormControlLabel key={language} value={language} label={language}
                  control={<Radio color="default" />} />
              ))}
            </RadioGroup>
          </Grid>
        </div>
      </Grid>
      <Grid className={classes.children} item xs={12}
        style={{ border: '1px solid #E0E0E0' }}>
        <CodeEditor
        defaultValue={sourceCode}
        language={selectedLanguage}
        updateCode={setSourceCode} />
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

export default SolutionForm;