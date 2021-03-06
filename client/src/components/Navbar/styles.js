import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '20px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3px 3px',
    },
    heading: {
        color: 'rgb(0,255,255)',
        textDecoration: 'none',
    },
    image: {
        marginLeft: '0px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '600px',
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '550px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    }

}));