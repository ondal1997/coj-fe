const problem = {
  key: 457547,
  title: '숨바꼭질',
  timeLimit: 2000,
  memoryLimit: 512,
  description: '<p>k수빈이는 동생과&nbsp;숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에&nbsp;있다.&nbsp;수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.</p><p>수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.</p>',
  inputDescription: '<p><span style="background-color:rgb(255,255,255);color:rgb(85,85,85);">첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다.&nbsp;N과 K는 정수이다.</span></p>',
  outputDescription: '<p><span style="background-color:rgb(255,255,255);color:rgb(85,85,85);">수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.</span></p>',
  hashtags: ['그래프 이론', '그래프 탐색', '너비 우선 탐색', 'ㅋ'],
  examples: [
    { input: '5 17', output: '4' },
  ],
  testcases: [
    { input: '5 17', output: '4' },
  ],
};

export default problem;