import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Category from '../atoms/Category';

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
          <Category category={category}
            handleDelete={() => { handleDeleteCategory(index); }} />
        </li>
      ))
      }
    </ul>
  </StyledChipContainer>);

export default Categories;