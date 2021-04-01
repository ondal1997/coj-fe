const solutionList = [
  {
    key: 2060046,
    ownerId: 'migu554',
    uploadTime: '2019-09-15 18:13:05',
    state: 0,
    testcaseHitCount: 10,
    testcaseSize: 100,
    problemKey: 1011,
    problemVersion: 1,
    language: 'python',
    sourceCode: `#pragma warning(disable: 4996)
    #include <stdio.h>
    #include <limits.h>
    #include <memory.h>
    #include <queue>
    
    using namespace std;
    
    bool visitied[126][126];
    int cost[126][126];
    int w[126][126];
    int dr[] = { -1, 1, 0, 0 };
    int dc[] = { 0, 0, -1, 1 };
    int n, idx;
    
    int main() {
    
      scanf("%d", &n);
    
      while (n != 0) {
        for (int i = 0; i < n; i++) {
          for (int j = 0; j < n; j++) {
            scanf("%d", &w[i][j]);
            cost[i][j] = INT_MIN;
          }
        }
    
        priority_queue<pair <int, pair <int, int> > > q;
        cost[0][0] = -w[0][0];
        q.push({ cost[0][0], { 0, 0 }});
    
        while (!q.empty()) {
          int pathC = q.top().first;
          int r = q.top().second.first;
          int c = q.top().second.second;
          q.pop();
    
          if (visitied[r][c]) continue;
          visitied[r][c] = true;
    
          if (r == n - 1 && c == n - 1) {
            idx++;
            printf("Problem %d: %d\n", idx, -cost[r][c]);
          }
    
          for (int i = 0; i < 4; i++) {
            int nr = r + dr[i];
            int nc = c + dc[i];
            if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
            int nextCost = pathC - w[nr][nc];
            cost[nr][nc] = cost[nr][nc] > nextCost ? cost[nr][nc] : nextCost;
            q.push({ cost[nr][nc], {nr, nc} });
    
          }
        }
    
        for (int i = 0; i < n; i++) {
          memset(visitied, false, sizeof(visitied));
        }
        scanf("%d", &n);
      }
    
      return 0;
    }`,
  },
  {
    key: 2060046,
    ownerId: 'migu554',
    uploadTime: '2019-09-15 18:13:05',
    state: 2,
    testcaseHitCount: 100,
    testcaseSize: 100,
    problemKey: 1011,
    problemVersion: 2,
    language: 'python',
    sourceCode: `#pragma warning(disable: 4996)
    #include <stdio.h>
    #include <limits.h>
    #include <memory.h>
    #include <queue>
    
    using namespace std;
    
    bool visitied[126][126];
    int cost[126][126];
    int w[126][126];
    int dr[] = { -1, 1, 0, 0 };
    int dc[] = { 0, 0, -1, 1 };
    int n, idx;
    
    int main() {
    
      scanf("%d", &n);
    
      while (n != 0) {
        for (int i = 0; i < n; i++) {
          for (int j = 0; j < n; j++) {
            scanf("%d", &w[i][j]);
            cost[i][j] = INT_MIN;
          }
        }
    
        priority_queue<pair <int, pair <int, int> > > q;
        cost[0][0] = -w[0][0];
        q.push({ cost[0][0], { 0, 0 }});
    
        while (!q.empty()) {
          int pathC = q.top().first;
          int r = q.top().second.first;
          int c = q.top().second.second;
          q.pop();
    
          if (visitied[r][c]) continue;
          visitied[r][c] = true;
    
          if (r == n - 1 && c == n - 1) {
            idx++;
            printf("Problem %d: %d\n", idx, -cost[r][c]);
          }
    
          for (int i = 0; i < 4; i++) {
            int nr = r + dr[i];
            int nc = c + dc[i];
            if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
            int nextCost = pathC - w[nr][nc];
            cost[nr][nc] = cost[nr][nc] > nextCost ? cost[nr][nc] : nextCost;
            q.push({ cost[nr][nc], {nr, nc} });
    
          }
        }
    
        for (int i = 0; i < n; i++) {
          memset(visitied, false, sizeof(visitied));
        }
        scanf("%d", &n);
      }
    
      return 0;
    }`,
  },
  {
    key: 2060046,
    ownerId: 'migu554',
    uploadTime: '2019-09-15 18:13:05',
    state: 1,
    testcaseHitCount: 50,
    testcaseSize: 100,
    problemKey: 1011,
    problemVersion: 1,
    language: 'python',
    sourceCode: `#pragma warning(disable: 4996)
    #include <stdio.h>
    #include <limits.h>
    #include <memory.h>
    #include <queue>
    
    using namespace std;
    
    bool visitied[126][126];
    int cost[126][126];
    int w[126][126];
    int dr[] = { -1, 1, 0, 0 };
    int dc[] = { 0, 0, -1, 1 };
    int n, idx;
    
    int main() {
    
      scanf("%d", &n);
    
      while (n != 0) {
        for (int i = 0; i < n; i++) {
          for (int j = 0; j < n; j++) {
            scanf("%d", &w[i][j]);
            cost[i][j] = INT_MIN;
          }
        }
    
        priority_queue<pair <int, pair <int, int> > > q;
        cost[0][0] = -w[0][0];
        q.push({ cost[0][0], { 0, 0 }});
    
        while (!q.empty()) {
          int pathC = q.top().first;
          int r = q.top().second.first;
          int c = q.top().second.second;
          q.pop();
    
          if (visitied[r][c]) continue;
          visitied[r][c] = true;
    
          if (r == n - 1 && c == n - 1) {
            idx++;
            printf("Problem %d: %d\n", idx, -cost[r][c]);
          }
    
          for (int i = 0; i < 4; i++) {
            int nr = r + dr[i];
            int nc = c + dc[i];
            if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
            int nextCost = pathC - w[nr][nc];
            cost[nr][nc] = cost[nr][nc] > nextCost ? cost[nr][nc] : nextCost;
            q.push({ cost[nr][nc], {nr, nc} });
    
          }
        }
    
        for (int i = 0; i < n; i++) {
          memset(visitied, false, sizeof(visitied));
        }
        scanf("%d", &n);
      }
    
      return 0;
    }`,
  },
  {
    key: 2060058,
    ownerId: 'migu554',
    uploadTime: '2019-09-15 18:13:05',
    state: 3,
    testcaseHitCount: 50,
    testcaseSize: 100,
    problemKey: 1011,
    problemVersion: 1,
    language: 'python',
    sourceCode: `#pragma warning(disable: 4996)
    #include <stdio.h>
    #include <limits.h>
    #include <memory.h>
    #include <queue>
    
    using namespace std;
    
    bool visitied[126][126];
    int cost[126][126];
    int w[126][126];
    int dr[] = { -1, 1, 0, 0 };
    int dc[] = { 0, 0, -1, 1 };
    int n, idx;
    
    int main() {
    
      scanf("%d", &n);
    
      while (n != 0) {
        for (int i = 0; i < n; i++) {
          for (int j = 0; j < n; j++) {
            scanf("%d", &w[i][j]);
            cost[i][j] = INT_MIN;
          }
        }
    
        priority_queue<pair <int, pair <int, int> > > q;
        cost[0][0] = -w[0][0];
        q.push({ cost[0][0], { 0, 0 }});
    
        while (!q.empty()) {
          int pathC = q.top().first;
          int r = q.top().second.first;
          int c = q.top().second.second;
          q.pop();
    
          if (visitied[r][c]) continue;
          visitied[r][c] = true;
    
          if (r == n - 1 && c == n - 1) {
            idx++;
            printf("Problem %d: %d\n", idx, -cost[r][c]);
          }
    
          for (int i = 0; i < 4; i++) {
            int nr = r + dr[i];
            int nc = c + dc[i];
            if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
            int nextCost = pathC - w[nr][nc];
            cost[nr][nc] = cost[nr][nc] > nextCost ? cost[nr][nc] : nextCost;
            q.push({ cost[nr][nc], {nr, nc} });
    
          }
        }
    
        for (int i = 0; i < n; i++) {
          memset(visitied, false, sizeof(visitied));
        }
        scanf("%d", &n);
      }
    
      return 0;
    }`,
  },
];

export default solutionList;