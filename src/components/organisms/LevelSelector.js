import { Box } from '@material-ui/core';

export function getLevelColor(level) {
  switch (level) {
    case 1:
      return 'rgb(116, 104, 100)';
    case 2:
      return 'rgb(149, 83, 52)';
    case 3:
      return 'rgb(140, 157, 163)';
    case 4:
      return 'rgb(216, 174, 83)';
    case 5:
      return 'rgb(80, 239, 151)';
    case 6:
      return '#0700A2';
    case 7:
      return '#9200B0';
    case 8:
      return 'rgb(199, 43, 48)';
    case 9:
      return '#1F67E6';
    case 0:
    default:
      return '#444444';
  }
}

export function getLevelText(level) {
  switch (level) {
    case 1:
      return '아이언';
    case 2:
      return '브론즈';
    case 3:
      return '실버';
    case 4:
      return '골드';
    case 5:
      return '플래티넘';
    case 6:
      return '다이아몬드';
    case 7:
      return '마스터';
    case 8:
      return '그랜드마스터';
    case 9:
      return '챌린저';
    case 0:
    default:
      return '언랭크';
  }
}

export function getLevelImage(level) {
  switch (level) {
    case 1:
      return 'iron.png';
    case 2:
      return 'bronze.png';
    case 3:
      return 'silver.png';
    case 4:
      return 'gold.png';
    case 5:
      return 'platinum.png';
    case 6:
      return 'diamond.png';
    case 7:
      return 'master.png';
    case 8:
      return 'grandmaster.png';
    case 9:
      return 'challenger.png';
    case 0:
    default:
      return null;
  }
}

export function getLevelEnglishText(level) {
  switch (level) {
    case 1:
      return 'IRON';
    case 2:
      return 'BRONZE';
    case 3:
      return 'SILVER';
    case 4:
      return 'GOLD';
    case 5:
      return 'PLATINUM';
    case 6:
      return 'DIAMOND';
    case 7:
      return 'MASTER';
    case 8:
      return 'GRANDMASTER';
    case 9:
      return 'CHALLENGER';
    case 0:
    default:
      return null;
  }
}

// 유저 경험치 계산할 때 사용할 함수
export function getLevelScore(level) {
  let score = 3;

  if (!level) {
    return score;
  }

  for (let i = 1; i < level; i += 1) {
    score *= 1.75;
  }

  return Math.ceil(score);
}

export function getUserLevel(levels) {
  const exp = levels.reduce(
    (accumulator, level) => accumulator + getLevelScore(level), 0,
  );

  let start = 0;
  let target = 0;
  let s = 60;
  let level = 1;

  while (true) {
    if (start + s > exp) break;

    start += s;
    level += 1;
    s *= 1.75;
    if (level === 9) return { level, exp, start, target: Infinity }; // 최대 레벨
  }
  target = start + s;

  return { level, exp, start, target };
}

export function Level({ level, fontSize }) {
  return (
    <Box
      bgcolor={getLevelColor(level)}
      padding="4px"
      borderRadius="4px"
      fontSize={fontSize || '1rem'}
      margin="4px"
      color="white"
      display="inline"
    >
      {getLevelText(level)}
    </Box>
  );
}

export default function LevelSelector({ level, setLevel, fontSize }) {
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      {levels.map((lev) => (
        <Box
          // bgcolor={getLevelColor(lev)}
          bgcolor={level === lev ? getLevelColor(level) : getLevelColor(null)}
          padding="4px"
          borderRadius="4px"
          fontSize={fontSize || '1rem'}
          margin="4px"
          color="white"
          display="inline"
          onClick={() => {
            setLevel?.(lev);
          }}
          style={{ cursor: 'pointer' }}
        >
          {getLevelText(lev)}
        </Box>
      ))}
    </div>
  );
}
