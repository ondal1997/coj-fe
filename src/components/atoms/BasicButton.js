import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    color: 'white',
    backgroundColor: 'black',
    padding: '1%',
    '&:hover': {
      backgroundColor: '#CE2727',
    },
  },
  label: {
    fontSize: '17px',
  },
})(Button);

const BasicButton = ({ variant, disabled, label, handleClick }) => (
  <StyledButton variant={variant} disabled={disabled}
    onClick={handleClick}>{label}</StyledButton>
);

export default BasicButton;