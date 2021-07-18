import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '15px',
    objectFit: 'cover',
    width: '100%',
    boxContent: 'border-box',
    marginBottom: '10px',
    boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.6)',
  },
  card: {
    display: 'flex',
    width: '100%',

    boxContent: 'border-box',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    margin: '10px',
    flex: 1,
    width: '100%',
    boxContent: 'border-box',
    marginTop: '30px',
  },
  imageSection: {
    marginLeft: '20px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
    width: '100%',
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    width: '100%',
    // borderTop: '2px solid black',
    // boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.7)',
    // borderRadius: '8px',
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  commentsInnerContainer: {
    height: '250px',
    overflowY: 'auto',
    width: '100%',
    marginRight: '30px',
  },
  
}));
