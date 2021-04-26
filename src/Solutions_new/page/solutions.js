import { CircularProgress } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import Error from '../../Error/Error';
import _handleFetchRes from '../../Error/utils';
import { fetchAndJson } from '../../OurLink';
import SolutionTable from './solutionTable';

const SolutionsPage = (props) => {
  const urlSearchParams = new URLSearchParams(props.location.search);

  const problemKey = urlSearchParams.get('problemKey');

  const limit = 20;

  const unparsedPage = urlSearchParams.get('page');
  const page = /^[1-9]\d*$/.test(unparsedPage) ? Number.parseInt(unparsedPage, 10) : 1;

  const [error, setError] = useState(null);
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
      promise = fetchAndJson(
        `/api/problems/${problemKey}/solutions?${new URLSearchParams({
          pos: (page - 1) * limit,
          count: limit,
        }).toString()}`,
      );
    } else {
      promise = fetchAndJson(
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

      _handleFetchRes(result.status, setError, () => {
        setSolutions(result.solutions);
        setTotalCount(result.totalCount);
        setIsLoaded(true);
        // window.scrollTo(0, 0);
      });
    });
  }, [problemKey, page]);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      {(() => {
        if (!isLoaded) {
          return (
            <p>
              <CircularProgress />
            </p>
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
              solutions={solutions}
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
    </div>
  );
};

export default SolutionsPage;
