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
      return 'rgb(68, 214, 253)';
    case 7:
      return 'rgb(120, 100, 255)';
    case 8:
      return 'rgb(231, 44, 244)';
    case 9:
      return 'rgb(199, 43, 48)';
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

export function getLevelScore(level) {
  switch (level) {
    case 1:
      return 3;
    case 2:
      return 5;
    case 3:
      return 10;
    case 4:
      return 25;
    case 5:
      return 75;
    case 6:
      return 300;
    case 7:
      return 1500;
    case 8:
      return 9000;
    case 9:
      return 48000;
    case 0:
    default:
      return 3;
  }
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
