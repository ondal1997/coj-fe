const judgeState = [
  {
    color: '#000000',
    name: '대기 중',
  },
  {
    color: '#F5C928',
    name: '채점 중',
  },
  {
    color: '#283DF5',
    name: 'Solve !',
  },
  {
    color: '#F02424',
    name: 'Try again ...',
  },
  {
    color: '#F02424',
    name: '시간 초과 ...',
  },
  {
    color: '#F02424',
    name: '메모리 초과 ...',
  },
  {
    color: '#F02424',
    name: '컴파일 에러 ...',
  },
  {
    color: '#F02424',
    name: '런타임 에러 ...',
  },
  {
    color: '#F02424',
    name: '문제 유실 ...',
  },
  {
    color: '#F02424',
    name: '서버 실패 ...',
  },
];

// getStateByCode(code) {
//   if (length code) {
//     return [code]
//   }
//   color: defaultsDeep
//   name: '미정의된 코드'
// }
// return
// }

export default judgeState;