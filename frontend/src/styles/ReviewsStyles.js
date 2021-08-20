import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

const ProductScreenStyles = makeStyles((theme) => ({
    gold: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
    },

    reviewsContainer: {
        backgroundColor: 'inherit',
        border: 'none',
    },
    reviewsSummery: {
        padding: 0,
    },
    reviewsDetails: {
        padding: 0,
    },
    reviewsTitle: {
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    reviewNameContainer: {
        marginLeft: '0.5rem',
    },
    reviewName: {
        fontSize: '1rem',
    },
    reviewDate: {
        fontSize: '0.75rem',
        color: '#A6A6AA',
        marginTop: '-0.25rem',
    },
}));

export default ProductScreenStyles;