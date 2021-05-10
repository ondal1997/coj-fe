import { Grid, CircularProgress, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useContext, useEffect, useState } from 'react';
import { _handleFetchRes } from '../../utils';
import { pureFetchAndJson } from '../../OurLink';
import SolutionTable from '../organisms/SolutionTable';
import ErrorContext from '../../contexts/error';
import PageTemplate from '../templates/PageTemplate';

const useStyles = makeStyles((theme) => ({
  children: {
    [theme.breakpoints.down('md')]: {
      margin: '4% 0',
    },
    [theme.breakpoints.up('lg')]: {
      margin: '2% 0',
    },
    [theme.breakpoints.up('xl')]: {
      margin: '2% 0',
    },
  },
}));

const SolutionList = (props) => {
  const classes = useStyles();

  const [error, setError] = useContext(ErrorContext);

  const urlSearchParams = new URLSearchParams(props.location.search);

  const problemKey = urlSearchParams.get('problemKey');

  const limit = 20;

  const unparsedPage = urlSearchParams.get('page');
  const page = /^[1-9]\d*$/.test(unparsedPage) ? Number.parseInt(unparsedPage, 10) : 1;

  const [isLoaded, setIsLoaded] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [mutable] = useState({
    lastFetch: null,
  });

  useEffect(async () => {
    setIsLoaded(false);

    let promise;
    if (problemKey) {
      promise = pureFetchAndJson(
        `/api/problems/${problemKey}/solutions?${new URLSearchParams({
          pos: (page - 1) * limit,
          count: limit,
        }).toString()}`,
      );
    } else {
      promise = pureFetchAndJson(
        `/api/solutions?${new URLSearchParams({
          pos: (page - 1) * limit,
          count: limit,
        }).toString()}`,
      );
    }
    mutable.lastFetch = promise;
    promise.then((result) => {
      if (mutable.lastFetch !== promise) {
        return;
      }

      if (result.status !== 200) {
        setError({ status: result.status });
        return;
      }

      setSolutions(result.solutions);
      setTotalCount(result.totalCount);
      setIsLoaded(true);
      // window.scrollTo(0, 0);
    }, () => {
      setError({ message: 'Failed to connect with server' });
    });
  }, [problemKey, page]);

  return (
    <PageTemplate content={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    {(() => {
      if (!isLoaded) {
        return (
          (<Grid style={{ height: '100vh' }} container direction='row' justify='center' alignItems='center'>
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>)
        );
      }
      if (totalCount === 0) {
        return <p>대응하는 솔루션이 존재하지 않습니다.</p>;
      }
      return (
        <>
          <p>
            총 <strong>{totalCount}</strong>개의 솔루션을 발견했습니다.
          </p>
          <SolutionTable
            className={classes.children}
            solutions={solutions}
            urlSearchParams={urlSearchParams}
            history={props.history}
          />
          <Pagination
            className={classes.children}
            shape="rounded"
            variant="outlined"
            color="primary"
            size="large"
            siblingCount={2}
            boundaryCount={2}
            count={Math.ceil(totalCount / limit)}
            page={page}
            onChange={(event, p) => {
              urlSearchParams.set('page', p);
              props.history.push(`?${urlSearchParams.toString()}`);
            }}
          />
        </>
      );
    })()}
  </div>} />
  );
};

export default SolutionList;
