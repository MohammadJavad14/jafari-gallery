import { makeStyles } from '@material-ui/core/styles';

const PopularProductStyles = makeStyles(() => ({
    gridContaier: {
        width: '100%',
        height: '100%',
        margin: '1rem 0',
        overflow: 'auto',
        flexWrap: 'nowrap',
        position: 'relative',
        zIndex: 1,
        '-ms-overflow-style': 'none' /* IE and Edge */ ,
        'scrollbar-width': 'none' /* Firefox */ ,
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },

    card: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '9.8125rem',
        height: '16.3125rem',
        maxWidth: 300,
        objectFit: 'cover',
        borderRadius: '0.75rem',
        overflow: 'scroll',
        position: 'relative',
        '-ms-overflow-style': 'none' /* IE and Edge */ ,
        'scrollbar-width': 'none' /* Firefox */ ,
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    cardContent: {
        '&:last-child': {
            paddingBottom: 0,
        },
    },

    favoriteIcon: {
        width: '2rem',
        height: '2rem',
        position: 'absolute',
        zIndex: 2,
        top: '0.3rem',
        left: '0.3rem',
        background: '#ffffff',
        boxShadow: '0px 1px 1px 1px rgba(0,0,0,0.2)',
    },

    media: {
        height: '8.5625rem',
        backgroundColor: '#F8F7FA',
        backgroundSize: '8rem',
        backgroundPosition: 'center',
    },
    productName: {
        fontSize: '1rem',
    },
    priceContainer: {
        marginTop: '0.5rem',
    },
    price: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
    },
    oldPrice: {
        fontSize: '0.75rem',
        color: '#CBCBD4',
        textDecoration: 'line-through',
        marginRight: '0.5rem',
    },
    offAmount: {
        background: '#EAF8EC',
        color: '#51B960',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        padding: '0.25rem 0.5rem',
        borderRadius: '6.25rem',
        marginRight: '0.15rem',
    },
    description: {
        fontSize: '0.75rem',
        fontWeight: 400,
        color: '#A6A6AA',
        marginTop: '0.25rem',
    },
    gradIcon: {
        marginTop: '0.2rem',
        color: '#FFE202',
    },
    rateNumber: {
        fontSize: '0.75rem',
    },
    category: {
        fontSize: '0.75rem',
        fontWeight: 800,
        marginRight: '0.5rem',
    },
    addToCart: {
        padding: 0,
        width: '5rem',
        height: '1.25rem',
        background: '#ECF6FF',
        marginRight: '3.3rem',
        borderRadius: '6.25rem',
    },
    addToCartTxt: {
        color: '#5FA1D5',
        paddingBottom: '0.1rem',
    },
}));

export default PopularProductStyles;