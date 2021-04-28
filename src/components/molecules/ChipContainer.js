import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import BasicChip from '../atoms/BasicChip';

const StyledChipContainer = withStyles({
  root: {
    padding: '0',
    margin: '0',
    '& ul': {
      listStyle: 'none',
      padding: '0',
    },
    '& ul > li': {
      listStyle: 'none',
      display: 'inline',
      margin: '0.3%',
    },
  },
  maxWidthLg: {
    width: '100%',
  },
})(Container);

const Categories = ({ categories, handleDeleteCategory }) => (
  <StyledChipContainer>
    <ul>
      {categories.map((category, index) => (
        <li key={index}>
          {handleDeleteCategory ? (<BasicChip label={category}
            handleDelete={() => { handleDeleteCategory(index); }} />)
            : (<BasicChip label={category} />)
          }
        </li>
      ))
      }
    </ul>
  </StyledChipContainer>);

export default Categories;