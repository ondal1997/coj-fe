import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  color: ${(props) => (props.color ? props.color : 'white')};
  background-color: ${(props) => (props.bgColor ? props.bgColor : 'black')};
  padding: 1%;
  &:hover {
    background-color: ${(props) => (props.hoverBgColor ? props.hoverBgColor : '#CE2727')};
  };
  font-size: 17px;
`;

const BasicButton = ({ variant, disabled, label, handleClick }) => (
  <StyledButton variant={variant} disabled={disabled}
    onClick={handleClick}>{label}</StyledButton>
);

export default BasicButton;