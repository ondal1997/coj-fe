import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { useContext, useEffect, useState } from 'react';
import { _handleFetchRes } from '../../utils';
import { pureFetchAndJson } from '../../OurLink';
import ProblemTable from '../organisms/ProblemTable';
import ErrorContext from '../../contexts/error';
import PageTemplate from '../templates/PageTemplate';

const ProblemList = (props) => {
  const [error, setError] = useContext(ErrorContext);

  const urlSearchParams = new URLSearchParams(props.location.search);

  const query = urlSearchParams.get('query') || '';

  const limit = 20;

  const unparsedPage = urlSearchParams.get('page');
  const page = /^[1-9]\d*$/.test(unparsedPage)
    ? Number.parseInt(unparsedPage, 10)
    : 1;

  const [isLoaded, setIsLoaded] = useState(false);
  const [problems, setProblems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [mutable] = useState({
    lastFetch: null,
  });

  useEffect(() => {
    setIsLoaded(false);
    const promise = pureFetchAndJson(
      `/api/problems?${new URLSearchParams({
        title: query,
        pos: (page - 1) * limit,
        count: limit,
      }).toString()}`,
    );
    mutable.lastFetch = promise;
    promise.then(
      (result) => {
        if (mutable.lastFetch !== promise) {
          return;
        }

        if (result.status !== 200) {
          setError({ status: result.status });
          return;
        }

        setProblems(result.problems);
        setTotalCount(result.totalCount);
        setIsLoaded(true);
        // window.scrollTo(0, 0);
      },
      () => {
        setError({ message: 'Failed to connect with server' });
      },
    );
  }, [query, page]);

  return (
    <PageTemplate content={
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <TextField
          type='search'
          placeholder="검색"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={query}
          onChange={(event) => {
            urlSearchParams.set('query', event.target.value);
            urlSearchParams.set('page', 1);
            props.history.replace(`?${urlSearchParams.toString()}`);
          }}
        />
        {(() => {
          if (!isLoaded) {
            return (
              <p>
                <CircularProgress />
              </p>
            );
          }
          if (totalCount === 0) {
            return <p>대응하는 문제가 존재하지 않습니다.</p>;
          }
          return (
            <>
              <p>
                총 <strong>{totalCount}</strong>개의 문제를 발견했습니다.
              </p>
              <ProblemTable
                problems={problems}
                urlSearchParams={urlSearchParams}
                history={props.history}
              />
              <Pagination
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
      </div>}/>
  );
};

export default ProblemList;
