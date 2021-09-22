import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

const ReviewsStyles = makeStyles((theme) => ({
    gold: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blueGrey[500],
    },

    reviewsContainer: {
        backgroundColor: 'inherit',
        border: 'none',
        '&::before': {
            backgroundColor: 'inherit',
        },
        marginBottom: '2rem',
    },
    reviewsSummery: {
        padding: 0,
    },
    reviewsDetails: {
        padding: 0,
    },
    reviewsTitle: {
        marginTop: '2.5rem',
        marginBottom: '1.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    reviewNameContainer: {
        marginRight: '0.5rem',
    },
    reviewName: {
        fontSize: '1rem',
    },
    reviewDate: {
        fontSize: '0.75rem',
        color: '#A6A6AA',
        marginTop: '-0.25rem',
    },

    commentTitle: {
        fontSize: '0.75rem',
        fontWeight: 800,
        color: '#3A3A3A',
    },
    comment: {
        fontSize: '0.75rem',
        color: '#3A3A3A',
    },
    seeMoreBtn: {
        width: '100%',
        height: '3rem',
        backgroundColor: '#fff',
        borderRadius: '1rem',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        fontSize: '1rem',
        fontWeight: 500,
        '&:hover': {
            backgroundColor: '#fff',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        },
    },
}));

export default ReviewsStyles;